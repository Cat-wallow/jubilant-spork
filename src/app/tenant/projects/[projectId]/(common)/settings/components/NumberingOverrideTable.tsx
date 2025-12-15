"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { numberingOverride, availableTokens } from "../data/settingsData";

export function NumberingOverrideTable() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="font-dm text-2xl font-bold leading-8 text-[#2B3674]">
          Numbering Override
        </h2>
      </div>

      {/* Info Alert */}
      <div className="flex items-center gap-2.5 rounded-lg border border-[rgba(145,158,171,0.20)] p-3">
        <AlertCircle className="h-6 w-6 flex-shrink-0 text-[#404040]" />
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-bold leading-5 text-[#404040]">
            Perhatian:
          </p>
          <p className="text-sm leading-5 text-[#8C8C8C]">
            Perubahan pola penomoran hanya berlaku prospektif dan tidak mengubah
            nomor yang sudah diterbitkan.
          </p>
        </div>
      </div>

      {/* Available Tokens */}
      <div className="flex flex-col gap-2.5 rounded-[10px]">
        <p className="text-sm font-bold leading-5 text-[#404040]">
          Availabel Tokens:
        </p>
        <div className="flex flex-wrap gap-5">
          {availableTokens.map((token) => (
            <Badge
              key={token}
              className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-transparent px-2.5 py-1.5 text-xs font-bold text-[#404040]"
            >
              {token}
            </Badge>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-2.5">
        {/* Table Header */}
        <div className="flex items-center gap-10">
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Entity
            </span>
          </div>
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Prefix Pattern
            </span>
          </div>
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Seq Start
            </span>
          </div>
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Padding
            </span>
          </div>
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Separator
            </span>
          </div>
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Preview
            </span>
          </div>
          <div className="w-[150px]">
            <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
              Validation
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-[rgba(145,158,171,0.20)]" />

        {/* Table Rows */}
        {numberingOverride.map((row) => (
          <div key={row.id} className="flex items-center gap-10">
            <div className="flex w-[150px] flex-col">
              <span className="font-dm text-sm font-bold leading-6 text-[#404040]">
                {row.entity}
              </span>
              <span className="font-inter text-sm leading-[19.6px] text-[#404040]">
                {row.description}
              </span>
            </div>
            <div className="w-[150px]">
              <Input
                type="text"
                defaultValue={row.prefixPattern}
                className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
              />
            </div>
            <div className="w-[150px]">
              <Input
                type="text"
                defaultValue={row.seqStart}
                className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
              />
            </div>
            <div className="w-[150px]">
              <Input
                type="text"
                defaultValue={row.padding}
                className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
              />
            </div>
            <div className="w-[150px]">
              <Input
                type="text"
                defaultValue={row.separator}
                className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
              />
            </div>
            <div className="w-[150px]">
              <Input
                type="text"
                value={row.preview}
                readOnly
                className="h-[45px] rounded-lg border border-[#D9D9D9] bg-white"
              />
            </div>
            <div className="w-[150px]">
              <Button
                variant="outline"
                className="h-[30px] rounded-[5px] border border-[#CAC4D0] text-sm font-medium text-[#49454F]"
              >
                Validate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
