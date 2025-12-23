import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxCreditTable } from "./_components/TaxCreditTable";
import { RecapitulationCard } from "./_components/RecapitulationCard";
import { DataSourceCard } from "./_components/DataSourceCard";

export default function Form1771IIIPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-base font-bold">
            Form 1771-III - Kredit Pajak Dalam Negeri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <TaxCreditTable />

          <div className="flex gap-[30px]">
            <RecapitulationCard />
            <DataSourceCard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
