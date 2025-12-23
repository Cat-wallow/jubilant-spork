import React, { useState } from "react";
import { Invitation } from "@/types/invitation";
import {
	useAcceptInvitation,
	useRejectInvitation,
} from "@/hooks/useInvitations";

// Helper function to format date
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
};

interface InvitationCardProps {
	invitation: Invitation;
	onSuccess?: () => void;
}

export default function InvitationCard({
	invitation,
	onSuccess,
}: InvitationCardProps) {
	const acceptMutation = useAcceptInvitation();
	const rejectMutation = useRejectInvitation();
	const [showConfirm, setShowConfirm] = useState<"accept" | "reject" | null>(
		null,
	);

	const handleAccept = async () => {
		try {
			await acceptMutation.mutateAsync(invitation.id);
			setShowConfirm(null);
			onSuccess?.();
		} catch (error) {
			// Error handled by mutation
		}
	};

	const handleReject = async () => {
		try {
			await rejectMutation.mutateAsync(invitation.id);
			setShowConfirm(null);
			onSuccess?.();
		} catch (error) {
			// Error handled by mutation
		}
	};

	const getStatusBadge = () => {
		const badges = {
			pending:
				"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
			accepted:
				"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
			rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
			expired: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400",
		};

		const labels = {
			pending: "Pending",
			accepted: "Diterima",
			rejected: "Ditolak",
			expired: "Kadaluarsa",
		};

		return (
			<span
				className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
					badges[invitation.status]
				}`}
			>
				{labels[invitation.status]}
			</span>
		);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-card p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-navy-800">
			<div className="flex items-start justify-between">
				{/* Left side - Invitation info */}
				<div className="flex-1">
					<div className="mb-3 flex items-center gap-3">
						{/* Tenant Icon */}
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
						</div>

						{/* Tenant Name & Role */}
						<div>
							<h3 className="text-lg font-semibold text-navy-700 dark:text-white">
								{invitation.tenant.name}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Role:{" "}
								<span className="font-medium text-brand-500">
									{invitation.role}
								</span>
							</p>
						</div>
					</div>

					{/* Inviter Info */}
					<div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<span>
							Diundang oleh:{" "}
							<span className="font-medium text-navy-700 dark:text-white">
								{invitation.inviter.name}
							</span>
						</span>
					</div>

					{/* Date */}
					<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>{formatDate(invitation.created_at)}</span>
					</div>
				</div>

				{/* Right side - Status & Actions */}
				<div className="flex flex-col items-end gap-3">
					{getStatusBadge()}

					{/* Action Buttons */}
					{invitation.status === "pending" && !showConfirm && (
						<div className="flex gap-2">
							<button
								onClick={() => setShowConfirm("accept")}
								disabled={acceptMutation.isPending || rejectMutation.isPending}
								className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
							>
								✓ Terima
							</button>
							<button
								onClick={() => setShowConfirm("reject")}
								disabled={acceptMutation.isPending || rejectMutation.isPending}
								className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-900/20"
							>
								✕ Tolak
							</button>
						</div>
					)}

					{/* Confirmation */}
					{showConfirm && (
						<div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
							<p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
								{showConfirm === "accept"
									? "Terima undangan ini?"
									: "Tolak undangan ini?"}
							</p>
							<div className="flex gap-2">
								<button
									onClick={
										showConfirm === "accept" ? handleAccept : handleReject
									}
									disabled={
										acceptMutation.isPending || rejectMutation.isPending
									}
									className={`rounded px-3 py-1 text-xs font-medium text-white transition-colors disabled:opacity-50 ${
										showConfirm === "accept"
											? "bg-green-500 hover:bg-green-600"
											: "bg-red-500 hover:bg-red-600"
									}`}
								>
									{acceptMutation.isPending || rejectMutation.isPending
										? "Loading..."
										: "Ya"}
								</button>
								<button
									onClick={() => setShowConfirm(null)}
									disabled={
										acceptMutation.isPending || rejectMutation.isPending
									}
									className="rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
								>
									Batal
								</button>
							</div>
						</div>
					)}

					{/* Accepted/Rejected Info */}
					{invitation.status === "accepted" && invitation.accepted_at && (
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Diterima: {formatDate(invitation.accepted_at)}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
