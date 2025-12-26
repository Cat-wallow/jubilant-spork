"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Building2, Users, Package, Save, X, Check } from "lucide-react";
import { bastFormData } from "./mockData";

export default function BastAddPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "SIM",
    "SIA",
    "SIP",
    "FULL_SERVICE",
  ]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalPrice = bastFormData.services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="flex flex-col gap-5 p-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-[#707EAE]">KK 5.0</p>
        <h1 className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
          Buat BAST Baru
        </h1>
      </div>

      {/* Main Form Card */}
      <Card className="border-[0.8px] border-black/10">
        <CardHeader className="flex flex-row items-start gap-2 p-6">
          <FileText className="h-5 w-5 flex-shrink-0" />
          <CardTitle className="text-base font-bold">Formulir BAST Baru</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 p-6 pt-0">
          {/* Project Info Alert */}
          <div className="flex items-start gap-2 rounded-[10px] border-[0.8px] border-black/10 bg-white p-4">
            <Building2 className="h-4 w-4 flex-shrink-0 text-[#0A0A0A]" />
            <div className="flex flex-1 flex-col gap-0">
              <p className="text-sm text-[#717182]">
                Implementation Sistem Manajemen Terintegrasi
              </p>
              <p className="text-sm text-[#717182]">
                Project ID: PRJ-2024-001 • Contract Value: Rp 850.000.000
              </p>
              <p className="text-xs text-[#717182]">
                Active Modules: Form 1.0 KK 1.0 KK 2.0 KK 3.0
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="outline" className="font-normal">
                FULL_SERVICE
              </Badge>
              <p className="text-xs text-[#717182]">2024-01-15 - 2024-06-30</p>
            </div>
          </div>

          {/* Client & Consultant Info */}
          <div className="grid gap-[30px] lg:grid-cols-2">
            {/* Client Info */}
            <Card className="border-[0.8px]">
              <CardHeader className="flex flex-row items-start gap-2 p-6">
                <Building2 className="h-5 w-5 flex-shrink-0" />
                <CardTitle className="text-base font-normal">Informasi Klien</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-6 pt-0">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Nama Perusahaan *</Label>
                  <Input
                    disabled
                    value="PT. Maju Bersama Indonesia"
                    className="border-none bg-[#ECECF0] opacity-50"
                  />
                  <p className="text-xs text-[#717182]">Auto-populated dari data project</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Perwakilan Klien *</Label>
                  <Input value="Budi Santoso" className="border-none bg-[#F3F3F5]" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Jabatan</Label>
                  <Input value="Direktur Utama" className="border-none bg-[#F3F3F5]" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Email</Label>
                    <Input
                      value="budi.santoso@majubersama.co.id"
                      className="border-none bg-[#F3F3F5]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Telepon</Label>
                    <Input value="+62 21 5551234" className="border-none bg-[#F3F3F5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultant Info */}
            <Card className="border-[0.8px]">
              <CardHeader className="flex flex-row items-start gap-2 p-6">
                <Users className="h-5 w-5 flex-shrink-0" />
                <CardTitle className="text-base font-normal">Informasi Konsultan</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-6 pt-0">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Perwakilan Konsultan *</Label>
                  <Input value="Dr. Ahmad Wijaya" className="border-none bg-[#F3F3F5]" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Jabatan</Label>
                  <Input value="Project Manager" className="border-none bg-[#F3F3F5]" />
                </div>

                <div className="flex flex-col gap-2 rounded-[10px] bg-[#F0FDF4] p-4">
                  <h4 className="text-base text-[#016630]">Tim Konsultan</h4>
                  <div className="flex flex-col gap-1 text-sm text-[#008236]">
                    <p>• Project Manager: Dr. Ahmad Wijaya</p>
                    <p>• Technical Lead: Ir. Siti Nurhaliza</p>
                    <p>• Quality Assurance: Budi Santoso, CPA</p>
                    <p>• Tax Specialist: Maria Claudia, MSc</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Selection */}
          <Card className="border-[0.8px]">
            <CardHeader className="flex flex-row items-start gap-2 p-6">
              <Package className="h-5 w-5 flex-shrink-0" />
              <CardTitle className="text-base font-normal">Pilih Layanan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 p-6 pt-0">
              <div className="flex flex-col gap-5">
                {/* Service Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {bastFormData.services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer border-[0.8px] transition-colors ${
                        selectedServices.includes(service.id)
                          ? "border-[#2B7FFF] bg-[#EFF6FF]"
                          : "border-black/10"
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <CardContent className="flex items-start justify-between p-6">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedServices.includes(service.id)}
                            className="mt-1"
                          />
                          <div className="flex flex-col gap-2">
                            <h3 className="text-base font-normal text-[#0A0A0A]">
                              {service.name}
                            </h3>
                            <p className="text-sm text-[#717182]">{service.description}</p>
                            <Badge variant="outline" className="w-fit font-normal">
                              {service.code}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-base font-normal text-[#00A63E]">
                          Rp {service.price.toLocaleString("id-ID")}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between rounded-[10px] bg-[#F9FAFB] p-4">
                  <div className="flex flex-col">
                    <p className="text-base text-[#0A0A0A]">Total Selected Services</p>
                    <p className="text-sm text-[#717182]">
                      {selectedServices.length} layanan dipilih
                    </p>
                  </div>
                  <p className="text-xl font-bold text-[#00A63E]">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables & Notes */}
          <Card className="border-[0.8px]">
            <CardHeader className="flex flex-row items-start gap-2 p-6">
              <FileText className="h-5 w-5 flex-shrink-0" />
              <CardTitle className="text-base font-normal">Deliverables & Catatan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 px-12 pb-6">
              <div className="flex flex-col gap-3">
                <h4 className="text-base text-[#0A0A0A]">Deliverables yang akan diserahkan:</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {/* Left Column */}
                  <div className="flex flex-col gap-2">
                    {bastFormData.deliverables.slice(0, 8).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#00A63E]" />
                        <p className="text-sm text-[#0A0A0A]">{item}</p>
                      </div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div className="flex flex-col gap-2">
                    {bastFormData.deliverables.slice(8).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#00A63E]" />
                        <p className="text-sm text-[#0A0A0A]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Catatan Tambahan</Label>
                <Textarea
                  placeholder="Catatan khusus untuk BAST ini..."
                  className="h-16 border-none bg-[#F3F3F5]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-[0.8px]">
            <CardHeader className="p-6">
              <CardTitle className="text-base font-normal">Ringkasan BAST</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-[#717182]">Klien:</p>
                  <p className="text-sm text-[#0A0A0A]">PT. Maju Bersama Indonesia</p>
                  <p className="text-sm text-[#0A0A0A]">Budi Santoso</p>
                  <p className="text-sm text-[#717182]">Direktur Utama</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-[#717182]">Konsultan:</p>
                  <p className="text-sm text-[#0A0A0A]">Dr. Ahmad Wijaya</p>
                  <p className="text-sm text-[#717182]">Project Manager</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-[#717182]">Layanan:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedServices.map((serviceId) => {
                      const service = bastFormData.services.find((s) => s.id === serviceId);
                      return (
                        <Badge key={serviceId} variant="outline" className="font-normal">
                          {service?.code}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-[#717182]">Total Nilai:</p>
                  <p className="text-sm font-normal text-[#00A63E]">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-black/10 pt-5">
        <Button variant="outline" className="gap-2">
          <X className="h-4 w-4" />
          Batal
        </Button>
        <Button className="gap-2 bg-[#00A63E] hover:bg-[#008C35]">
          <Save className="h-4 w-4" />
          Simpan BAST
        </Button>
      </div>
    </div>
  );
}
