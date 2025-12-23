import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AffiliateTable } from "./_components/AffiliateTable";
import { AffiliateSummaryCards } from "./_components/AffiliateSummaryCards";

export default function Form1771VPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-gray-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base font-bold">
            Form 1771-VI - Lampiran VI - Transaksi dengan Perusahaan Afiliasi
          </CardTitle>
          <div className="text-sm text-gray-500">
            Daftar penyertaan modal, utang/piutang, dan transaksi lainnya dengan perusahaan afiliasi
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <Tabs defaultValue="bagian-a" className="w-full">
            <TabsList className="w-full rounded-2xl bg-gray-200">
              <TabsTrigger value="bagian-a" className="flex-1 rounded-2xl">
                Bagian A - Penyertaan Modal
              </TabsTrigger>
              <TabsTrigger value="bagian-b" className="flex-1 rounded-2xl">
                Bagian B - Utang & Piutang
              </TabsTrigger>
              <TabsTrigger value="bagian-c" className="flex-1 rounded-2xl">
                Bagian C - Piutang Afiliasi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bagian-a" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="flex items-center justify-center">
                  <CardTitle className="text-base font-bold">
                    Bagian A - Daftar Penyertaan Modal pada Perusahaan Afiliasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AffiliateTable />
                  <AffiliateSummaryCards />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bagian-b" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="flex items-center justify-center">
                  <CardTitle className="text-base font-bold">
                    Bagian B - Utang & Piutang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 text-sm text-gray-500">
                    Tidak ada data utang & piutang dengan perusahaan afiliasi
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bagian-c" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="flex items-center justify-center">
                  <CardTitle className="text-base font-bold">
                    Bagian C - Piutang Afiliasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 text-sm text-gray-500">
                    Tidak ada data piutang afiliasi
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
