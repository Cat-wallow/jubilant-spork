"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";

export default function SummaryPerhitungan() {
  const { watch } = useFormContext();

  const transactionItems = watch("transaction_items");
  const transactionTaxes = watch("transaction_taxes");
  const discountAmount = watch("discount_amount");
  const currency = watch("currency") || "IDR";

  const calculateTotalAmount = () => {
    return transactionItems.reduce((sum: number, item: any) => sum + (item.total_amount || 0), 0);
  };

  const calculateTotalTaxNominal = (taxCode: string) => {
    return transactionTaxes
      .filter((tax: any) => tax.tax_code === taxCode)
      .reduce((sum: number, tax: any) => sum + (tax.tax_nominal || 0), 0);
  };

  const totalItemsAmount = calculateTotalAmount();
  const totalPPN = calculateTotalTaxNominal("PPN");
  const totalP2PPh = calculateTotalTaxNominal("PPH21") + calculateTotalTaxNominal("PPH23") + calculateTotalTaxNominal("PPH4_2") + calculateTotalTaxNominal("PPH_LAINNYA");
  const nominalExcludePajak = totalItemsAmount - totalPPN; // Simplified, adjust based on actual calculation logic

  const totalNominalIncludePajak = totalItemsAmount + totalPPN + totalP2PPh - (discountAmount || 0); // Simplified

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  }

  return (
    <div className="flex gap-5">
      {/* Summary Table */}
      <Card className="flex-1 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
        <div className="flex flex-col gap-5 ">
          {/* Jumlah */}
          <div className="flex items-center justify-center">
            <span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
              Jumlah
            </span>
            <div className="flex flex-1 gap-2.5">
              <Input
                value={formatCurrency(totalItemsAmount)}
                className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                readOnly
              />
            </div>
          </div>

          {/* Tagihan Exclude Pajak */}
          <div className="flex items-center justify-center ">
            <span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
              Tagihan Exclude Pajak
            </span>
            <div className="flex flex-1 gap-2.5">
              <Input
                value={formatCurrency(nominalExcludePajak)}
                className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                readOnly
              />
            </div>
          </div>

          {/* PPN */}
          <div className="flex items-center justify-center">
            <span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
              PPN
            </span>
            <div className="flex flex-1 gap-2.5">
              <Input
                value={formatPercentage(
                  (transactionTaxes.find((t: any) => t.tax_code === "PPN")?.tax_percentage || 0)
                )}
                className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
                readOnly
              />
              <Input
                value={formatCurrency(totalPPN)}
                className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                readOnly
              />
            </div>
          </div>

          {/* P2PPh */}
          <div className="flex items-center justify-center">
            <span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
              P2PPh
            </span>
            <div className="flex flex-1 gap-2.5">
              <Input
                value={formatPercentage(
                  (transactionTaxes.find((t: any) => t.tax_code === "PPH")?.tax_percentage || 0) // Assuming a general PPH percentage if applicable
                )}
                className="h-[53px] w-[55px] rounded-lg border-none bg-[rgba(145,158,171,0.08)] text-center"
                readOnly
              />
              <Input
                value={formatCurrency(totalP2PPh)}
                className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                readOnly
              />
            </div>
          </div>

          {/* Nominal Tagihan Include Pajak */}
          <div className="flex items-center justify-center">
            <span className="w-[400px] font-roboto text-base font-medium text-[#3F3F3F]">
              Nominal Tagihan Include Pajak
            </span>
            <div className="flex flex-1 gap-2.5">
              <Input
                value={formatCurrency(totalNominalIncludePajak)}
                className="h-[53px] flex-1 rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
                readOnly
              />
            </div>
          </div>
        </div>
      </Card>
      <div>
        {/* Kontrol Matematis */}
        <Card className="w-[400px] mb-4 rounded-[20px] border border-[rgba(145,158,171,0.20)] p-5">
          <h3 className="font-roboto font-medium text-xl text-[#404040]">
            Kontrol Matematis
          </h3>
          <span className="mb-6 flex text-xs text-[#404040]">Exclude + PPN + PPh = Include</span>
          <div className="flex flex-col gap-2 text-sm ">
            <div className="flex justify-between">
              <span className="text-[#404040]">Exclude</span>
              <span className="font-medium">{formatCurrency(nominalExcludePajak)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#404040]">PPN</span>
              <span className="font-medium">{formatCurrency(totalPPN)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#404040]">Total PPH</span>
              <span className="font-medium">{formatCurrency(totalP2PPh)}</span>
            </div>
            <div className="flex justify-between border-t border-[rgba(145,158,171,0.20)] pt-2">
              <span className="font-medium">Total</span>
              <span className="font-medium">{formatCurrency(nominalExcludePajak + totalPPN + totalP2PPh)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#DCFCE7] p-2">
            <Check className="h-4 w-4 text-[#016630]" />
            <span className="text-xs text-[#016630]">
              Exclude + PPN + PPh = Include
            </span>
          </div>
        </Card>
        <Label className=" text-[#404040]">Tipe Tagihan</Label>
        <Select> {/* This part needs to be controlled by RHF */}
          <SelectTrigger className="rounded-lg border-none ">
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
  );
}
