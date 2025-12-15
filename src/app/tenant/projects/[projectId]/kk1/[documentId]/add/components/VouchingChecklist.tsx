"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	RefreshCw,
	Check,
	AlertTriangle,
	Eye,
	FileText,
	Plus, Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"; // Assuming for editable fields in journal
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For COA selection
import { useState } from "react";
import { cn } from "@/lib/utils";

// Interface for Chart of Accounts (COA)
interface ChartOfAccount {
  id: string;
  code: string;
  name: string;
}

interface VouchingChecklistProps {
  coaOptions: ChartOfAccount[];
}

export default function VouchingChecklist({ coaOptions }: VouchingChecklistProps) {
  const { register, control, watch, setValue } = useFormContext();

  // Watch these fields to dynamically update UI
  const hasDocuments = watch("has_documents");
  const documentWarning = watch("document_warning");
  const vouchingNotes = watch("vouching_notes");

  // Dummy data for checklist items (can be dynamic based on vouching results)
  const checklistItems = [
    { label: "Match Number", status: "ok" },
    { label: "Match Date", status: "ok" },
    { label: "Match Partner", status: "warning" },
    { label: "Match Amount", status: "ok" },
  ];

  // Dummy data for journal lines. This will be dynamic in future.
  const [journalLines, setJournalLines] = useState([
    {
      id: "1",
      account_code: "",
      account_name: "", // Derived from COA selection
      description: "",
      debit: 0,
      credit: 0,
    },
  ]);

  const addJournalLine = () => {
    setJournalLines([...journalLines, {
      id: (journalLines.length + 1).toString(),
      account_code: "",
      account_name: "",
      description: "",
      debit: 0,
      credit: 0,
    }]);
  };

  const removeJournalLine = (id: string) => {
    setJournalLines(journalLines.filter(line => line.id !== id));
  };

  const handleCoaChange = (value: string, lineId: string) => {
    const selectedCoa = coaOptions.find(coa => coa.code === value);
    setJournalLines(journalLines.map(line =>
      line.id === lineId ? { ...line, account_code: value, account_name: selectedCoa?.name || "" } : line
    ));
  };

  // Calculate total debit and credit
  const totalDebit = journalLines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = journalLines.reduce((sum, line) => sum + line.credit, 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <Card className="rounded-[20px] border  p-5">
      <div className="mb-5 flex items-start justify-between ">
        <CardTitle className="text-[22px] font-medium text-muted-foreground">
          Vouching Checklist
        </CardTitle>
        <Button className="flex h-12 items-center gap-2 rounded-[10px] bg-[#08F] hover:bg-[#0077dd]">
          <RefreshCw className="h-5 w-5" />
          <span className="text-sm font-medium leading-5 tracking-[0.1px]">
            Run Vouching
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Checklist Items */}
        <div className="flex flex-col gap-4">
          {checklistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-[10px] border border-[rgba(0,0,0,0.10)] px-3 py-3"
            >
              <span className="font-arial text-base text-[#0A0A0A]">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                {item.status === "ok" ? (
                  <>
                    <Check className="h-4 w-4 text-[#00C950]" />
                    <Badge className="border-none bg-[#DCFCE7] text-[#016630]">
                      OK
                    </Badge>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-[#F0B100]" />
                    <Badge className="border-none bg-[#FEF9C2] text-[#894B00]">
                      WARNING
                    </Badge>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_documents"
              checked={hasDocuments}
              onCheckedChange={(checked) => setValue("has_documents", checked)}
            />
            <label
              htmlFor="has_documents"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Dokumen Lengkap
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="document_warning"
              checked={documentWarning}
              onCheckedChange={(checked) => setValue("document_warning", checked)}
            />
            <label
              htmlFor="document_warning"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ada Peringatan Dokumen
            </label>
          </div>
        </div>

        {/* Vouching Notes */}
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="vouching_notes" className="font-arial text-sm text-[#0A0A0A]">
            Vouching Notes
          </Label>
          <Textarea
            id="vouching_notes"
            placeholder="Catatan hasil vouching..."
            className="rounded-lg border-none bg-[#F3F3F5]"
            {...register("vouching_notes")}
          />

          {/* Warning Box */}
          {documentWarning && (
            <div className="flex flex-col gap-3 rounded-[10px] border border-[#FFF085] bg-[#FEFCE8] p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 text-[#D08700]" />
                <div className="flex flex-col">
                  <span className="font-arial text-base text-[#733E0A]">
                    Warning
                  </span>
                  <span className="font-arial text-sm text-[#A65F00]">
                    Partner name slightly different: "PT ABC Corp" vs "PT. ABC
                    Corporation"
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#2B7FFF]" />
          <span className="font-arial text-base text-[#0A0A0A]">
            Simulasi Voucher Yang Akan Dibuat
          </span>
        </div>
        <Badge className="border border-[#FFD6A7] bg-transparent text-[#F54900]">
          Review Required
        </Badge>
      </div>

      {/* Voucher Details */}
      <div className="mb-5 flex items-center justify-between rounded-[10px] bg-[rgba(236,236,240,0.30)] p-4">
        <div className="flex flex-col">
          <span className="text-xs text-[#717182]">Voucher Type</span>
          <span className="text-base text-[#0A0A0A]">RJV</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#717182]">Voucher No</span>
          <span className="text-base text-[#0A0A0A]">RJV-2025-184</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#717182]">Date</span>
          <span className="text-base text-[#0A0A0A]">2024-03-15</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#717182]">Status</span>
          <Badge className="border border-[#FFD6A7] bg-transparent text-[#F54900]">
            Draft Preview
          </Badge>
        </div>
      </div>

      {/* Narration */}
      <div className="mb-4 rounded-[10px] bg-[#EFF6FF] p-3">
        <span className="text-xs text-[#717182]">Narration</span>
        <p className="text-sm text-[#0A0A0A]">
          Pengakuan sales kepada PT. ABC Corp sesuai
        </p>
      </div>

      {/* Voucher Table (Journal Lines) */}
      <div className="overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.10)]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[rgba(0,0,0,0.10)]">
              <TableHead className="w-[50px] text-[#0A0A0A]">#</TableHead>
              <TableHead className="w-[200px] text-[#0A0A0A]">Account No</TableHead>
              <TableHead className="w-[250px] text-[#0A0A0A]">Account Name</TableHead>
              <TableHead className="text-right text-[#0A0A0A]">Debit</TableHead>
              <TableHead className="text-right text-[#0A0A0A]">Credit</TableHead>
              <TableHead className="text-[#0A0A0A]">Description</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalLines.map((line, index) => (
              <TableRow key={line.id} className="border-b border-[rgba(0,0,0,0.10)]">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <Select onValueChange={(value) => handleCoaChange(value, line.id)} value={line.account_code}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Pilih COA" />
                    </SelectTrigger>
                    <SelectContent>
                      {coaOptions.map(coa => (
                        <SelectItem key={coa.id} value={coa.code}>{coa.code} - {coa.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{line.account_name}</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={line.debit}
                    variant="idr"
                    onChange={(e) => setJournalLines(journalLines.map(l => l.id === line.id ? { ...l, debit: parseFloat(e.target.value) || 0 } : l))}
                    className="h-9 text-right"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={line.credit}
                    variant="idr"
                    onChange={(e) => setJournalLines(journalLines.map(l => l.id === line.id ? { ...l, credit: parseFloat(e.target.value) || 0 } : l))}
                    className="h-9 text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={line.description}
                    onChange={(e) => setJournalLines(journalLines.map(l => l.id === line.id ? { ...l, description: e.target.value } : l))}
                    className="h-9"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeJournalLine(line.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell colSpan={7} className="text-center">
                    <Button type="button" onClick={addJournalLine} variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Baris Jurnal
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow className="bg-[rgba(236,236,240,0.20)]">
              <TableCell colSpan={3} className="text-right font-medium">
                TOTAL
              </TableCell>
              <TableCell className="text-right font-mono font-medium">
                {totalDebit.toLocaleString('id-ID')}
              </TableCell>
              <TableCell className="text-right font-mono font-medium">
                {totalCredit.toLocaleString('id-ID')}
              </TableCell>
              <TableCell colSpan={2}>
                <Badge className={cn("border-none", isBalanced ? "bg-[#DCFCE7] text-[#016630]" : "bg-red-100 text-red-700")}>
                  {isBalanced ? <Check className="mr-1 h-3 w-3" /> : <AlertTriangle className="mr-1 h-3 w-3" />}
                  {isBalanced ? "Balanced" : "Unbalanced"}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[rgba(0,0,0,0.10)] pt-4">
        <span className="text-sm text-[#717182]">
          Voucher akan dibuat otomatis setelah transaksi disetujui
        </span>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>Preview Detail</span>
        </Button>
      </div>
    </Card>
  );
}
