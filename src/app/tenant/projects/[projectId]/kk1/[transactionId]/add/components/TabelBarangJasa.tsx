"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface TabelBarangJasaProps {
  taxTypeOptions: { id: string; name: string; type: string }[];
}

export default function TabelBarangJasa({ taxTypeOptions }: TabelBarangJasaProps) {
  const { control, register, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "transaction_items",
  });

  // Watch for changes in quantity and unit_price for each item
  const watchedItems = watch("transaction_items");

  useEffect(() => {
    watchedItems?.forEach((item, index) => {
      const qty = parseFloat(item.quantity as any);
      const unitPrice = parseFloat(item.unit_price as any);
      if (!isNaN(qty) && !isNaN(unitPrice)) {
        setValue(`transaction_items.${index}.total_amount`, qty * unitPrice);
      }
    });
  }, [watchedItems, setValue]);

  return (
    <Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
      <div className="mb-5 flex items-center justify-between">
        <CardTitle className="font-roboto text-[22px] font-medium text-[#404040]">
          Jenis Barang dan/atau Jasa
        </CardTitle>
        <Button
          type="button"
          onClick={() => append({ description: "", quantity: 0, unit_price: 0, total_amount: 0 })}
          className="flex h-12 items-center gap-1 rounded-[10px] bg-[#08F] hover:bg-[#0077dd]"
        >
          <Plus className="h-6 w-6" />
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
            Tambah Item
          </span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="mb-2.5 flex items-center gap-2 text-sm font-medium text-[#404040]">
          <div className="w-[200px] flex-shrink-0">Nama Item</div>
          <div className="w-[100px] flex-shrink-0">Qty</div>
          <div className="w-[120px] flex-shrink-0">Harga Satuan</div>
          <div className="w-[120px] flex-shrink-0">Total Amount</div>
          <div className="w-[150px] flex-shrink-0">Jenis Pajak</div>
          <div className="w-[80px] flex-shrink-0">Tarif (%)</div>
          <div className="w-[50px] flex-shrink-0"></div> {/* Action button */}
        </div>

        <Separator className="mb-2.5" />

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input
              placeholder="Nama Item"
              className="h-[45px] w-[200px] flex-shrink-0 rounded-lg border-none bg-[#F3F3F5]"
              {...register(`transaction_items.${index}.description`)}
            />
            <Input
              type="number"
              placeholder="0"
              className="h-[45px] w-[100px] flex-shrink-0 rounded-lg border-none bg-[#F3F3F5]"
              {...register(`transaction_items.${index}.quantity`, { valueAsNumber: true })}
            />
            <Input
              type="number"
              placeholder="0"
              className="h-[45px] w-[120px] flex-shrink-0 rounded-lg border-none bg-[#F3F3F5]"
              {...register(`transaction_items.${index}.unit_price`, { valueAsNumber: true })}
            />
            <Input
              type="number"
              placeholder="0"
              className="h-[45px] w-[120px] flex-shrink-0 rounded-lg border-none bg-[#F3F3F5]"
              {...register(`transaction_items.${index}.total_amount`, { valueAsNumber: true })}
              readOnly // Auto-calculated
            />
            <Controller
              control={control}
              name={`transaction_items.${index}.tax_type`}
              render={({ field: selectField }) => (
                <Select onValueChange={selectField.onChange} value={selectField.value}>
                  <SelectTrigger className="h-[45px] w-[150px] flex-shrink-0 rounded-lg border-none bg-[#F3F3F5]">
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
            <Input
              type="number"
              placeholder="0"
              className="h-[45px] w-[80px] flex-shrink-0 rounded-lg border-none bg-[#F3F3F5]"
              {...register(`transaction_items.${index}.tax_rate`, { valueAsNumber: true })}
            />
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
    </Card>
  );
}
