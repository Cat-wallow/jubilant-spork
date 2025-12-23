import { Card } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface TableRow {
	no: string;
	perincian: string;
	hargaPokok: string;
	biayaUsaha: string;
	biayaLuar: string;
	jumlah: string;
	isTotal?: boolean;
	isNegative?: boolean;
}

interface DetailTableProps {
	data: {
		title: string;
		rows: TableRow[];
	};
}

export function DetailTable({ data }: DetailTableProps) {
	return (
		<Card className="rounded-[14px] border border-black/10 bg-white p-0 shadow-sm">
			<div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-6">
				<h3 className="font-bold text-base leading-4 text-slate-900">{data.title}</h3>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-black/10 bg-slate-100/50 hover:bg-slate-100/50">
							<TableHead className="h-[40.4px] px-2 py-2 text-left text-sm font-normal text-slate-900">
								No
							</TableHead>
							<TableHead className="h-[40.4px] px-2 py-2 text-left text-sm font-normal text-slate-900">
								Perincian
							</TableHead>
							<TableHead className="h-[40.4px] px-2 py-2 text-right text-sm font-normal text-slate-900">
								<div className="flex flex-col items-end">
									<span>Harga Pokok Penjualan</span>
									<span className="text-xs text-slate-500">(Rupiah)</span>
								</div>
							</TableHead>
							<TableHead className="h-[40.4px] px-2 py-2 text-right text-sm font-normal text-slate-900">
								<div className="flex flex-col items-end">
									<span>Biaya Usaha Lainnya</span>
									<span className="text-xs text-slate-500">(Rupiah)</span>
								</div>
							</TableHead>
							<TableHead className="h-[40.4px] px-2 py-2 text-right text-sm font-normal text-slate-900">
								<div className="flex flex-col items-end">
									<span>Biaya dari Luar Usaha</span>
									<span className="text-xs text-slate-500">(Rupiah)</span>
								</div>
							</TableHead>
							<TableHead className="h-[40.4px] px-2 py-2 text-right text-sm font-normal text-slate-900">
								<div className="flex flex-col items-end">
									<span>Jumlah</span>
									<span className="text-xs text-slate-500">(Rupiah)</span>
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.rows.map((row, idx) => (
							<TableRow
								key={idx}
								className={`border-b border-black/10 ${
									row.isTotal ? 'bg-blue-50/50 hover:bg-blue-50/50' : 'hover:bg-slate-50/50'
								}`}
							>
								<TableCell className="px-2 py-2 text-sm font-normal text-slate-900">
									{row.no}
								</TableCell>
								<TableCell className="px-2 py-2 text-sm font-normal text-slate-900">
									{row.perincian}
								</TableCell>
								<TableCell
									className={`px-2 py-2 text-right font-mono text-sm font-normal ${
										row.isNegative ? 'text-red-600' : row.hargaPokok === '-' ? 'text-slate-400' : 'text-slate-900'
									}`}
								>
									{row.hargaPokok}
								</TableCell>
								<TableCell
									className={`px-2 py-2 text-right font-mono text-sm font-normal ${
										row.biayaUsaha === '-' ? 'text-slate-400' : 'text-slate-900'
									}`}
								>
									{row.biayaUsaha}
								</TableCell>
								<TableCell
									className={`px-2 py-2 text-right font-mono text-sm font-normal ${
										row.biayaLuar === '-' ? 'text-slate-400' : 'text-slate-900'
									}`}
								>
									{row.biayaLuar}
								</TableCell>
								<TableCell
									className={`px-2 py-2 text-right font-mono text-sm font-normal ${
										row.isNegative ? 'text-red-600' : row.jumlah === '-' ? 'text-slate-400' : 'text-slate-900'
									}`}
								>
									{row.jumlah}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
}
