"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext, Controller } from "react-hook-form";
import { ProjectFormValues } from "@/validators/project.schema";
import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import { MODULES } from "./DetailProjectTab";
import { useAuth } from "@/contexts/AuthContext";
import { useTenantUsers } from "@/hooks/useTenant"; // New import for fetching tenant users
import { User } from "@/types/users";

// Preset due policy options matching design (H+3, H+7, etc.)
const DUE_POLICY_OPTIONS = [
	{ value: 3, label: "H+3 (3 hari setelah deadline)" },
	{ value: 7, label: "H+7 (7 hari setelah deadline)" },
	{ value: 14, label: "H+14 (14 hari setelah deadline)" },
];

// Helper to get color style based on module code (mimicking original)
const getModuleStyle = (code: string) => {
	if (["Form 1.0", "KK 2.0", "KK 4.0"].includes(code)) {
		return { bg: "bg-[#F4F7FE]", textColor: "text-[#332687]" };
	}
	return { bg: "bg-[rgba(255,204,0,0.1)]", textColor: "" };
};

// Helper to sanitize scope key for form field names (replace dots and spaces)
export const sanitizeScopeKey = (scope: string) => {
	return scope.replace(/[\s.]/g, "_");
};

export default function ProjectSettingsTab() {
	const {
		control,
		watch,
		register,
		formState: { errors },
	} = useFormContext<ProjectFormValues>();
	const selectedScopes = watch("scopes") || [];

	const { tenant } = useAuth();
	const [bastTemplates, setBastTemplates] = useState<any[]>([]);
	const [invoiceTemplates, setInvoiceTemplates] = useState<any[]>([]);
	// Removed moduleUsers and pmoUsers local states as they will be managed by react-query hooks

	// Fetch Templates (keeping as is, no specific hook requested)
	useEffect(() => {
		if (tenant?.id) {
			api
				.get("/project/report-templates", {
					headers: { "X-Tenant-Id": tenant.id },
				})
				.then((res) => {
					const templates = res?.data?.data || [];
					setBastTemplates(
						templates.filter((t: any) => t.report_type === "BAST"),
					);
					setInvoiceTemplates(
						templates.filter((t: any) => t.report_type === "INVOICE"),
					);
				})
				.catch((err) => {
					setBastTemplates([]);
					setInvoiceTemplates([]);
					console.error("Failed to fetch templates", err);
				});
		}
	}, [tenant?.id]); // Added tenant dependency

	// Fetch PMO users for escalation using useTenantUsers hook
	const { data: pmoUsersData, isLoading: isLoadingPmoUsers } = useTenantUsers({
		tenantId: tenant?.id || "",
		permission: "project:manage", // Assuming 'project:manage' permission for PMO users
		enabled: !!tenant?.id, // Only enable if tenantId is available
		limit: 100, // Reasonable limit for PMO users
	});

	const pmoUsers = useMemo(
		() => (pmoUsersData?.items || []).filter((u: any) => u?.role !== "Admin Tenant"),
		[pmoUsersData],
	);

	// Fetch tenant-scoped users once, reuse for all module leader/member dropdowns
	const { data: tenantUsersData } = useTenantUsers({
		tenantId: tenant?.id || "",
		enabled: !!tenant?.id,
		limit: 100,
	});

	const tenantUsers = useMemo(
		() => (tenantUsersData?.items || []).filter((u: any) => u?.role !== "Admin Tenant"),
		[tenantUsersData],
	);

	const moduleUsers = useMemo(() => {
		return selectedScopes.reduce(
			(acc, scope) => {
				acc[scope] = {
					leaders: tenantUsers,
					members: tenantUsers,
				};
				return acc;
			},
			{} as Record<string, { leaders: any[]; members: any[] }>,
		);
	}, [selectedScopes, tenantUsers]);

	return (
		<div className="flex items-start gap-[30px] self-stretch">
			{/* Left Column - Team Assignment */}
			<Card className="flex-1 self-stretch p-5">
				<div className="mb-5 flex flex-col gap-0 self-stretch">
					<CardTitle>Team Assignment</CardTitle>
					<CardDescription className="line-clamp-1 overflow-hidden text-ellipsis text-primary">
						Pilih modul yang akan dikerjakan dan atur Team Leader / Member untuk setiap modul
					</CardDescription>
				</div>

				<div className="flex flex-col gap-2.5">
					{selectedScopes.length === 0 && (
						<p className="text-center text-sm text-primary mt-5 ">
							Belum ada modul di scope of work yang dipilih
						</p>
					)}

					{selectedScopes.map((scope, index) => {
						const style = getModuleStyle(scope);
						// const users = moduleUsers[scope] || { leaders: [], members: [] }; // Now moduleUsers is a useMemo result
						const leaderField = watch(
							`team_assignments.${sanitizeScopeKey(scope)}.leader_id`,
						);
						const memberField = watch(
							`team_assignments.${sanitizeScopeKey(scope)}.member_id`,
						);

						const filteredLeaders =
							moduleUsers[scope]?.leaders.filter(
								(u: any) => u.id !== memberField,
							) || [];

						const filteredMembers =
							moduleUsers[scope]?.members.filter(
								(u: User) => u.id !== leaderField,
							) || [];

						return (
							<div
								key={scope}
								className="flex h-[163px] flex-col gap-2.5 border-b pb-2 last:border-0"
							>
								<div
									className={`inline-flex items-center justify-center gap-2.5 self-start rounded-[5px] border  px-2.5 py-2.5 ${style.bg}`}
								>
									<span
										className={`font-inter text-xs font-normal leading-normal ${style.textColor}`}
									>
										{scope}
									</span>
								</div>

								<div className="flex flex-col gap-0">
									<Controller
										control={control}
										name={`team_assignments.${sanitizeScopeKey(scope)}.leader_id`}
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger
													className={
														errors.team_assignments?.[sanitizeScopeKey(scope)]
															?.leader_id
															? "border-red-500"
															: ""
													}
												>
													<SelectValue placeholder="Pilih Team Leader" />
												</SelectTrigger>
												<SelectContent>
													{filteredLeaders.map((u: any) => (
														<SelectItem key={u.id} value={u.id}>
															{u.username}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
									{errors.team_assignments?.[sanitizeScopeKey(scope)]
										?.leader_id && (
										<span className="text-red-500 text-xs">
											{
												errors.team_assignments[sanitizeScopeKey(scope)]
													?.leader_id?.message
											}
										</span>
									)}
								</div>

								<div className="flex flex-col gap-0">
									<Controller
										control={control}
										name={`team_assignments.${sanitizeScopeKey(scope)}.member_id`}
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger
													className={
														errors.team_assignments?.[sanitizeScopeKey(scope)]
															?.member_id
															? "border-red-500"
															: ""
													}
												>
													<SelectValue placeholder="Pilih Team Member" />
												</SelectTrigger>
												<SelectContent>
													{filteredMembers.map((u: any) => (
														<SelectItem key={u.id} value={u.id}>
															{u.username}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
									{errors.team_assignments?.[sanitizeScopeKey(scope)]
										?.member_id && (
										<span className="text-red-500 text-xs">
											{
												errors.team_assignments[sanitizeScopeKey(scope)]
													?.member_id?.message
											}
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</Card>

			{/* Right Column */}
			<div className="flex w-[600px] flex-col justify-center gap-[30px]">
				{/* SLA & Reminders */}
				<Card className="p-5">
					<div className="mb-5 flex flex-col gap-0 self-stretch">
						<CardTitle>SLA & Reminders</CardTitle>
						<CardDescription className="line-clamp-1 overflow-hidden text-ellipsis">
							Atur kebijakan deadline dan eskalasi
						</CardDescription>
					</div>

					<div className="flex flex-col gap-0 self-stretch">
						<Label className="text-base font-medium leading-6 tracking-[0.15px] ">
							Due Policy *
						</Label>
						<Controller
							control={control}
							name="due_policy_days"
							render={({ field }) => (
								<Select
									onValueChange={(val) => field.onChange(Number(val))}
									value={
										field.value !== undefined && field.value !== null
											? String(field.value)
										: ""
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Pilih Due Policy" />
									</SelectTrigger>
									<SelectContent>
										{DUE_POLICY_OPTIONS.map((opt) => (
											<SelectItem key={opt.value} value={String(opt.value)}>
												{opt.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.due_policy_days && (
							<span className="text-red-500 text-xs">
								{errors.due_policy_days.message}
							</span>
						)}
					</div>

					<div className="mt-5 flex flex-col gap-2.5 py-[5px]">
						<Label className="text-base font-medium leading-6 tracking-[0.15px] ">
							Escalation Recipients
						</Label>
						<div className="flex flex-col gap-2">
							{pmoUsers.map(
								(
									user: any, // Cast to any temporarily for u.name
								) => (
									<div key={user.id} className="flex items-center gap-2">
										<Controller
											control={control}
											name="escalation_user_ids"
											render={({ field }) => {
												const isChecked = field.value?.includes(user.id);
												return (
													<Checkbox
														checked={isChecked}
														onCheckedChange={(checked) => {
															const current = field.value || [];
															const updated = checked
																? [...current, user.id]
																: current.filter((val) => val !== user.id);
															field.onChange(updated);
														}}
													/>
												);
											}}
										/>
										<span className="font-inter text-sm font-medium leading-[14px]">
											{user.username ||
												`${user.first_name || ""} ${user.last_name || ""}`.trim()}
										</span>
									</div>
								),
							)}
						</div>
					</div>
				</Card>

				{/* Deliverables */}
				<Card className="p-5">
					<div className="mb-5 flex flex-col gap-0 self-stretch">
						<CardTitle>Deliverables</CardTitle>
						<CardDescription className="line-clamp-1 overflow-hidden text-ellipsis">
							Template BAST & Invoice yang akan digunakan
						</CardDescription>
					</div>

					<div className="flex flex-col gap-5 self-stretch">
						<div className="flex flex-col gap-0">
							<Label className="text-base font-medium leading-6 tracking-[0.15px] ">
								BAST Template
							</Label>
							<Controller
								control={control}
								name="bast_template_id"
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Pilih template BAST" />
										</SelectTrigger>
										<SelectContent>
											{bastTemplates.map((t: any) => (
												<SelectItem key={t.id} value={t.id}>
													{t.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						<div className="flex flex-col gap-0">
							<Label className="text-base font-medium leading-6 tracking-[0.15px] ">
								Invoice Template
							</Label>
							<Controller
								control={control}
								name="invoice_template_id"
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Pilih template Invoice" />
										</SelectTrigger>
										<SelectContent>
											{invoiceTemplates.map((t: any) => (
												<SelectItem key={t.id} value={t.id}>
													{t.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
