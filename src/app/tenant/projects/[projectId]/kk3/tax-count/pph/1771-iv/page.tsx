import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BagianATable } from "./_components/BagianATable";
import { SummaryCards } from "./_components/SummaryCards";

export default function Form1771IVPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="space-y-8 rounded-2xl bg-white p-6">
        <div className="font-normal text-base">
          Form 1771-IV - PPh Final dan Penghasilan yang Tidak Termasuk Objek Pajak
        </div>

        <Tabs defaultValue="bagian-a" className="w-full">
          <TabsList className="w-full rounded-2xl bg-gray-200">
            <TabsTrigger value="bagian-a" className="flex-1 rounded-2xl">
              Bagian A - PPh Final
            </TabsTrigger>
            <TabsTrigger value="bagian-b" className="flex-1 rounded-2xl">
              Bagian B - Non-Objek Pajak
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bagian-a" className="mt-8">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  Bagian A - PPh Final
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BagianATable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bagian-b" className="mt-8">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  Bagian B - Non-Objek Pajak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12 text-sm text-gray-500">
                  Tidak ada data penghasilan non-objek pajak
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <SummaryCards />
      </div>
    </div>
  );
}
