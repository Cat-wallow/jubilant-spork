"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function InformasiAdministrasi() {
  const { watch } = useFormContext();
  const documentDetails = watch("document");
  // Transaction info from form state (populated on edit)
  const transactionNumber = watch("transaction_number"); 
  const transactionDate = watch("transaction_date");

  const identitasData = [
    { label: "Divisi", value: documentDetails?.division || "-" },
    { label: "Admin PIC", value: documentDetails?.admin_pic || "-" },
    {
      label: "Posisi Dokumen Asli",
      value: documentDetails?.original_position || "-",
    },
    {
      label: "Nomor Urut Sortiran dari Klien",
      value: documentDetails?.client_sort_order?.toString() || "-",
    },
    ...(transactionNumber ? [{ label: "Nomor Transaksi", value: transactionNumber }] : []),
    ...(transactionDate ? [{ label: "Tanggal Transaksi", value: format(new Date(transactionDate), "dd/MM/yyyy") }] : []),
  ];

  return (
    <Card className="flex-1 rounded-2xl border p-5">
      <CardTitle className="mb-5 text-xl text-primary">
        Informasi Administrasi
      </CardTitle>
      {documentDetails ? (
        <div className="flex flex-col gap-2.5">
          {identitasData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm "
            >
              <span className="">{item.label}</span>
              <span className="font-medium ">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm ">Memuat data dokumen...</p>
      )}
    </Card>
  );
}