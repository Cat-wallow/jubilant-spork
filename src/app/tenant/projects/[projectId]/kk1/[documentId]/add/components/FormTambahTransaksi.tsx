import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FormTambahTransaksi() {
  return (
    <Card className="flex flex-col gap-[30px] p-[20px] rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-white shadow-sm">
   			<CardTitle className="mb-5 text-[22px] font-medium  text-primary">
				Deskripsi Dokumen
			</CardTitle>
      {/* Top Row Inputs */}
      <div className="flex w-full flex-col gap-[10px]">
        <div className="flex w-full gap-[20px]">
          {/* Transaction Number */}
          <div className="flex flex-1 flex-col gap-[7px]">
            <Label className="text-sm font-medium text-muted-foreground font-dm">
              Transaction Number
            </Label>
            <div className="relative">
              <Input
                placeholder="TRX-2302-302-"
                className="bg-[rgba(145,158,171,0.08)] border-none h-[45px] rounded-[8px] text-muted-foreground"
              />
            </div>
          </div>

          {/* Client */}
          <div className="flex flex-1 flex-col gap-[7px]">
            <Label className="text-sm font-medium text-muted-foreground font-dm">
              Client
            </Label>
            <div className="relative">
              <Input
                placeholder="PT. Maju Mundur"
                className="bg-[rgba(145,158,171,0.08)] border-none h-[45px] rounded-[8px] text-muted-foreground"
              />
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-1 flex-col gap-[7px]">
            <Label className="text-sm font-medium text-muted-foreground font-dm">
              Type
            </Label>
            <div className="relative">
               <Input
                placeholder="Sales"
                className="bg-[rgba(145,158,171,0.08)] border-none h-[45px] rounded-[8px] text-muted-foreground"
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
            </div>
          </div>

          {/* Tanggal Dokumen */}
          <div className="flex flex-1 flex-col gap-[7px]">
            <Label className="text-sm font-medium text-muted-foreground font-dm">
              Tanggal Dokumen
            </Label>
             <div className="relative">
               <Input
                placeholder="dd/mm/yyyy"
                className="bg-[rgba(145,158,171,0.08)] border-none h-[45px] rounded-[8px] text-muted-foreground"
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes Section */}
      <div className="flex flex-col gap-[30px] w-full">
        {/* Row 1 */}
        <div className="flex gap-[30px] w-full">
          <div className="flex flex-1 items-center justify-between p-[20px] rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-white">
            <span className="text-[22px] font-medium text-muted-foreground ">
              Invoice/Tagihan/Nota/Memo
            </span>
             <Checkbox className="h-[30px] w-[30px] rounded-[4px] border-[#A3AED0] data-[state=checked]:bg-[#4318FF] data-[state=checked]:border-[#4318FF]" />
          </div>
          <div className="flex flex-1 items-center justify-between p-[20px] rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-white">
             <span className="text-[22px] font-medium text-muted-foreground ">
              Surat Jalan/DO/Service Report
            </span>
            <Checkbox className="h-[30px] w-[30px] rounded-[4px] border-[#A3AED0] data-[state=checked]:bg-[#4318FF] data-[state=checked]:border-[#4318FF]" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-[30px] w-full">
           <div className="flex flex-1 items-center justify-between p-[20px] rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-white">
            <span className="text-[22px] font-medium text-muted-foreground ">
              Faktur Pajak
            </span>
             <Checkbox className="h-[30px] w-[30px] rounded-[4px] border-[#A3AED0] data-[state=checked]:bg-[#4318FF] data-[state=checked]:border-[#4318FF]" />
          </div>
           <div className="flex flex-1 items-center justify-between p-[20px] rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-white">
            <span className="text-[22px] font-medium text-muted-foreground ">
              Bukti Potong/Pungut PPh
            </span>
             <Checkbox className="h-[30px] w-[30px] rounded-[4px] border-[#A3AED0] data-[state=checked]:bg-[#4318FF] data-[state=checked]:border-[#4318FF]" />
          </div>
        </div>

         {/* Row 3 (Half width) */}
        <div className="flex w-full">
           <div className="flex w-[calc(50%-15px)] items-center justify-between p-[20px] rounded-[20px] border border-[rgba(145,158,171,0.2)] bg-white">
            <span className="text-[22px] font-medium text-muted-foreground ">
              Referensi : Purchase Order/Offering
            </span>
             <Checkbox className="h-[30px] w-[30px] rounded-[4px] border-[#A3AED0] data-[state=checked]:bg-[#4318FF] data-[state=checked]:border-[#4318FF]" />
          </div>
        </div>
      </div>

      {/* Dokumen Terlampir */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex items-center justify-between w-full">
           <h3 className="text-[12.25px] font-medium text-slate-800 font-inter">
            Dokumen Terlampir
          </h3>
          <Button
            className="h-[35px] gap-[5px] bg-[#0088ff] hover:bg-[#0077dd] text-white rounded-[10px] px-[10px]"
          >
            <Plus className="h-5 w-5" />
            <span className="text-[14px] font-medium tracking-[0.1px]">Tambah Dokumen</span>
          </Button>
        </div>

        {/* Document List Item */}
        <div className="flex h-[70px] w-full items-center justify-between rounded-[10px] border border-[rgba(0,0,0,0.15)] px-[11.3px] py-[0.8px]">
          <div className="flex items-center gap-[10.5px]">
            <div className="flex items-center justify-center h-[31px] w-[31px]">
               <FileText className="h-5 w-5 text-[#A3AED0]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12.25px] font-medium text-slate-800 font-inter">
                Sales Orded SO-001
              </span>
               <span className="text-[10.5px] font-normal text-slate-500 font-inter">
                Sales Order • SO-001
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-[28px] w-[31.5px] rounded-[5.25px] text-slate-500 hover:text-red-500 hover:bg-transparent"
          >
            <X className="h-[14px] w-[14px]" />
          </Button>
        </div>
      </div>

      {/* Catatan */}
      <div className="flex flex-col gap-[7px] w-full">
         <Label className="text-[12.25px] font-medium text-slate-800 font-inter">
            Catatan (Opsional)
          </Label>
          <Textarea
            placeholder="Catatan tambahan atau informasi khusus..."
            className="min-h-[56px] rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.08)] bg-white px-[10.5px] py-[7px] text-[12.25px] placeholder:text-slate-500 font-inter resize-none focus-visible:ring-1 focus-visible:ring-[#0088ff]"
          />
      </div>
    </Card>
  );
}
