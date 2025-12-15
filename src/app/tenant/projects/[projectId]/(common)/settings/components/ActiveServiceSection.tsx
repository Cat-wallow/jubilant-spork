"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { activeServices } from "../data/settingsData";

export function ActiveServiceSection() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h2 className="font-dm text-2xl font-bold leading-8 text-[#2B3674]">
            Active Service
          </h2>
          <p className="text-xs leading-4 text-[#2B3674]">
            Konfigurasi pengaturan modul project, parameter dan SLA
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className="flex items-center gap-2.5 rounded-lg border border-[rgba(145,158,171,0.20)] p-3">
        <AlertCircle className="h-6 w-6 flex-shrink-0 text-[#404040]" />
        <p className="flex-1 text-sm leading-[22px] text-[#919EAB]">
          Mengaktifkan/menonaktifkan layanan akan mempengaruhi modul yang tampil
          di &quot;Modules Stepper&quot; dan perhitungan SLA.
        </p>
      </div>

      {/* Services List */}
      <div className="flex flex-col gap-2.5">
        {activeServices.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-[10px] border border-[rgba(145,158,171,0.20)] p-4"
          >
            <div className="flex flex-col gap-[5px]">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold leading-5 text-[#404040]">
                  {service.name}
                </span>
                {service.isMandatory && (
                  <Badge className="rounded-[5px] bg-transparent px-2 py-1 text-xs font-bold text-[#404040]">
                    Mandatory
                  </Badge>
                )}
                {service.isAutoEnabled && (
                  <Badge className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-transparent px-2 py-1 text-xs font-bold text-[#404040]">
                    Auto-enabled
                  </Badge>
                )}
                {service.hasData && (
                  <Badge className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-transparent px-2 py-1 text-xs font-normal text-[#404040]">
                    Has Data
                  </Badge>
                )}
              </div>
              <p className="text-xs leading-4 text-[#2B3674]">
                {service.description}
              </p>
            </div>

            {/* Switch */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#404040]">Active</span>
              <Switch checked={service.isActive} />
            </div>
          </div>
        ))}
      </div>

      {/* Warning Alert */}
      <div className="flex items-center gap-2.5 rounded-lg border border-[rgba(145,158,171,0.20)] p-3">
        <AlertTriangle className="h-[30px] w-[30px] flex-shrink-0 text-[#900B09]" />
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-bold leading-5 text-[rgba(144,11,9,1)]">
            KK 3.0 Pajak tidak aktif
          </p>
          <p className="text-sm leading-5 text-[rgba(236,34,31,1)]">
            Pastikan layanan perpajakan tidak diperlukan untuk proyek ini.
          </p>
        </div>
      </div>
    </div>
  );
}
