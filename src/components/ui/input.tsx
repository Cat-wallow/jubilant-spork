import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "idr" | "" | "usd";
}

const formatIDR = (value: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);
};

const formatUSD = (value: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(value);
};

const onlyNumber = (value: string) => {
	return value.replace(/[^0-9]/g, "");
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant, onChange, value, name, ...props }, ref) => {
		const [displayValue, setDisplayValue] = React.useState("");
		const hiddenInputRef = React.useRef<HTMLInputElement>(null);

		// Merge refs - forward ref ke hidden input
		React.useImperativeHandle(ref, () => hiddenInputRef.current!);

		// Sinkronisasi value dari luar (React Hook Form) → ke displayValue
		React.useEffect(() => {
			if (variant === "idr" || variant === "usd") {
				if (value === undefined || value === null || value === "") {
					setDisplayValue("");
				} else {
					const numValue = typeof value === "string" ? Number(value) : value;
					if (!isNaN(numValue) && numValue > 0) {
						setDisplayValue(
							variant === "idr" ? formatIDR(numValue) : formatUSD(numValue),
						);
					}
				}
			}
		}, [value, variant]);

		// =============== IDR OR USD Variant ===============
		if (variant === "idr" || variant === "usd") {
			const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
				const raw = onlyNumber(e.target.value);
				const numValue = raw ? Number(raw) : 0;

				setDisplayValue(
					raw
						? variant === "idr"
							? formatIDR(numValue)
							: formatUSD(numValue)
						: "",
				);

				if (hiddenInputRef.current) {
					const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
						window.HTMLInputElement.prototype,
						"value",
					)?.set;

					if (nativeInputValueSetter) {
						nativeInputValueSetter.call(hiddenInputRef.current, raw);
					}

					const event = new Event("input", { bubbles: true });
					hiddenInputRef.current.dispatchEvent(event);

					if (onChange) {
						const syntheticEvent = {
							...e,
							target: hiddenInputRef.current,
							currentTarget: hiddenInputRef.current,
						} as React.ChangeEvent<HTMLInputElement>;

						onChange(syntheticEvent);
					}
				}
			};

			return (
				<>
					{/* Hidden input (RHF) */}
					<input
						type="number"
						ref={hiddenInputRef}
						name={name}
						defaultValue={value || ""}
						style={{ display: "none" }}
						tabIndex={-1}
						aria-hidden="true"
					/>

					{/* Visible input */}
					<input
						type="text"
						className={cn(
							"flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
							className,
						)}
						value={displayValue}
						onChange={handleChange}
						{...props}
						name={undefined}
					/>
				</>
			);
}


		// =============== Default Variant ===============
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				name={name}
				value={value}
				onChange={onChange}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
