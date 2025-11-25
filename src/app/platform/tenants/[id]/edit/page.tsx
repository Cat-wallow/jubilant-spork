"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTenantPayload } from "@/types/tenant";
import { updateTenant } from "@/services/tenant.service";
import { uploadTenantLogo } from "@/services/upload.service";
import { toast } from "sonner";
import RBAC from "@/components/rbac/RBAC";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useTenantById } from "@/hooks/useTenant";
import { Skeleton } from "@/components/ui/skeleton";
import BasicInfoSection from "../../new/components/BasicInfoSection";
import BrandingSection from "../../new/components/BrandingSection";
import SystemSettingsSection from "../../new/components/SystemSettingsSection";

// Schema for edit is slightly different, PIC is not editable
const formSchema = z.object({
	tenantName: z.string().min(1, "Nama Tenant wajib diisi"),
	slugUrl: z
		.string()
		.min(1, "Slug URL wajib diisi")
		.regex(
			/^[a-z0-9-]+$/,
			"Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung",
		),
	companyName: z.string().optional(),
	logo: z.instanceof(File).nullable().optional(),
	timezone: z.string().optional(),
	language: z.string().optional(),
	currency: z.string().optional(),
	// PIC fields are not part of validation as they are readonly
	picName: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	roleId: z.string().optional(),
	tagline: z.string().optional(),
});

type EditTenantFormValues = z.infer<typeof formSchema>;

function EditTenantPageContent() {
	const router = useRouter();
	const params = useParams();
	const tenantId = params.id as string;
	const queryClient = useQueryClient();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: tenantData, isLoading: isLoadingTenant } =
		useTenantById(tenantId);

	const form = useForm<EditTenantFormValues>({
		resolver: zodResolver(formSchema),
	});

	// Populate form with fetched data
	useEffect(() => {
		if (tenantData) {
			form.reset({
				tenantName: tenantData.name,
				slugUrl: tenantData.slug,
				companyName: (tenantData.settings as any)?.companyName || "",
				timezone: (tenantData.settings as any)?.timezone,
				language: (tenantData.settings as any)?.language,
				currency: (tenantData.settings as any)?.currency,
				tagline: (tenantData.settings as any)?.tagline,
				// PIC Data is not directly set here as it will be in a read-only section
				// We'll need to fetch and display it separately in the PICSection
			});
		}
	}, [tenantData, form]);

	const updateTenantMutation = useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: UpdateTenantPayload;
		}) => updateTenant(id, payload),
		onSuccess: () => {
			toast.success("Tenant berhasil diperbarui!");
			queryClient.invalidateQueries({ queryKey: ["tenants"] });
			queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] });
			router.push("/platform/tenants");
		},
		onError: (error: any) => {
			toast.error("Gagal memperbarui tenant", {
				description:
					error.response?.data?.message || "Terjadi kesalahan pada server.",
			});
		},
		onSettled: () => {
			setIsSubmitting(false);
		},
	});

	const onSubmit = async (values: EditTenantFormValues) => {
		setIsSubmitting(true);
		let logoUrl: string | undefined = (tenantData as any)?.logo_url;

		if (values.logo) {
			toast.info("Mengunggah logo baru...");
			try {
				logoUrl = await uploadTenantLogo(values.logo);
				toast.success("Logo berhasil diunggah!");
			} catch (error) {
				toast.error("Gagal Mengunggah Logo", {
					description: "Pembaruan dibatalkan karena logo gagal diunggah.",
				});
				setIsSubmitting(false);
				return;
			}
		}

		const tenantPayload: UpdateTenantPayload = {
			name: values.tenantName,
			slug: values.slugUrl,
			logo_url: logoUrl,
			settings: {
				companyName: values.companyName || undefined,
				timezone: values.timezone,
				language: values.language,
				tagline: values.tagline,
				currency: values.currency,
			},
		};

		toast.info("Memperbarui tenant...");
		updateTenantMutation.mutate({ id: tenantId, payload: tenantPayload });
	};

	if (isLoadingTenant) {
		return (
			<div className="w-full space-y-6">
				<h1 className="text-3xl font-bold tracking-tight">Edit Tenant</h1>
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<Skeleton className="h-[250px] w-full" />
					</div>
					<div>
						<Skeleton className="h-[250px] w-full" />
					</div>
				</div>
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<Skeleton className="h-[250px] w-full" />
					</div>
					<div>
						<Skeleton className="h-[250px] w-full" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full space-y-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-1 flex-col gap-1">
					<h1 className="text-3xl font-bold tracking-tight">Edit Tenant</h1>
					<p className="text-muted-foreground">{tenantData?.name}</p>
				</div>
				<Button
					onClick={form.handleSubmit(onSubmit)}
					className="gap-2"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						"Menyimpan..."
					) : (
						<>
							<Save className="h-4 w-4" />
							Simpan Perubahan
						</>
					)}
				</Button>
			</div>

			{/* Form */}
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<BasicInfoSection />
						</div>
						<BrandingSection />
					</div>

					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2"></div>
						<SystemSettingsSection />
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

export default function EditTenantPage() {
	return (
		<RBAC
			requiredPermission={["tenant:update", "tenant:manage"]}
			unauthorizedPage={true}
		>
			<EditTenantPageContent />
		</RBAC>
	);
}
