import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Paperclip, Upload } from 'lucide-react';

export function DocumentUpload() {
  return (
    <Card className="flex flex-col items-center gap-[26.25px] self-stretch rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
      <CardHeader>
        <CardTitle className="flex w-[968.6px] items-start gap-[7px]">
          <Paperclip className="h-[18px] w-[18px] text-[#1E293B]" />
          <span className="text-[15.75px] font-medium leading-[15.75px] tracking-[-0.394px] text-[#1E293B]">
            Lampiran Dokumen
          </span>
        </CardTitle>
        <CardDescription className="flex w-[968.6px] items-center text-xs font-normal leading-[19.6px] text-[#64748B]">
          Upload dokumen pendukung voucher jurnal
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center self-stretch">
        <Label
          htmlFor="file-upload"
          className="flex h-[111.688px] flex-1 cursor-pointer flex-col items-start rounded-[7px] border-[1.6px] border-dashed border-[rgba(100,116,139,0.25)]"
        >
          <div className="flex flex-col items-center gap-[7px] self-stretch p-6">
            <Upload className="h-7 w-7 text-[#64748B]" />
            <div className="flex w-[177.563px] flex-col items-start gap-[2.8px]">
              <div className="flex items-start self-stretch">
                <span className="flex-1 text-center text-xs font-medium leading-[17.5px] text-[#1E293B]">
                  Klik untuk upload file
                </span>
              </div>
              <div className="flex items-start self-stretch">
                <span className="text-center text-[10.5px] font-medium leading-[14px] text-[#64748B]">
                  PDF, DOC, XLS, JPG, PNG (Max 10MB)
                </span>
              </div>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
        </Label>
      </CardContent>
    </Card>
  );
}
