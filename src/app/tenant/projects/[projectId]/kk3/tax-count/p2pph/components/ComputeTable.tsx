'use client';

import { useState } from 'react';
import { X, Eye, Download, FileCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { computeTableData, type VendorComputation } from './compute-data';

interface ComputeTableProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComputeTable({ open, onOpenChange }: ComputeTableProps) {
  const [selectedMonth, setSelectedMonth] = useState('Maret 2024');
  const [selectedVendor, setSelectedVendor] = useState<VendorComputation | null>(null);

  const stats = [
    {
      label: 'Total Bruto',
      value: 'Rp 87.000.000',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9987 2.66602H7.9987C7.29145 2.66602 6.61318 2.94697 6.11308 3.44706C5.61298 3.94716 5.33203 4.62544 5.33203 5.33268V26.666C5.33203 27.3733 5.61298 28.0515 6.11308 28.5516C6.61318 29.0517 7.29145 29.3327 7.9987 29.3327H23.9987C24.7059 29.3327 25.3842 29.0517 25.8843 28.5516C26.3844 28.0515 26.6654 27.3733 26.6654 26.666V9.33268L19.9987 2.66602Z" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.668 2.66602V7.99935C18.668 8.70659 18.9489 9.38487 19.449 9.88497C19.9491 10.3851 20.6274 10.666 21.3346 10.666H26.668" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.3346 12H10.668" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.3346 17.334H10.668" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.3346 22.666H10.668" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'PPh 23 Dipotong',
      value: 'Rp 3.800.000',
      valueColor: 'text-[#E7000B]',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9987 2.66602H7.9987C6.52594 2.66602 5.33203 3.85992 5.33203 5.33268V26.666C5.33203 28.1388 6.52594 29.3327 7.9987 29.3327H23.9987C25.4715 29.3327 26.6654 28.1388 26.6654 26.666V5.33268C26.6654 3.85992 25.4715 2.66602 23.9987 2.66602Z" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.668 8H21.3346" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.332 18.666V23.9993" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.332 13.334H21.3454" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13.334H16.0133" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.668 13.334H10.6813" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 18.666H16.0133" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.668 18.666H10.6813" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 24H16.0133" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.668 24H10.6813" stroke="#E7000B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Total Vouchers',
      value: '10',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9987 2.66602H7.9987C7.29145 2.66602 6.61318 2.94697 6.11308 3.44706C5.61298 3.94716 5.33203 4.62544 5.33203 5.33268V26.666C5.33203 27.3733 5.61298 28.0515 6.11308 28.5516C6.61318 29.0517 7.29145 29.3327 7.9987 29.3327H23.9987C24.7059 29.3327 25.3842 29.0517 25.8843 28.5516C26.3844 28.0515 26.6654 27.3733 26.6654 26.666V9.33268L19.9987 2.66602Z" stroke="#4A5565" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.668 2.66602V7.99935C18.668 8.70659 18.9489 9.38487 19.449 9.88497C19.9491 10.3851 20.6274 10.666 21.3346 10.666H26.668" stroke="#4A5565" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.3346 12H10.668" stroke="#4A5565" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.3346 17.334H10.668" stroke="#4A5565" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.3346 22.666H10.668" stroke="#4A5565" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Computed',
      value: '2/3',
      valueColor: 'text-[#00A63E]',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.0662 13.3333C29.6751 16.3217 29.2411 19.4285 27.8366 22.1357C26.4322 24.8429 24.142 26.9867 21.3482 28.2097C18.5544 29.4328 15.4257 29.661 12.4839 28.8565C9.54214 28.0519 6.9651 26.2632 5.18255 23.7885C3.39999 21.3139 2.51968 18.303 2.6884 15.2578C2.85712 12.2127 4.06469 9.31744 6.10971 7.05488C8.15474 4.79232 10.9136 3.29923 13.9263 2.82459C16.9389 2.34995 20.0232 2.92247 22.6648 4.44665" stroke="#00A63E" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14.6673L16 18.6673L29.3333 5.33398" stroke="#00A63E" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1189px] max-h-[90vh] overflow-y-auto p-5">
        <DialogHeader>
          <div className="flex items-start gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9987 1.66602H4.9987C4.07822 1.66602 3.33203 2.41221 3.33203 3.33268V16.666C3.33203 17.5865 4.07822 18.3327 4.9987 18.3327H14.9987C15.9192 18.3327 16.6654 17.5865 16.6654 16.666V3.33268C16.6654 2.41221 15.9192 1.66602 14.9987 1.66602Z" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66797 5H13.3346" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.332 11.666V14.9993" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.332 8.33398H13.3404" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 8.33398H10.0083" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66797 8.33398H6.6763" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11.666H10.0083" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66797 11.666H6.6763" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 15H10.0083" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66797 15H6.6763" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <DialogTitle className="text-lg font-bold text-[#0A0A0A]">
              KK 3.0 Fase 3: PPh 23 Compute & Preview
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-[#717182]">
            Advanced PPh 23 withholding tax computation for professional services with automated bukti potong generation and e-Bupot export.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          <div className="rounded-2xl bg-[#ECECF0] p-1">
            <div className="rounded-2xl border border-transparent bg-white px-2 py-1 text-center text-sm text-[#0A0A0A]">
              PPh 23 Compute & Preview
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px] rounded-lg border-0 bg-[#F3F3F5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Januari 2024">Januari 2024</SelectItem>
                <SelectItem value="Februari 2024">Februari 2024</SelectItem>
                <SelectItem value="Maret 2024">Maret 2024</SelectItem>
              </SelectContent>
            </Select>

            <Button className="rounded-lg bg-[#030213] hover:bg-[#030213]/90">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0013 1.33398H4.0013C3.26492 1.33398 2.66797 1.93094 2.66797 2.66732V13.334C2.66797 14.0704 3.26492 14.6673 4.0013 14.6673H12.0013C12.7377 14.6673 13.3346 14.0704 13.3346 13.334V2.66732C13.3346 1.93094 12.7377 1.33398 12.0013 1.33398Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33203 4H10.6654" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.668 9.33398V12.0007" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.668 6.66602H10.6746" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6.66602H8.00667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33203 6.66602H5.3387" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 9.33398H8.00667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33203 9.33398H5.3387" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H8.00667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33203 12H5.3387" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Compute PPh 23
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-[#717182]">{stat.label}</span>
                  <span className={`text-xl font-bold ${stat.valueColor || 'text-[#0A0A0A]'}`}>
                    {stat.value}
                  </span>
                </div>
                <div className="flex-shrink-0">{stat.icon}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#0A0A0A]">PPh 23 Computation by Vendor</h3>
              <p className="text-sm text-[#717182]">Professional services withholding tax calculations and bukti potong generation</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Vendor</th>
                    <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">NPWP</th>
                    <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Service Type</th>
                    <th className="h-10 px-2 text-right text-sm font-normal text-[#0A0A0A]">Bruto Amount</th>
                    <th className="h-10 px-2 text-right text-sm font-normal text-[#0A0A0A]">PPh 23</th>
                    <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Status</th>
                    <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Vouchers</th>
                    <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {computeTableData.map((vendor) => (
                    <tr key={vendor.id} className="border-b border-black/10">
                      <td className="h-14 px-2">
                        <div className="flex flex-col">
                          <span className="text-sm text-[#0A0A0A]">{vendor.vendorName}</span>
                          <span className="text-sm text-[#717182]">Last: {vendor.lastDate}</span>
                        </div>
                      </td>
                      <td className="h-14 px-2">
                        <span className="text-sm font-mono text-[#0A0A0A]">{vendor.npwp}</span>
                      </td>
                      <td className="h-14 px-2">
                        <span className="text-sm text-[#0A0A0A]">{vendor.serviceType}</span>
                      </td>
                      <td className="h-14 px-2 text-right">
                        <span className="text-sm text-[#0A0A0A]">{vendor.brutoAmount}</span>
                      </td>
                      <td className="h-14 px-2 text-right">
                        <span className="text-sm font-bold text-[#E7000B]">{vendor.pph23}</span>
                      </td>
                      <td className="h-14 px-2">
                        <Badge
                          className={`rounded-lg border-0 text-xs font-normal ${
                            vendor.status === 'Computed'
                              ? 'bg-[#16A34A] text-white'
                              : 'bg-[#F59E0B] text-white'
                          }`}
                        >
                          {vendor.status}
                        </Badge>
                      </td>
                      <td className="h-14 px-2">
                        <Badge variant="outline" className="rounded-lg text-xs font-normal text-[#0A0A0A]">
                          {vendor.vouchers}
                        </Badge>
                      </td>
                      <td className="h-14 px-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-9 p-0"
                            onClick={() => setSelectedVendor(vendor)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {vendor.status === 'Computed' && (
                            <Button size="sm" className="h-8 w-9 p-0 bg-[#030213] hover:bg-[#030213]/90">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedVendor && (
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-base text-[#0A0A0A]">
                  {selectedVendor.vendorName} - PPh 23 Detail
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVendor(null)}
                >
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <h4 className="text-base text-[#0A0A0A]">Vendor Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">Name:</span>
                      <span className="text-base text-[#0A0A0A]">{selectedVendor.vendorName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">NPWP:</span>
                      <span className="text-sm font-mono text-[#0A0A0A]">{selectedVendor.npwp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">Service Type:</span>
                      <span className="text-sm text-[#0A0A0A]">{selectedVendor.serviceType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">Status:</span>
                      <Badge
                        className={`rounded-lg border-0 text-xs font-normal ${
                          selectedVendor.status === 'Computed'
                            ? 'bg-[#16A34A] text-white'
                            : 'bg-[#F59E0B] text-white'
                        }`}
                      >
                        {selectedVendor.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-base text-[#0A0A0A]">PPh 23 Calculation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">Gross Amount:</span>
                      <span className="text-base text-[#0A0A0A]">{selectedVendor.brutoAmount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">Tax Rate:</span>
                      <span className="text-base text-[#0A0A0A]">{selectedVendor.taxRate}</span>
                    </div>
                    <div className="h-px bg-black/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-base text-[#0A0A0A]">PPh 23 Withheld:</span>
                      <span className="text-base font-bold text-[#E7000B]">{selectedVendor.pph23}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base text-[#0A0A0A]">Net Payment:</span>
                      <span className="text-base font-bold text-[#0A0A0A]">{selectedVendor.netPayment}</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-lg bg-[#030213] hover:bg-[#030213]/90">
                    <Download className="h-4 w-4" />
                    Download Bukti Potong
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <FileCode className="h-4 w-4" />
                Export All e-Bupot
              </Button>
              <Button className="bg-[#030213] hover:bg-[#030213]/90">
                <Download className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
