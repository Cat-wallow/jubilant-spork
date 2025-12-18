import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
	asChild?: boolean;
};

function Skeleton({ className, asChild = false, ...props }: SkeletonProps) {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
	);
}

export { Skeleton };
