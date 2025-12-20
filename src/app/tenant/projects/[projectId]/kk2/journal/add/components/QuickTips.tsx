import { Card, CardContent, CardTitle } from "@/components/ui/card";

const tips = [
	"Setiap baris hanya bisa diisi debit ATAU kredit, tidak keduanya",
	"Total debit harus sama dengan total kredit",
	"Gunakan template untuk mempercepat input data",
	"Upload dokumen pendukung untuk audit trail",
];

export function QuickTips() {
	return (
		<Card className="flex flex-col items-center justify-end gap-[26.25px] self-stretch rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
			<CardTitle className="flex h-[25px] w-[452px] items-center p-6 pb-0 text-base font-medium leading-[24.5px] tracking-[-0.394px] ">
				Quick Tips
			</CardTitle>

			<CardContent className="flex w-[494px] flex-col items-start gap-[7px]">
				{tips.map((tip, index) => (
					<div key={index} className="flex items-center gap-[7px] self-stretch">
						<div className="h-[7px] w-[7px] rounded-full bg-primary" />
						<div className="flex items-start">
							<span className="text-xs leading-[17.5px] ">{tip}</span>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
