import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RunsTab from "./components/RunsTab";
import WorkSpaceTab from "./components/WorkSpaceTab";
import ApprovalsTab from "./components/ApprovalsTab";
import { Calculator, CircleCheck, File, FileText } from "lucide-react";

export default function Form1771IVPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="space-y-8 rounded-2xl  p-6">

        <Tabs defaultValue="runs" className="w-full">
          <TabsList className="w-full rounded-2xl bg-gray-200">
            <TabsTrigger value="runs" className="flex-1 gap-2 items-center rounded-2xl">
              <FileText className="h-4 w-4"/>
              Runs
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex-1 gap-2 items-center rounded-2xl">
              <Calculator className="h-4 w-4"/>
              Workspace
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex-1 gap-2 items-center rounded-2xl">
              <CircleCheck className="h-4 w-4"/>
              Approvals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="runs" >
                <RunsTab/>
          </TabsContent>

          <TabsContent value="workspace" >
                <WorkSpaceTab/>
          </TabsContent>
          <TabsContent value="approvals" >
                <ApprovalsTab/>
          </TabsContent>

          <TabsContent value="bagian-b" >
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

      </div>
    </div>
  );
}
