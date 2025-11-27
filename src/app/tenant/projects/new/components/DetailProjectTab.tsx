'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function DetailProjectTab() {
  return (
    <div className="flex items-start gap-[30px] self-stretch">
      {/* Left Column */}
      <div className="flex flex-1 flex-col justify-center gap-[30px] self-stretch">
        {/* Informasi Dasar */}
        <Card className="p-5">
          <div className="mb-5 flex flex-col gap-0">
            <CardTitle>Informasi Dasar</CardTitle>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-5">
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Dasar Kerja sama / Kontrak
                </Label>
                <Input
                  placeholder="PT Konsultan Pajak"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Nomor Kontrak *
                </Label>
                <Select>
                  <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                    <SelectValue placeholder="PT Maju Bersama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">PT Maju Bersama</SelectItem>
                    <SelectItem value="2">PT Sukses Jaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Tanggal Kontrak *
                </Label>
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Deadline *
                </Label>
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex flex-col gap-0">
            <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
              Catatan *
            </Label>
            <Textarea
              placeholder="Deskripsi catatan"
              className="min-h-[100px] rounded-lg border-[rgba(145,158,171,0.2)] font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
            />
          </div>
        </Card>

        {/* Administrasi Project */}
        <Card className="p-5">
          <div className="mb-5 flex flex-col gap-0">
            <CardTitle>Administrasi Project</CardTitle>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-5">
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Nama Project *
                </Label>
                <Input
                  placeholder="PT Konsultan Pajak"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Pilih Klien *
                </Label>
                <Select>
                  <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                    <SelectValue placeholder="PT Maju Bersama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">PT Maju Bersama</SelectItem>
                    <SelectItem value="2">PT Sukses Jaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Project Manager *
                </Label>
                <Select>
                  <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                    <SelectValue placeholder="Budianta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Budianta</SelectItem>
                    <SelectItem value="2">Ahmad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Budget
                </Label>
                <Input
                  placeholder="Solusi Pajak Terpercaya"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Tanggal Mulai *
                </Label>
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-0">
                <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                  Deadline *
                </Label>
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)] bg-card font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
                />
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex flex-col gap-0">
            <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
              Catatan *
            </Label>
            <Textarea
              placeholder="Deskripsi catatan"
              className="min-h-[100px] rounded-lg border-[rgba(145,158,171,0.2)] font-public-sans text-sm font-normal leading-[22px] placeholder:text-[#919EAB]"
            />
          </div>
        </Card>
      </div>

      {/* Right Column - Scope of Work */}
      <div className="w-[500px]">
        <Card className="p-5">
          <div className="mb-5 flex flex-col gap-0">
            <CardTitle>Scope of Work</CardTitle>
            <CardDescription className="line-clamp-1 overflow-hidden text-ellipsis">
              Pilih modul yang akan dikerjakan dalam project ini
            </CardDescription>
          </div>

          <div className="flex flex-col gap-2.5 py-[5px]">
            <div className="flex items-center gap-2">
              <Checkbox />
              <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.2)] bg-[#F4F7FE] px-2.5 py-[5px]">
                <span className="font-inter text-xs font-normal leading-normal text-[#332687]">
                  Form 1.0
                </span>
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                Document
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.2)] bg-[rgba(255,204,0,0.1)] px-2.5 py-[5px]">
                <span className="font-inter text-xs font-normal leading-normal text-[#404040]">
                  KK 1.0
                </span>
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                Transaction
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.2)] bg-[#F4F7FE] px-2.5 py-[5px]">
                <span className="font-inter text-xs font-normal leading-normal text-[#332687]">
                  KK 2.0
                </span>
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                Accounting/SIA
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.2)] bg-[rgba(255,204,0,0.1)] px-2.5 py-[5px]">
                <span className="font-inter text-xs font-normal leading-normal text-[#404040]">
                  KK 1.0
                </span>
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                Tax/SIP
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.2)] bg-[#F4F7FE] px-2.5 py-[5px]">
                <span className="font-inter text-xs font-normal leading-normal text-[#332687]">
                  KK 4.0
                </span>
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                Analysis & Validation
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.2)] bg-[rgba(255,204,0,0.1)] px-2.5 py-[5px]">
                <span className="font-inter text-xs font-normal leading-normal text-[#404040]">
                  KK 1.0
                </span>
              </div>
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                QC & Handaover
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
