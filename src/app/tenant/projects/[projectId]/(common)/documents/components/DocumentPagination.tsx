"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentPaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	onPageChange: (page: number) => void;
}

export function DocumentPagination({
	currentPage,
	totalPages,
	totalItems,
	onPageChange,
}: DocumentPaginationProps) {
	const itemsPerPage = 10;
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<p className="font-geist text-sm leading-[150%] tracking-[0.07px] text-[#737373]">
				Showing {startItem}-{endItem} of {totalItems} products
			</p>

			<div className="flex items-center gap-2">
				{/* Previous Button */}
				<Button
					variant="ghost"
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
					className="flex h-9 min-h-9 items-center gap-2 rounded-lg bg-transparent px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] tracking-[0.07px]  hover:bg-muted disabled:opacity-50"
				>
					<ChevronLeft className="h-[9.5px] w-[5.5px] fill-[#0A0A0A]" />
					Previous
				</Button>

				{/* Page Numbers */}
				{[1, 2, 3, 4].map((page) => (
					<Button
						key={page}
						variant={currentPage === page ? "outline" : "ghost"}
						onClick={() => onPageChange(page)}
						className={cn(
							"flex h-9 w-[34px] min-h-9 items-center justify-center gap-2 rounded-lg px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] tracking-[0.07px]",
							currentPage === page
								? "border border-[#D4D4D4] bg-[rgba(255,255,255,0.10)]  shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]"
								: "bg-transparent  hover:bg-muted",
						)}
					>
						{page}
					</Button>
				))}

				{/* Ellipsis */}
				<Button
					variant="ghost"
					className="flex h-9 min-h-9 w-9 items-center justify-center rounded-lg p-2"
					disabled
				>
					<MoreHorizontal className="h-[3.167px] w-[14.834px] fill-[#0A0A0A]" />
				</Button>

				{/* Last Page */}
				<Button
					variant="ghost"
					onClick={() => onPageChange(totalPages)}
					className="flex h-9 w-[34px] min-h-9 items-center justify-center gap-2 rounded-lg bg-transparent px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] tracking-[0.07px]  hover:bg-muted"
				>
					{totalPages}
				</Button>

				{/* Next Button */}
				<Button
					variant="ghost"
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
					className="flex h-9 min-h-9 items-center gap-2 rounded-lg bg-transparent px-4 py-[7.5px] font-geist text-sm font-medium leading-[150%] tracking-[0.07px]  hover:bg-muted disabled:opacity-50"
				>
					Next
					<ChevronRight className="h-[9.5px] w-[5.5px] fill-[#0A0A0A]" />
				</Button>
			</div>
		</div>
	);
}
