"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface KertasKerjaPerpajakanProps {
  taxTypeOptions: { id: string; name: string; type: string }[];
}

export default function KertasKerjaPerpajakan({ taxTypeOptions }: KertasKerjaPerpajakanProps) {
  const { control, register, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "transaction_taxes",
  });

  const currency = watch("currency") || "IDR";
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  // Pre-fill initial tax types based on common ones, or allow dynamic addition
  useEffect(() => {
    if (fields.length === 0 && taxTypeOptions.length > 0) {
      // Example: Pre-fill with common tax types
      const initialTaxes = [
        { tax_code: "SETORAN_PAJAK", tax_percentage: 0, tax_nominal: 0, description: "Setoran Pajak" },
        { tax_code: "PPN", tax_percentage: 0, tax_nominal: 0, description: "Pajak Pertambahan Nilai" },
        { tax_code: "PPH21", tax_percentage: 0, tax_nominal: 0, description: "Pajak Penghasilan Pasal 21" },
        { tax_code: "PPH23", tax_percentage: 0, tax_nominal: 0, description: "Pajak Penghasilan Pasal 23" },
        { tax_code: "PPH4_2", tax_percentage: 0, tax_nominal: 0, description: "Pajak Penghasilan Pasal 4 Ayat 2" },
        { tax_code: "PIUTANG_PPH", tax_percentage: 0, tax_nominal: 0, description: "Piutang/Kredit PPh" },
        { tax_code: "PPH_LAINNYA", tax_percentage: 0, tax_nominal: 0, description: "Pajak Penghasilan Lainnya" },
      ].filter(tax => taxTypeOptions.some(opt => opt.name === tax.tax_code)); // Only add if option exists

      if (initialTaxes.length > 0) {
        append(initialTaxes);
      }
    }
  }, [taxTypeOptions, fields.length, append]);


  return (
    <>
      <Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
        <div className="mb-5 flex items-center justify-between">
          <CardTitle className="font-roboto text-[22px] font-medium text-[#404040]">
            Kertas Kerja Perpajakan (Objek Pajak)
          </CardTitle>
          <Button
            type="button"
            onClick={() => append({ tax_code: "", tax_percentage: 0, tax_nominal: 0 })}
            className="flex h-12 items-center gap-1 rounded-[10px] bg-[#08F] hover:bg-[#0077dd]"
          >
            <Plus className="h-6 w-6" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
              Tambah Pajak
            </span>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-5 items-center">
              <div className="flex flex-1 flex-col gap-2">
                <Label className="font-roboto text-base font-medium text-[#3F3F3F]">
                  Jenis Pajak
                </Label>
                <Controller
                  control={control}
                  name={`transaction_taxes.${index}.tax_code`}
                  render={({ field: selectField }) => (
                    <Select onValueChange={selectField.onChange} value={selectField.value}>
                      <SelectTrigger className="h-[53px] rounded-lg border-none bg-[#F3F3F5]">
                        <SelectValue placeholder="Pilih Jenis Pajak" />
                      </SelectTrigger>
                      <SelectContent>
                        {taxTypeOptions.map((option) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label className="font-roboto text-base font-medium text-[#3F3F3F]">
                  Tarif (%)
                </Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                  {...register(`transaction_taxes.${index}.tax_percentage`, { valueAsNumber: true })}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label className="font-roboto text-base font-medium text-[#3F3F3F]">
                  Nominal
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                  {...register(`transaction_taxes.${index}.tax_nominal`, { valueAsNumber: true })}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-[45px] w-[50px] flex-shrink-0"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-5 w-5 text-red-600" />
              </Button>
            </div>
          ))}
        </div>

        {/* Catatan Umum Transaksi */}
        <div className="flex flex-col gap-2 mt-4">
          <Label htmlFor="general_notes" className="font-roboto text-base font-medium text-[#3F3F3F]">
            Catatan Umum Transaksi
          </Label>
          <Textarea
            id="general_notes"
            placeholder="Deskripsi catatan"
            className="min-h-[100px] rounded-lg border border-[rgba(145,158,171,0.20)]"
            {...register("general_notes")}
          />
        </div>
      </Card>
      <div></div>
    </>
  );
}
