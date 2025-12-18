"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTenantPayload } from "@/types/tenant";
import { createTenant } from "@/services/tenant.service";
import { uploadTenantLogo } from "@/services/upload.service";
import { inviteUser } from "@/services/user.service";
import { toast } from "sonner";
import RBAC from "@/components/rbac/RBAC";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BasicInfoSection from "./components/BasicInfoSection";
import BrandingSection from "./components/BrandingSection";
import PICSection from "./components/PICSection";
import SystemSettingsSection from "./components/SystemSettingsSection";

// Expanded Zod schema for form validation including PIC details
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
	tagline: z.string().optional(),
	package: z.string().default("Pro - Rp.2.500.000"),
	storage: z.string().default("10"),
	projects: z.string().default("10"),
	maxUsers: z.string().default("20"),
	trialDays: z.string().default("7"),
	logo: z.instanceof(File).nullable().optional(),
	// primaryColor: z.string().optional(), // Removed from UI
	// secondaryColor: z.string().optional(), // Removed from UI
	timezone: z.string().default("Asia/Jakarta (WIB)"),
	language: z.string().default("Indonesia"),
	currency: z.string().default("Rupiah (IDR)"),
	// PIC fields are now required for the second step of the process
	picName: z.string().min(1, "Nama PIC wajib diisi"),
	email: z.string().email("Format email tidak valid"),
	phone: z.string().optional(),
	roleId: z.string().min(1, "Role PIC wajib dipilih"), // New field for role
	// billingCycle: z.string().optional(), // Not used in payload, removed from form
});

export type NewTenantFormValues = z.input<typeof formSchema>;
type NewTenantFormOutputValues = z.output<typeof formSchema>;

function NewTenantPageContent() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<NewTenantFormValues, any, NewTenantFormOutputValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tenantName: "",
			slugUrl: "",
			companyName: "",
			tagline: "",
			package: "Pro - Rp.2.500.000",
			storage: "10",
			projects: "10",
			maxUsers: "20",
			trialDays: "7",
			logo: null,
			timezone: "Asia/Jakarta (WIB)",
			language: "Indonesia",
			currency: "Rupiah (IDR)",
			picName: "",
			email: "",
			phone: "",
			roleId: "",
		},
	});

	const createTenantMutation = useMutation({
		mutationFn: createTenant,
		onSuccess: () => {
			toast.success("Tenant berhasil dibuat", {
				description: "Tenant baru dan admin PIC telah berhasil dibuat.",
			});
			queryClient.invalidateQueries({ queryKey: ["tenants"] });
			router.push("/platform/tenants");
		},
		onError: (error: any) => {
			toast.error("Gagal Membuat Tenant", {
				description:
					error.response?.data?.message ||
					"Terjadi kesalahan saat membuat tenant.",
			});
		},
		onSettled: () => {
			setIsSubmitting(false);
		},
	});

	const onSubmit = async (values: NewTenantFormOutputValues) => {
		setIsSubmitting(true);
		let logoUrl: string | undefined = undefined;

		// Step 1: Upload logo if it exists
		if (values.logo) {
			try {
				logoUrl = await uploadTenantLogo(values.logo);
			} catch (error) {
				setIsSubmitting(false);
				return;
			}
		}

		// Step 2: Prepare payloads.
		// The backend expects the main tenant data with a nested `picPayload` object.
		const tenantPayload: CreateTenantPayload = {
			name: values.tenantName,
			slug: values.slugUrl,
			plan: values.package?.split(" - ")[0].toLowerCase(),
			maxUsers: parseInt(values.maxUsers || "0"),
			maxProjects: parseInt(values.projects || "0"),
			storageQuotaGb: parseInt(values.storage || "0"),
			trialDays: parseInt(values.trialDays || "0"),
			logo_url: logoUrl,
			settings: {
				companyName: values.companyName || undefined, // Set to undefined if empty
				tagline: values.tagline,
				timezone: values.timezone,
				language: values.language,
				currency: values.currency,
			},
		};

		const picPayload = {
			email: values.email,
			name: values.picName,
			phone: values.phone,
			roleId: values.roleId,
		};

		// Step 3: Mutate to create tenant, passing combined payload to the backend
		createTenantMutation.mutate({
			...tenantPayload,
			picPayload,
		} as any);
	};

	return (
		<div className="w-full space-y-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-1 flex-col gap-1">
					<h1 className="text-3xl font-bold ">
						Tambah Tenant Baru
					</h1>
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
							<Plus className="h-4 w-4" />
							Simpan Tenant
						</>
					)}
				</Button>
			</div>

			{/* Form */}
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Row 1: Basic Info + Package */}
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<BasicInfoSection />
						</div>
						{/*<PackageSection />*/}
						<BrandingSection />
					</div>

					{/* Row 2: PIC + Billing */}
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<PICSection />
						</div>
						{/*<BillingSection />*/}
						<SystemSettingsSection />{" "}
					</div>

					{/* Row 3: Branding */}

					{/* Row 4: System Settings */}

					{/* Row 5: Security (can be removed if not used) */}
					{/* <SecuritySection form={form} /> */}
				</form>
			</FormProvider>
		</div>
	);
}

export default function NewTenantPage() {
	return (
		<RBAC
			requiredPermission={["tenant:create", "tenant:manage"]}
			unauthorizedPage={true}
		>
			<NewTenantPageContent />
		</RBAC>
	);
}
