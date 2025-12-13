"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocumentById } from "@/services/document.service";
import { getReferenceTypes } from "@/services/reference-type.service";
import { getTransactionById, updateTransaction, approveTransaction } from "@/services/transaction.service";
import { TransactionStatus } from "@/types/transaction";
import { toast } from "sonner";

// Sub-components
import IdentitasDokumen from "./components/IdentitasDocument";
import InformasiAdministrasi from "./components/InformasiAdministrasi";
import InformasiObjekPajak from "./components/InformasiObjekPajak";
import TabelBarangJasa from "./components/TabelBarangJasa";
import SummaryPerhitungan from "./components/SummaryPerhitungan";
import KertasKerjaPerpajakan from "./components/KertasKerjaPerpajakan";
import VouchingChecklist from "./components/VouchingChecklist";

// Zod Schema for form validation
const formSchema = z.object({
  document_id: z.string().uuid().optional(),
  document: z.any().optional(),
  transaction_number: z.string().min(1, "Nomor Transaksi wajib diisi"),
  transaction_date: z.date({ required_error: "Tanggal Transaksi wajib diisi" }),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  currency: z.string().optional(),
  vendor_name: z.string().optional(),
  vendor_npwp: z.string().optional(),
  counterparty_type: z.string().optional(),
  vendor_pkp_status: z.string().optional(),
  general_notes: z.string().optional(),
  discount_amount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Jumlah diskon tidak boleh negatif").optional()
  ),
  category: z.string().optional(),
  account_code: z.string().optional(),
  tax_type: z.string().optional(),
  tax_amount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Jumlah pajak tidak boleh negatif").optional()
  ),
  transaction_items: z.array(
    z.object({
      id: z.string().uuid().optional(),
      description: z.string().min(1, "Nama item wajib diisi"),
      quantity: z.preprocess(
        (val) => Number(val),
        z.number().min(0, "Kuantitas tidak boleh negatif")
      ),
      unit_price: z.preprocess(
        (val) => Number(val),
        z.number().min(0, "Harga satuan tidak boleh negatif")
      ),
      total_amount: z.preprocess(
        (val) => Number(val),
        z.number().min(0, "Total jumlah tidak boleh negatif")
      ),
      tax_type: z.string().optional(),
      tax_rate: z.preprocess(
        (val) => Number(val),
        z.number().min(0).max(100).optional()
      ),
    })
  ).min(1, "Minimal ada satu item barang/jasa"),
  transaction_taxes: z.array(
    z.object({
      id: z.string().uuid().optional(),
      tax_code: z.string().min(1, "Kode pajak wajib diisi"),
      tax_percentage: z.preprocess(
        (val) => Number(val),
        z.number().min(0).max(100).optional()
      ),
      tax_nominal: z.preprocess(
        (val) => Number(val),
        z.number().min(0, "Nominal pajak tidak boleh negatif")
      ),
      description: z.string().optional(),
    })
  ).optional(),
  has_documents: z.boolean().optional(),
  document_warning: z.boolean().optional(),
  vouching_notes: z.string().optional(),
  status: z.nativeEnum(TransactionStatus).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function KK1AddPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { projectId, transactionId } = params as { projectId: string, transactionId: string };

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transaction_date: new Date(),
      currency: "IDR",
      transaction_items: [{ description: "", quantity: 0, unit_price: 0, total_amount: 0 }],
      transaction_taxes: [],
      status: TransactionStatus.IN_PROGRESS,
    },
  });

  const { handleSubmit, setValue, reset, watch } = methods;
  const currentStatus = watch("status");

  // 1. Fetch Transaction Data
  const { data: transactionResponse, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: !!transactionId,
  });

  const transactionData = transactionResponse?.data;
  const documentId = transactionData?.transaction_documents?.[0]?.document_id;

  // 2. Fetch Document Data
  const { data: documentResponse, isLoading: isLoadingDocument } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => getDocumentById(documentId),
    enabled: !!documentId,
  });

  // 3. Fetch Ref Types
  const { data: refTypesData, isLoading: isLoadingRefTypes } = useQuery({
    queryKey: ['referenceTypes'],
    queryFn: () => getReferenceTypes(),
    staleTime: Infinity,
  });

  const { data: coaData, isLoading: isLoadingCoa } = useQuery({
    queryKey: ['chartOfAccounts'],
    queryFn: () => getReferenceTypes({ type: 'CHART_OF_ACCOUNTS' }),
    staleTime: Infinity,
  });

  // 4. Pre-fill Form
  useEffect(() => {
    if (transactionData) {
      reset({
        ...transactionData,
        transaction_date: new Date(transactionData.transaction_date || ''),
        // Ensure arrays are initialized if null
        transaction_items: transactionData.transaction_items || [{ description: "", quantity: 0, unit_price: 0, total_amount: 0 }],
        transaction_taxes: transactionData.transaction_taxes || [],
      });
    }
  }, [transactionData, reset]);

  useEffect(() => {
    if (documentResponse?.data) {
      setValue('document', documentResponse.data);
      setValue('document_id', documentResponse.data.id);
    }
  }, [documentResponse, setValue]);

  // Mutations
  const updateMutation = useMutation({
    mutationFn: (data: { id: string, payload: any }) => updateTransaction(data.id, data.payload),
    onSuccess: () => {
      toast({ title: "Success", description: "Transaction updated successfully." });
      queryClient.invalidateQueries({ queryKey: ['transaction', transactionId] });
      router.push(`/tenant/projects/${projectId}/kk1`);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => approveTransaction(id),
    onSuccess: () => {
      toast({ title: "Success", description: "Transaction approved." });
      queryClient.invalidateQueries({ queryKey: ['transaction', transactionId] });
      router.push(`/tenant/projects/${projectId}/kk1`);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const onSubmit = (data: FormSchema, action: 'save' | 'submit') => {
    const status = action === 'submit' ? TransactionStatus.SUBMITTED : TransactionStatus.IN_PROGRESS;
    const payload = { ...data, status, project_id: projectId }; // Ensure project_id is included
    updateMutation.mutate({ id: transactionId, payload });
  };

  const handleApprove = () => {
    approveMutation.mutate(transactionId);
  }

  if (isLoadingTransaction || isLoadingDocument || isLoadingRefTypes || isLoadingCoa) {
    return <div>Loading form...</div>;
  }

  const jenisTransaksiOptions = refTypesData?.data?.filter((rt: any) => rt.type === 'JENIS_TRANSAKSI') || [];
  const subjekLawanOptions = refTypesData?.data?.filter((rt: any) => rt.type === 'SUBJEK_LAWAN') || [];
  const tipePkpOptions = refTypesData?.data?.filter((rt: any) => rt.type === 'TIPE_PKP') || [];
  const taxTypeOptions = refTypesData?.data?.filter((rt: any) => rt.type === 'TAX_TYPE') || [];
  const coaOptions = coaData?.data?.map((coa: any) => ({
    id: coa.id,
    code: coa.name,
    name: coa.description,
  })) || [];

  return (
    <FormProvider {...methods}>
      <form className="flex w-full flex-col gap-[30px] p-[30px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex flex-col gap-[5px]">
            <p className="font-dm text-sm font-medium leading-6 ">
              KK 1.0 &gt; {currentStatus === TransactionStatus.SUBMITTED ? "Approve Transaksi" : "Edit Transaksi"}
            </p>
            <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-tight ">
              {currentStatus === TransactionStatus.SUBMITTED ? "Approve Pencatatan Transaksi" : "Edit Pencatatan Transaksi"}
            </h1>
            <p className="font-roboto text-sm leading-5 tracking-[0.25px]">
              Pemetaan Dokumen Transaksi Keuangan Harian
            </p>
          </div>
        </div>

        {/* Main Form */}
        <Card className="rounded-[20px] border p-5">
          <div className="flex flex-col gap-[30px]">
            <div className="flex gap-[30px]">
              <IdentitasDokumen />
              <InformasiAdministrasi />
            </div>
            <InformasiObjekPajak
              jenisTransaksiOptions={jenisTransaksiOptions}
              subjekLawanOptions={subjekLawanOptions}
              tipePkpOptions={tipePkpOptions}
            />
            <TabelBarangJasa taxTypeOptions={taxTypeOptions} />
            <SummaryPerhitungan />
            <KertasKerjaPerpajakan taxTypeOptions={taxTypeOptions} />
            <VouchingChecklist coaOptions={coaOptions} />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {currentStatus === TransactionStatus.SUBMITTED ? (
             // Show Approve button for Leaders if status is SUBMITTED
             <Button
               type="button"
               onClick={handleApprove}
               disabled={approveMutation.isPending}
               className="bg-green-600 hover:bg-green-700"
             >
               {approveMutation.isPending ? "Approving..." : "Approve Transaction"}
             </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="third"
                onClick={handleSubmit((data) => onSubmit(data, 'save'))}
                disabled={updateMutation.isPending}
              >
                Simpan Draft
              </Button>
              <Button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, 'submit'))}
                disabled={updateMutation.isPending}
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
