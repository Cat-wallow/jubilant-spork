"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const { control, register } = useFormContext();

  return (
    <Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
      <CardTitle className="mb-5 font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
        Informasi Objek Pajak
      </CardTitle>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="category" className="text-base font-medium text-[#404040]">
              Jenis Transaksi
            </Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[45px] rounded-lg border-none bg-[#F3F3F5]">
                    <SelectValue placeholder="Pilih jenis transaksi" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisTransaksiOptions.map((option) => (
                      <SelectItem key={option.id} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="counterparty_type" className="text-base font-medium text-[#404040]">
              Subjek Lawan
            </Label>
            <Controller
              control={control}
              name="counterparty_type"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[45px] rounded-lg border-none bg-[#F3F3F5]">
                    <SelectValue placeholder="OP/Badan" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjekLawanOptions.map((option) => (
                      <SelectItem key={option.id} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="vendor_pkp_status" className="text-base font-medium text-[#404040]">
              Tipe PKP
            </Label>
            <Controller
              control={control}
              name="vendor_pkp_status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[45px] rounded-lg border-none bg-[#F3F3F5]">
                    <SelectValue placeholder="PKP/Non-PKP" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipePkpOptions.map((option) => (
                      <SelectItem key={option.id} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="vendor_npwp" className="text-base font-medium text-[#404040]">NPWP</Label>
            <Input
              id="vendor_npwp"
              placeholder="23232312312312312323"
              className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
              {...register("vendor_npwp")}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="description" className="text-base font-medium text-[#404040]">
              Jenis Barang/Jasa
            </Label>
            <Input
              id="description"
              placeholder="Deskripsi barang/jasa"
              className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
              {...register("description")} // Using main transaction description
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <Label htmlFor="general_notes" className="text-base font-medium text-[#404040]">
              Keterangan B/J
            </Label>
            <Textarea
              id="general_notes"
              placeholder="Keterangan tambahan"
              className="min-h-[64px] rounded-lg border-none bg-[#F3F3F5]"
              {...register("general_notes")}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
