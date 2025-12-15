"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

interface InformasiObjekPajakProps {
  jenisTransaksiOptions: { id: string; name: string; type: string }[];
  subjekLawanOptions: { id: string; name: string; type: string }[];
  tipePkpOptions: { id: string; name: string; type: string }[];
}

export default function InformasiObjekPajak({
  jenisTransaksiOptions,
  subjekLawanOptions,
  tipePkpOptions,
}: InformasiObjekPajakProps) {
  const { control, register, watch } = useFormContext();

  const categoryValue = watch("category");
  const counterpartyTypeValue = watch("counterparty_type");
  const vendorPkpStatusValue = watch("vendor_pkp_status");

  const selectedCategoryName = useMemo(() => {
    return jenisTransaksiOptions.find(o => o.id === categoryValue)?.name;
  }, [jenisTransaksiOptions, categoryValue]);

  const selectedCounterpartyTypeName = useMemo(() => {
    return subjekLawanOptions.find(o => o.id === counterpartyTypeValue)?.name;
  }, [subjekLawanOptions, counterpartyTypeValue]);

  const selectedVendorPkpStatusName = useMemo(() => {
    return tipePkpOptions.find(o => o.id === vendorPkpStatusValue)?.name;
  }, [tipePkpOptions, vendorPkpStatusValue]);

  return (
    <Card className="rounded-[20px] border p-5">
      <CardTitle className="mb-5 text-xl text-primary">
        Informasi Objek Pajak
      </CardTitle>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="category">Jenis Transaksi</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis transaksi">
                      {selectedCategoryName || "Pilih jenis transaksi"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {jenisTransaksiOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="counterparty_type">Subjek Lawan</Label>
            <Controller
              control={control}
              name="counterparty_type"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="OP/Badan">
                      {selectedCounterpartyTypeName || "OP/Badan"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {subjekLawanOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="vendor_pkp_status">Tipe PKP</Label>
            <Controller
              control={control}
              name="vendor_pkp_status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="PKP/Non-PKP">
                      {selectedVendorPkpStatusName || "PKP/Non-PKP"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {tipePkpOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="vendor_npwp">NPWP</Label>
            <Input
              id="vendor_npwp"
              placeholder="23232312312312312323"
              {...register("vendor_npwp")}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="description">Jenis Barang/Jasa</Label>
            <Input
              id="description"
              placeholder="Deskripsi barang/jasa"
              {...register("description")}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="general_notes">Keterangan B/J</Label>
            <Textarea
              id="general_notes"
              placeholder="Keterangan tambahan"
              className="min-h-10"
              {...register("general_notes")}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
