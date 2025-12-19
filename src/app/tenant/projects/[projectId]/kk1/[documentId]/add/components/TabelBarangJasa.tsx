"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TabelBarangJasaProps {
  taxTypeOptions: { id: string; name: string; type: string }[];
}

export default function TabelBarangJasa({
  taxTypeOptions,
}: TabelBarangJasaProps) {
  const { control, register, watch, setValue, formState: { errors } } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transaction_items",
  });

  const transactionItems = watch("transaction_items") || [];
  const currency = watch("currency") || "IDR";
  const itemErrors = errors.transaction_items as any; // Cast for easier access

  // Helper to safely parse numbers
  const parseNum = (val: any) => Number(val) || 0;

  // Calculate totals from transaction_items
  const totalBaseAmount = transactionItems.reduce((sum: number, item: any) => sum + parseNum(item.total_amount), 0);
  const totalPPNItems = transactionItems.reduce((sum: number, item: any) => sum + parseNum(item.ppn), 0);
  const totalP2PPhItems = transactionItems.reduce((sum: number, item: any) => sum + parseNum(item.p2pph), 0);

  // Mappings based on instructions:
  // Tagihan Exclude Pajak = Total of total_amount
  const tagihanExcludePajak = totalBaseAmount;

  // PPN = Total of ppn column
  const ppnSummary = totalPPNItems;

  // P2PPh = Total of p2pph column
  const p2pphSummary = totalP2PPhItems;

  // Jumlah = total_amount + PPN + P2PPh
  const jumlah = totalBaseAmount + totalPPNItems + totalP2PPhItems;

  // Nominal Tagihan Include Pajak = Same as Jumlah
  const totalNominalIncludePajak = jumlah;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const watchedItems = watch("transaction_items");

  useEffect(() => {
    watchedItems?.forEach((item: any, index: number) => {
      const qty = parseFloat(item.quantity as any);
      const unitPrice = parseFloat(item.unit_price as any);

      if (!isNaN(qty) && !isNaN(unitPrice)) {
        // Only update if value changes to avoid loop, though RHF setValue should handle simple cases
        const currentTotal = item.total_amount;
        const newTotal = qty * unitPrice;
        if (currentTotal !== newTotal) {
             setValue(`transaction_items.${index}.total_amount`, newTotal);
        }
      }
    });
  }, [watchedItems, setValue]);

  useEffect(() => {
    setValue('calculated_tagihan_exclude_pajak', tagihanExcludePajak);
  }, [tagihanExcludePajak, setValue]);

  return (
    <Card className="flex flex-col  border rounded-3xl p-5 gap-4">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <CardTitle className="text-xl">Jenis Barang dan/atau Jasa</CardTitle>

          <Button
            type="button"
            onClick={() =>
              append({
                description: "",
                quantity: 0,
                satuan: "",
                unit_price: 0,
                total_amount: 0,
                ppn: 0,
                p2pph: 0,
              })
            }
            className=""
          >
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Tambah Item</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <div className="mb-2.5 w-full justify-between flex items-center gap-2 text-sm font-medium ">
            <div className=" ">Nama Item</div>
            <div className=" ">Qty</div>
            <div className=" ">Satuan</div>
            <div className=" ">Harga Satuan</div>
            <div className=" ">Line Amount</div>
            <div className=" ">PPN</div>
            <div className=" ">P2PPH</div>
            <div className=" "></div>
          </div>

          <Separator className="mb-2.5" />

          {fields?.map((field, index) => (
            <div key={field.id} className="mb-4 flex items-start gap-2 px-1">
              <div className=" max-w-36 flex flex-col gap-1">
                  <Input
                    placeholder="Nama Item"
                    className={cn(itemErrors?.[index]?.description && "border-red-500")}
                    {...register(`transaction_items.${index}.description`)}
                  />
                  {itemErrors?.[index]?.description && <p className="text-[10px] text-red-500">{itemErrors[index].description.message}</p>}
              </div>

              <div className="w-24 flex flex-col gap-1">
                  <Input
                    type="number"
                    placeholder="0"
                    className={cn(itemErrors?.[index]?.quantity && "border-red-500")}
                    {...register(`transaction_items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                  />
                  {itemErrors?.[index]?.quantity && <p className="text-[10px] text-red-500">{itemErrors[index].quantity.message}</p>}
              </div>

              <div className="w-24 flex flex-col gap-1">
                  <Input
                    placeholder="Satuan"
                    className={cn(itemErrors?.[index]?.satuan && "border-red-500")}
                    {...register(`transaction_items.${index}.satuan`)}
                  />
                  {itemErrors?.[index]?.satuan && <p className="text-[10px] text-red-500">{itemErrors[index].satuan.message}</p>}
              </div>

              <div className="w-32 flex flex-col gap-1">
                  <Input
                    type="number"
                    placeholder="0"
                    className={cn(itemErrors?.[index]?.unit_price && "border-red-500")}

                    {...register(`transaction_items.${index}.unit_price`, {
                      valueAsNumber: true,
                    })}
                  />
                  {itemErrors?.[index]?.unit_price && <p className="text-[10px] text-red-500">{itemErrors[index].unit_price.message}</p>}
              </div>

              <div className="w-32 flex flex-col gap-1">
                  <Input
                    type="number"
                    readOnly
                    placeholder="0"
                    className={cn("cursor-not-allowed", itemErrors?.[index]?.total_amount && "border-red-500")}
                    {...register(`transaction_items.${index}.total_amount`, {
                      valueAsNumber: true,
                    })}
                  />
                  {itemErrors?.[index]?.total_amount && <p className="text-[10px] text-red-500">{itemErrors[index].total_amount.message}</p>}
              </div>

              <div className="w-28 flex flex-col gap-1">
                  <Input
                    type="number"
                    placeholder="0"
                    className=""
                    {...register(`transaction_items.${index}.ppn`, {
                      valueAsNumber: true,
                    })}
                  />
              </div>

              <div className="w-28 flex flex-col gap-1">
                  <Input
                    type="number"
                    placeholder="0"
                    className=""
                    {...register(`transaction_items.${index}.p2pph`, {
                      valueAsNumber: true,
                    })}
                  />
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 mt-0"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {/* General item array error (e.g. min 1 item) */}
          {errors.transaction_items && !Array.isArray(errors.transaction_items) && (
             <p className="text-sm text-red-500 mt-2">{(errors.transaction_items as any).message}</p>
          )}
        </div>
      </div>
      <Separator />

      <div className="flex flex-col ">
        <div className="flex gap-5">
          <Card className="flex-1  rounded-[20px] shadow-none   h-fit py-5">
            <div className="flex flex-col gap-2 ">
              {/* Jumlah */}
              <div className="flex items-center justify-center">
                <span className="w-80 text-sm font-medium ">Jumlah</span>
                <div className="flex flex-1 gap-2.5">
                  <Input
                    value={formatCurrency(jumlah)}
                    className="cursor-pointer"
                    readOnly
                  />
                </div>
              </div>

              {/* Tagihan Exclude Pajak */}
              <div className="flex items-center justify-center  ">
                <span className="w-80 text-sm font-medium ">
                  Tagihan Exclude Pajak
                </span>
                <div className="flex flex-1 gap-2.5">
                  <Input
                    value={formatCurrency(tagihanExcludePajak)}
                    className="cursor-pointer"
                    readOnly
                  />
                </div>
              </div>

              {/* PPN */}
              <div className="flex items-center justify-center">
                <span className="w-80 text-sm font-medium ">PPN</span>
                <div className="flex flex-1 gap-2.5">
                  <Input
                    value={formatCurrency(ppnSummary)}
                    className="cursor-pointer"
                    readOnly
                  />
                </div>
              </div>

              {/* P2PPh */}
              <div className="flex items-center justify-center">
                <span className="w-80 text-sm font-medium ">P2PPh</span>
                <div className="flex flex-1 gap-2.5">
                  <Input
                    value={formatCurrency(p2pphSummary)}
                    className="cursor-pointer"
                    readOnly
                  />
                </div>
              </div>

              {/* Nominal Tagihan Include Pajak */}
              <div className="flex items-center justify-center">
                <span className="w-80 text-sm font-medium ">
                  Nominal Tagihan Include Pajak
                </span>
                <div className="flex flex-1 gap-2.5">
                  <Input
                    value={formatCurrency(totalNominalIncludePajak)}
                    className="cursor-pointer"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </Card>

          <div>
            {/* Kontrol Matematis */}
            <Card className="w-80 mb-4 shadow-none rounded-[20px]  h-full py-5">
              <h3 className="font-medium text-xl">Kontrol Matematis</h3>
              <span className="mb-6 flex text-xs">
                Exclude + PPN + PPh = Include
              </span>
              <div className="flex flex-col gap-2 text-sm ">
                <div className="flex justify-between">
                  <span className="">Exclude</span>
                  <span className="">
                    {formatCurrency(tagihanExcludePajak)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="">PPN</span>
                  <span className="">{formatCurrency(ppnSummary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="">Total PPH</span>
                  <span className="">{formatCurrency(p2pphSummary)}</span>
                </div>
                <div className="flex justify-between border-t  pt-2">
                  <span className="">Total</span>
                  <span className="">
                    {formatCurrency(jumlah)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}
