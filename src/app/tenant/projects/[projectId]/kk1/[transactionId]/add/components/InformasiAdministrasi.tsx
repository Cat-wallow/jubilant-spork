"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function InformasiAdministrasi() {
  const { control, register, watch } = useFormContext();

  return (
    <Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
      <CardTitle className="mb-5 font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
        Informasi Administrasi
      </CardTitle>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[5px]">
          <Label htmlFor="transaction_number" className="text-base font-medium text-[#404040]">
            Nomor Transaksi
          </Label>
          <Input
            id="transaction_number"
            placeholder="TRX-YYYYMMDD-XXXX"
            className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
            {...register("transaction_number")}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <Label htmlFor="transaction_date" className="text-base font-medium text-[#404040]">
            Tanggal Transaksi
          </Label>
          <Controller
            control={control}
            name="transaction_date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "h-[45px] justify-start text-left font-normal rounded-lg border-none bg-[#F3F3F5]",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value && !isNaN(new Date(field.value).getTime())
                      ? format(new Date(field.value), "PPP")
                      : <span>Pilih tanggal</span>
                    }

                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <Label htmlFor="description" className="text-base font-medium text-[#404040]">
            Deskripsi Transaksi
          </Label>
          <Textarea
            id="description"
            placeholder="Deskripsi singkat transaksi"
            className="min-h-[64px] rounded-lg border-none bg-[#F3F3F5]"
            {...register("description")}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <Label htmlFor="vendor_name" className="text-base font-medium text-[#404040]">
            Nama Vendor/Lawan Transaksi
          </Label>
          <Input
            id="vendor_name"
            placeholder="Nama Perusahaan atau Individu"
            className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
            {...register("vendor_name")}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <Label htmlFor="vendor_npwp" className="text-base font-medium text-[#404040]">
            NPWP Vendor
          </Label>
          <Input
            id="vendor_npwp"
            placeholder="NPWP Vendor atau Lawan Transaksi"
            className="h-[45px] rounded-lg border-none bg-[#F3F3F5]"
            {...register("vendor_npwp")}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <Label htmlFor="general_notes" className="text-base font-medium text-[#404040]">
            Catatan Umum Transaksi
          </Label>
          <Textarea
            id="general_notes"
            placeholder="Catatan tambahan untuk transaksi"
            className="min-h-[64px] rounded-lg border-none bg-[#F3F3F5]"
            {...register("general_notes")}
          />
        </div>

      </div>
    </Card>
  );
}
