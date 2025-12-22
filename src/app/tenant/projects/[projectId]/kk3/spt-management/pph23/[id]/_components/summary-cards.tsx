import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "./spt-data";

interface SummaryCardsProps {
  dppTotal: number;
  ppnKeluaran: number;
  ppnMasukan: number;
  ppnTerutang: number;
}

export function SummaryCards({
  dppTotal,
  ppnKeluaran,
  ppnMasukan,
  ppnTerutang
}: SummaryCardsProps) {
  const cards = [
    {
      label: "DPP Total",
      value: dppTotal,
      color: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      label: "PPN Keluaran",
      value: ppnKeluaran,
      color: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      label: "PPN Masukan",
      value: ppnMasukan,
      color: "bg-purple-500",
      textColor: "text-purple-600"
    },
    {
      label: "PPN Terutang",
      value: ppnTerutang,
      color: "bg-red-500",
      textColor: "text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {cards.map((card) => (
        <Card key={card.label} className="border-black/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${card.color}`} />
              <span className="text-sm text-black/90">{card.label}</span>
            </div>
            <div className={`text-2xl font-bold ${card.textColor}`}>
              {formatCurrency(card.value)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
