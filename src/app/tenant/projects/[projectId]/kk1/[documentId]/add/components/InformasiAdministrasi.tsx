"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function IdentitasDokumen() {
  const { watch } = useFormContext();
  // documentDetails populated from page.tsx via setValue('document', doc)
  const documentDetails = watch("document");

  const identitasData = [
    { label: "Divisi", value: documentDetails?.division || '-' },
    { label: "Admin PIC", value: documentDetails?.admin_pic || '-' },
    {
      label: "Posisi Dokumen Asli",
      value: documentDetails?.original_position || '-'
    },
    { label: "Nomor Urut Sortiran dari Klien", value: documentDetails?.client_sort_order?.toString() || '-' },
  ];

 return (
    <Card className="flex-1 rounded-2xl border  p-5">
      <CardTitle className="mb-5 text-xl  text-primary">
        Informasi Administrasi
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
        <p className="text-sm ">
          Memuat data dokumen...
        </p>
      )}
    </Card>
  );
}
