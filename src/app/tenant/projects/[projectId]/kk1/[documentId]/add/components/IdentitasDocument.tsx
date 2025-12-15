"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
    <Card className="flex-1 rounded-2xl border  p-5">
      <CardTitle className="mb-5 text-xl  ">
        Identitas Dokumen
      </CardTitle>
      {documentDetails ? (
        <div className="flex flex-col gap-2.5">
          {identitasData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm "
            >
              <span className="">{item.label}</span>
              <span className="font-medium ">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton>
          <div className="flex flex-col gap-2.5">
            {identitasData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="">{item.label}</span>
                <span className="font-medium ">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Skeleton>
      )}
    </Card>
  );
}
