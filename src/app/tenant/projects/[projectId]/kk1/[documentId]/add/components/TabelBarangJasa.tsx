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

interface TabelBarangJasaProps {
  taxTypeOptions: { id: string; name: string; type: string }[];
}

export default function TabelBarangJasa({ taxTypeOptions }: TabelBarangJasaProps) {
  const { control, register,watch, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transaction_items",
  });

  const transactionItems = watch("transaction_items");
  // transactionTaxes is now an object, not an array
  const transactionTaxes = watch("transaction_taxes") || {}; 
  const discountAmount = watch("discount_amount");
  const currency = watch("currency") || "IDR";

  const calculateTotalAmount = () => {
    return transactionItems.reduce((sum: number, item: any) => sum + (item.total_amount || 0), 0);
  };

  // Directly access the tax nominals from the transactionTaxes object
  const totalPPN = transactionTaxes.ppn || 0;
  const totalP2PPh = (transactionTaxes.pph_21 || 0) + (transactionTaxes.pph_23 || 0) + (transactionTaxes.pph_4_2 || 0) + (transactionTaxes.other_pph || 0) + (transactionTaxes.pph_credit || 0);

  const totalItemsAmount = calculateTotalAmount();
  // Simplified nominalExcludePajak for now, based on provided current logic.
  // This may need adjustment if actual tax calculation logic is more complex.
  const nominalExcludePajak = totalItemsAmount - totalPPN; 

  // Simplified totalNominalIncludePajak for now, based on provided current logic.
  // This may need adjustment if actual tax calculation logic is more complex.
  const totalNominalIncludePajak = totalItemsAmount + totalPPN + totalP2PPh - (discountAmount || 0); 

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };


  const watchedItems = watch("transaction_items");

  useEffect(() => {
    watchedItems?.forEach((item, index) => {
      const qty = parseFloat(item.quantity as any);
      const unitPrice = parseFloat(item.unit_price as any);

      if (!isNaN(qty) && !isNaN(unitPrice)) {
        setValue(
          `transaction_items.${index}.total_amount`,
          qty * unitPrice
        );
      }
    });
  }, [watchedItems, setValue]);

  return (
    <Card className="flex flex-col  border rounded-3xl p-5 gap-4">
      <div>
      <div className="mb-6 flex items-center justify-between">
        <CardTitle className="text-xl">
          Jenis Barang dan/atau Jasa
        </CardTitle>

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
          <span className="text-sm font-medium">
            Tambah Item
          </span>
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

        {fields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center gap-2 px-1">
            <Input
              placeholder="Nama Item"
              className=""
              {...register(`transaction_items.${index}.description`)}
            />

            <Input
              type="number"
              placeholder="0"
              className=""
              {...register(`transaction_items.${index}.quantity`, {
                valueAsNumber: true,
              })}
            />

            <Input
              placeholder="Satuan"
              className=""
              {...register(`transaction_items.${index}.satuan`)}
            />

            <Input
              type="number"
              placeholder="0"
              className=""
              variant="idr"
              {...register(`transaction_items.${index}.unit_price`, {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              readOnly
              placeholder="0"
              className="cursor-not-allowed"
              {...register(`transaction_items.${index}.total_amount`, {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              placeholder="0"
              className=""

              variant="idr"

              {...register(`transaction_items.${index}.ppn`, {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              placeholder="0"
              className=""
              variant="idr"

              {...register(`transaction_items.${index}.p2pph`, {
                valueAsNumber: true,
              })}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-full "
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      </div>
      <Separator/>

      <div className="flex flex-col ">
        <div className="flex gap-5">
        <Card className="flex-1  rounded-[20px] shadow-none   h-fit py-5">
          <div className="flex flex-col gap-2 ">
            {/* Jumlah */}
            <div className="flex items-center justify-center">
              <span className="w-80 text-sm font-medium ">
                Jumlah
              </span>
              <div className="flex flex-1 gap-2.5">
                <Input
                  value={formatCurrency(totalItemsAmount)}
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
                  value={formatCurrency(nominalExcludePajak)}
                  className="cursor-pointer"
                  readOnly
                />
              </div>
            </div>

            {/* PPN */}
            <div className="flex items-center justify-center">
              <span className="w-80 text-sm font-medium ">
                PPN
              </span>
              <div className="flex flex-1 gap-2.5">
                <Input
                  value={formatCurrency(totalPPN)}
                  className="cursor-pointer"
                  readOnly
                />
              </div>
            </div>

            {/* P2PPh */}
            <div className="flex items-center justify-center">
              <span className="w-80 text-sm font-medium ">
                P2PPh
              </span>
              <div className="flex flex-1 gap-2.5">
                <Input
                  value={formatCurrency(totalP2PPh)}
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
            <h3 className="font-medium text-xl">
              Kontrol Matematis
            </h3>
            <span className="mb-6 flex text-xs">Exclude + PPN + PPh = Include</span>
            <div className="flex flex-col gap-2 text-sm ">
              <div className="flex justify-between">
                <span className="">Exclude</span>
                <span className="">{formatCurrency(nominalExcludePajak)}</span>
              </div>
              <div className="flex justify-between">
                <span className="">PPN</span>
                <span className="">{formatCurrency(totalPPN)}</span>
              </div>
              <div className="flex justify-between">
                <span className="">Total PPH</span>
                <span className="">{formatCurrency(totalP2PPh)}</span>
              </div>
              <div className="flex justify-between border-t  pt-2">
                <span className="">Total</span>
                <span className="">{formatCurrency(nominalExcludePajak + totalPPN + totalP2PPh)}</span>
              </div>
            </div>
          </Card>

        </div>
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col min-w-[40rem] h-10 gap-[5px]">
            <Label htmlFor="general_notes" className="">
              Catatan*
            </Label>
            <Textarea
              placeholder="Keterangan tambahan"
              className="min-h-10"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label className="">Tipe Tagihan</Label>
            <Select> {/* This part needs to be controlled by RHF */}
              <SelectTrigger className="rounded-lg  ">
                <SelectValue placeholder="Termin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Termin">Termin</SelectItem>
                <SelectItem value="DP">DP</SelectItem>
                <SelectItem value="Sisa">Sisa</SelectItem>
                <SelectItem value="Total">Total</SelectItem>
                <SelectItem value="Nihil">Nihil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
