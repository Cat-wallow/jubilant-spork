import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UseFormReturn, Controller, useFormContext } from "react-hook-form";
import { NewTenantFormValues } from "../page"; // Assuming NewTenantFormValues is exported from page.tsx
import { useQuery } from "@tanstack/react-query";
import { getTenantAssignableRoles } from "@/services/role.service";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

interface PICSectionProps {
	// form prop is no longer needed due to FormProvider
}

export default function PICSection({}: PICSectionProps) {
	const { control } = useFormContext<NewTenantFormValues>(); // Use context

	const { data: roles, isLoading: isLoadingRoles } = useQuery({
		queryKey: ["tenantAssignableRoles"],
		queryFn: getTenantAssignableRoles,
	});

	return (
		<Card className="h-full p-6">
			<h2 className="mb-6 text-xl font-semibold">Person in Charge (PIC)</h2>

			<div className="space-y-4">
				{/* Row 1 */}
				<div className="grid gap-4 md:grid-cols-2">
					<FormField
						control={control}
						name="picName"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="picName">Nama PIC *</FormLabel>
								<FormControl>
									<Input
										id="picName"
										placeholder="Nama lengkap PIC"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="roleId" // This field needs to be added to NewTenantFormValues in page.tsx
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="roleId">Role PIC *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={isLoadingRoles}
								>
									<FormControl>
										<SelectTrigger id="roleId">
											<SelectValue placeholder="Pilih Role PIC" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoadingRoles ? (
											<SelectItem value="loading" disabled>
												Loading roles...
											</SelectItem>
										) : (
											roles?.map((role) => (
												<SelectItem key={role.id} value={role.id}>
													{role.name}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Row 2 */}
				<div className="grid gap-4 md:grid-cols-2">
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="email">Email *</FormLabel>
								<FormControl>
									<Input
										id="email"
										type="email"
										placeholder="email@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="phone">Telepon</FormLabel>
								<FormControl>
									<Input
										id="phone"
										type="tel"
										placeholder="365-374-4961"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</Card>
	);
}
