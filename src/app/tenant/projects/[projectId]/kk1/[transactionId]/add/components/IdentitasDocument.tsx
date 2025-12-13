"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function IdentitasDokumen() {
  const { watch } = useFormContext();
  // documentDetails populated from page.tsx via setValue('document', doc)
  const documentDetails = watch("document"); 

  const identitasData = [
    { label: "Jenis Dokumen", value: documentDetails?.jenis_dokumen || '-' },
    { label: "Nomor Dokumen", value: documentDetails?.nomor_dokumen || '-' },
    { 
      label: "Tanggal Dokumen", 
      value: documentDetails?.document_date 
        ? format(new Date(documentDetails.document_date), 'dd/MM/yyyy') 
        : '-' 
    },
    { label: "Jumlah Lembar", value: documentDetails?.jumlah_lembar?.toString() || '-' },
    { label: "Asli/Copy/Digital", value: documentDetails?.status || '-' }, 
  ];

  return (
    <Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
      <CardTitle className="mb-5 font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
        Identitas Dokumen
      </CardTitle>
      {documentDetails ? (
        <div className="flex flex-col gap-2.5">
          {identitasData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm leading-5 tracking-[0.25px]"
            >
              <span className="font-roboto text-[#404040]">{item.label}</span>
              <span className="font-roboto font-medium text-[#404040]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-roboto text-sm text-[#707EAE]">
          Memuat data dokumen...
        </p>
      )}
    </Card>
  );
}
