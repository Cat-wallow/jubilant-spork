"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { Invoice } from "../data/invoices";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const toggleInvoice = (id: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedInvoices((prev) =>
      prev.length === invoices.length ? [] : invoices.map((i) => i.id)
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Table Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex w-[120px] items-center gap-2.5">
          <Checkbox
            checked={selectedInvoices.length === invoices.length}
            onCheckedChange={toggleAll}
          />
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Invoice
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Date
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Termin
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Total
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Status
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Due Date
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 text-[#A3AED0]">
            Aging
          </span>
          <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-border" />

      {/* Table Rows */}
      <div className="flex flex-col gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between border-b pb-4 last:border-b-0"
          >
            <div className="flex w-[120px] items-center gap-2.5">
              <Checkbox
                checked={selectedInvoices.includes(invoice.id)}
                onCheckedChange={() => toggleInvoice(invoice.id)}
              />
              <span className="font-roboto text-xs font-normal leading-4 text-[#2B3674]">
                {invoice.invoiceNumber}
              </span>
            </div>

            <div className="w-[120px]">
              <span className="font-dm text-sm font-bold leading-6 text-[#2B3674]">
                {invoice.date}
              </span>
            </div>

            <div className="w-[120px]">
              <Badge
                variant="outline"
                className="rounded-[5px] border border-[rgba(145,158,171,0.20)] font-inter text-xs font-normal text-[#404040]"
              >
                {invoice.termin} ({invoice.terminPercentage}%)
              </Badge>
            </div>

            <div className="w-[120px]">
              <span className="font-dm text-sm font-bold leading-6 text-[#2B3674]">
                {formatCurrency(invoice.amount)}
              </span>
            </div>

            <div className="w-[120px]">
              <Badge
                className={`min-w-[48px] rounded-[50px] font-roboto text-sm font-medium leading-5 ${
                  invoice.status === "paid"
                    ? "bg-[rgba(207,247,211,1)] text-[#4A4459] hover:bg-[rgba(207,247,211,0.8)]"
                    : "bg-[#E8DEF8] text-[#4A4459] hover:bg-[#E8DEF8]/80"
                }`}
              >
                {invoice.status === "paid" ? "Paid" : "Unpaid"}
              </Badge>
            </div>

            <div className="flex w-[120px] items-center gap-[5px]">
              <span className="font-dm text-sm font-bold leading-6 text-[#2B3674]">
                {invoice.dueDate}
              </span>
              {invoice.status === "paid" && (
                <Badge className="rounded-[50px] bg-[rgba(236,34,31,1)] font-roboto text-sm font-medium leading-5 text-white hover:bg-[rgba(236,34,31,0.8)]">
                  2d
                </Badge>
              )}
            </div>

            <div className="w-[120px]">
              <Badge
                variant="outline"
                className="rounded-[5px] border border-[rgba(145,158,171,0.20)] font-inter text-xs font-normal text-[rgba(191,106,2,1)]"
              >
                {invoice.aging} days
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
