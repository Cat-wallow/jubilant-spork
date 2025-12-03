import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputCurrencyProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onValueChange?: (value: number) => void; // raw number
}

const formatIDR = (value: number) => {
	if (!value) return "";
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);
};

const onlyNumber = (value: string) => {
	return Number(value.replace(/[^0-9]/g, ""));
};

export const InputCurrency = React.forwardRef<
	HTMLInputElement,
	InputCurrencyProps
>(({ className, onValueChange, ...props }, ref) => {
	const [displayValue, setDisplayValue] = React.useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = onlyNumber(e.target.value);

		setDisplayValue(formatIDR(raw));

		if (onValueChange) {
			onValueChange(raw);
		}
	};

	return (
		<input
			{...props}
			ref={ref}
			value={displayValue}
			onChange={handleChange}
			className={cn(
				"flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
		/>
	);
});

InputCurrency.displayName = "InputCurrency";
