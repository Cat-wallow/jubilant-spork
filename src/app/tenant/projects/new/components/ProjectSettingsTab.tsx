'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function ProjectSettingsTab() {
  const modules = [
    { code: 'Form 1.0', bg: 'bg-[#F4F7FE]', textColor: 'text-[#332687]' },
    { code: 'KK 1.0', bg: 'bg-[rgba(255,204,0,0.1)]', textColor: 'text-[#404040]' },
    { code: 'KK 2.0', bg: 'bg-[#F4F7FE]', textColor: 'text-[#332687]' },
    { code: 'KK 3.0', bg: 'bg-[rgba(255,204,0,0.1)]', textColor: 'text-[#404040]' },
    { code: 'KK 4.0', bg: 'bg-[#F4F7FE]', textColor: 'text-[#332687]' },
    { code: 'KK 5.0', bg: 'bg-[rgba(255,204,0,0.1)]', textColor: 'text-[#404040]' },
  ];

  return (
    <div className="flex items-start gap-[30px] self-stretch">
      {/* Left Column - Team Assignment */}
      <Card className="flex-1 self-stretch p-5">
        <div className="mb-5 flex flex-col gap-0 self-stretch">
          <CardTitle>Team Assignment</CardTitle>
          <CardDescription className="line-clamp-1 overflow-hidden text-ellipsis">
            Pilih modul yang akan dikerjakan dalam project ini
          </CardDescription>
        </div>

        <div className="flex flex-col gap-2.5">
          {modules.map((module, index) => (
            <div key={index} className="flex h-[163px] flex-col gap-2.5">
              <div
                className={`inline-flex items-center justify-center gap-2.5 self-start rounded-[5px] border border-[rgba(145,158,171,0.2)] px-2.5 py-2.5 ${module.bg}`}
              >
                <span className={`font-inter text-xs font-normal leading-normal ${module.textColor}`}>
                  {module.code}
                </span>
              </div>

              <div className="flex flex-col gap-0">
                <Select>
                  <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                    <SelectValue placeholder="Pilih Team Leader" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Team Leader 1</SelectItem>
                    <SelectItem value="2">Team Leader 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-0">
                <Select>
                  <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                    <SelectValue placeholder="Pilih Team Member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Team Member 1</SelectItem>
                    <SelectItem value="2">Team Member 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Right Column */}
      <div className="flex w-[600px] flex-col justify-center gap-[30px]">
        {/* SLA & Reminders */}
        <Card className="p-5">
          <div className="mb-5 flex flex-col gap-0 self-stretch">
            <CardTitle>SLA & Reminders</CardTitle>
            <CardDescription className="line-clamp-1 overflow-hidden text-ellipsis">
              Atur kebijakan deadline dan eskalasi
            </CardDescription>
          </div>

          <div className="flex flex-col gap-0 self-stretch">
            <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
              Due Policy *
            </Label>
            <Select>
              <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                <SelectValue placeholder="H+3 (3 hari setelah deadline)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H+3 (3 hari setelah deadline)</SelectItem>
                <SelectItem value="2">H+5 (5 hari setelah deadline)</SelectItem>
                <SelectItem value="3">H+7 (7 hari setelah deadline)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 flex flex-col gap-2.5 py-[5px]">
            <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
              Escalation Recipients
            </Label>

            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                PMO 1
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                PMO 2
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
                PMO 3
              </span>
            </div>
          </div>
        </Card>

        {/* Deliverables */}
        <Card className="p-5">
          <div className="mb-5 flex flex-col gap-0 self-stretch">
            <CardTitle>Deliverables</CardTitle>
            <CardDescription className="line-clamp-1 overflow-hidden text-ellipsis">
              Template BAST & Invoice yang akan digunakan
            </CardDescription>
          </div>

          <div className="flex flex-col gap-5 self-stretch">
            <div className="flex flex-col gap-0">
              <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                BAST Template
              </Label>
              <Select>
                <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                  <SelectValue placeholder="Pilih template BAST" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Template BAST 1</SelectItem>
                  <SelectItem value="2">Template BAST 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-0">
              <Label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#3F3F3F]">
                Invoice Template
              </Label>
              <Select>
                <SelectTrigger className="h-[54px] rounded-lg border-[rgba(145,158,171,0.2)]">
                  <SelectValue placeholder="Pilih template Invoice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Template Invoice 1</SelectItem>
                  <SelectItem value="2">Template Invoice 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
