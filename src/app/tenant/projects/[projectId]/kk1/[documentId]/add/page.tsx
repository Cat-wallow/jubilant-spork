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
import { updateTransaction, approveTransaction, createTransaction } from "@/services/transaction.service";
import { TransactionStatus } from "@/types/transaction";
import { toast } from "sonner";

// Sub-components
import IdentitasDokumen from "./components/IdentitasDocument";
import InformasiAdministrasi from "./components/InformasiAdministrasi";
import InformasiObjekPajak from "./components/InformasiObjekPajak";
import TabelBarangJasa from "./components/TabelBarangJasa";
import KertasKerjaPerpajakan from "./components/KertasKerjaPerpajakan";
import VouchingChecklist from "./components/VouchingChecklist";
import { Skeleton } from "@/components/ui/skeleton";

// Zod Schema for form validation
const formSchema = z.object({
  document_id: z.string().uuid().optional(),
  document: z.any().optional(),
  transaction_number: z.string().min(1, "Nomor Transaksi wajib diisi"),
  transaction_date: z.date({ error: "Tanggal Transaksi wajib diisi" }),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  currency: z.string().optional(),
  vendor_name: z.string().optional(),
  vendor_npwp: z.string().optional(),
  counterparty_type: z.string().optional(),
  vendor_pkp_status: z.string().optional(),
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
      description: z.string().optional(),
      quantity: z.preprocess(
        (val) => Number(val),
        z.number().min(0).optional()
      ),
      satuan: z.string().optional(),
      unit_price: z.preprocess(
        (val) => Number(val),
        z.number().min(0).optional()
      ),
      total_amount: z.preprocess(
        (val) => Number(val),
        z.number().min(0).optional()
      ),
      ppn: z.preprocess(
        (val) => Number(val),
        z.number().min(0).optional()
      ),
      p2pph: z.preprocess(
        (val) => Number(val),
        z.number().min(0).optional()
      ),
      tax_type: z.string().optional(),
      tax_rate: z.preprocess(
        (val) => Number(val),
        z.number().min(0).max(100).optional()
      ),
    })
  ).optional(),
  transaction_taxes: z.object({
    tax_deposit: z.preprocess((val) => Number(val), z.number().min(0).optional()),
    ppn: z.preprocess((val) => Number(val), z.number().min(0).optional()),
    pph_21: z.preprocess((val) => Number(val), z.number().min(0).optional()),
    pph_23: z.preprocess((val) => Number(val), z.number().min(0).optional()),
    pph_4_2: z.preprocess((val) => Number(val), z.number().min(0).optional()),
    pph_credit: z.preprocess((val) => Number(val), z.number().min(0).optional()),
    other_pph: z.preprocess((val) => Number(val), z.number().min(0).optional()),
  }).optional(),
  tax_proof_files: z.array(
    z.object({
      id: z.string().optional(),
      file_name: z.string(),
      file_url: z.string(),
      file: z.any().optional(),
    })
  ).optional(),
  has_documents: z.boolean().optional(),
  document_warning: z.boolean().optional(),
  vouching_notes: z.string().optional(),
  status: z.nativeEnum(TransactionStatus).optional(),
}).refine((data) => {
  const taxes = data.transaction_taxes || {};
  const isAnyTaxFilled = Object.values(taxes).some(
    val => val !== undefined && val !== null && val !== 0 && val !== ''
  );

  if (isAnyTaxFilled && (!data.tax_proof_files || data.tax_proof_files.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Wajib melampirkan bukti potong/setor pajak jika ada data pajak yang diisi.",
  path: ["tax_proof_files"],
});

type FormSchema = z.infer<typeof formSchema>;

export default function KK1AddPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { projectId, documentId } = params as { projectId: string, documentId: string };

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transaction_date: new Date(),
      currency: "IDR",
      transaction_items: [
        { description: "", quantity: 0, satuan: "", unit_price: 0, line_amount: 0, ppn: 0, p2pph: 0 }
      ],
      transaction_taxes: {
        tax_deposit: 0,
        ppn: 0,
        pph_21: 0,
        pph_23: 0,
        pph_4_2: 0,
        pph_credit: 0,
        other_pph: 0,
      },
      status: TransactionStatus.IN_PROGRESS,
    },
  });

  const { handleSubmit, setValue, reset, watch } = methods;
  const currentStatus = watch("status");

  const { data: documentResponse, isLoading: isLoadingDocument } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => getDocumentById(documentId),
    enabled: !!documentId,
  });

  const documentData = documentResponse?.data;
  const existingTransaction = documentData?.transaction_documents?.[0]?.transactions;
  const transactionId = existingTransaction?.id;

  const { data: refTypesData, isLoading: isLoadingRefTypes } = useQuery({
    queryKey: ['referenceTypes'],
    queryFn: () => getReferenceTypes(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (refTypesData) {
      console.log("📋 Reference Types Loaded:", {
        jenisTransaksi: jenisTransaksiOptions,
        subjekLawan: subjekLawanOptions,
        tipePkp: tipePkpOptions
      });
    }
  }, [refTypesData]);

  console.log(refTypesData);

  const { data: coaData, isLoading: isLoadingCoa } = useQuery({
    queryKey: ['chartOfAccounts'],
    queryFn: () => getReferenceTypes({ type: 'CHART_OF_ACCOUNTS' }),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (existingTransaction) {
      console.log("🔍 Existing Transaction Data:", {
            category: existingTransaction.category,
            counterparty_type: existingTransaction.counterparty_type,
            vendor_pkp_status: existingTransaction.vendor_pkp_status
      });

      reset({
        ...existingTransaction,
        transaction_date: new Date(existingTransaction.transaction_date || Date.now()),
        transaction_items: existingTransaction.transaction_items?.length
          ? existingTransaction.transaction_items
          : [{ description: "", quantity: 0, satuan: "", unit_price: 0, line_amount: 0, ppn: 0, p2pph: 0 }],
        transaction_taxes: existingTransaction.transaction_taxes || {
          tax_deposit: 0,
          ppn: 0,
          pph_21: 0,
          pph_23: 0,
          pph_4_2: 0,
          pph_credit: 0,
          other_pph: 0,

        },
        tax_proof_files: existingTransaction.transaction_taxes?.attachment_url
          ? [{ file_name: "Attachment", file_url: existingTransaction.transaction_taxes.attachment_url }]
          : [],
      });
    } else if (documentData) {
      setValue('document_id', documentId);
      setValue('description', documentData.description || documentData.original_filename || '');
      setValue('transaction_date', documentData.document_date ? new Date(documentData.document_date) : new Date());
      setValue('transaction_number', documentData.nomor_dokumen || '');
    }
  }, [existingTransaction, documentData, reset, setValue, documentId]);

  useEffect(() => {
    if (documentData) {
      setValue('document', documentData);
    }
  }, [documentData, setValue]);

  const createMutation = useMutation({
    mutationFn: (payload: any) => createTransaction(projectId, payload),
    onSuccess: () => {
      toast({ title: "Success", description: "Transaction created successfully." });
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['documentsForKK1', projectId] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string, payload: any }) => updateTransaction(data.id, data.payload),
    onSuccess: () => {
      toast({ title: "Success", description: "Transaction updated successfully." });
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['documentsForKK1', projectId] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => approveTransaction(id),
    onSuccess: () => {
      toast({ title: "Success", description: "Transaction approved." });
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['documentsForKK1', projectId] });
      router.push(`/tenant/projects/${projectId}/kk1`);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const onSubmit = (data: FormSchema, action: 'save' | 'submit') => {
    const status = action === 'submit' ? TransactionStatus.SUBMITTED : TransactionStatus.IN_PROGRESS;
    const attachmentUrl = data.tax_proof_files?.[0]?.file_url || null;

    const payload = {
      ...data,
      status,
      project_id: projectId,
      transaction_documents: [{ document_id: documentId, vouching_note: data.vouching_notes }],
      transaction_taxes: {
        ...data.transaction_taxes,
        attachment_url: attachmentUrl
      },
    };

    if (transactionId) {
      updateMutation.mutate({ id: transactionId, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleApprove = () => {
    if (transactionId) {
      approveMutation.mutate(transactionId);
    }
  };

  const isLoadingForm = isLoadingDocument || isLoadingRefTypes || isLoadingCoa;

  if (isLoadingForm) {
    return (
      <div className="space-y-4 p-5">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
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
            <h1 className="text-3xl font-bold">
              {existingTransaction
                ? currentStatus === TransactionStatus.SUBMITTED
                  ? "Approve Pencatatan Transaksi"
                  : "Edit Pencatatan Transaksi"
                : "Tambah Pencatatan Transaksi"}
            </h1>
            <p className="text-sm leading-5 tracking-[0.25px]">
              Pemetaan Dokumen Transaksi Keuangan Harian
            </p>
          </div>
        </div>

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
            <KertasKerjaPerpajakan taxTypeOptions={taxTypeOptions} />
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          {currentStatus === TransactionStatus.SUBMITTED ? (
            <Button
              type="button"
              onClick={handleApprove}
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? "Approving..." : "Approve Transaction"}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="third"
                onClick={handleSubmit((data) => onSubmit(data, 'save'))}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Simpan Draft
              </Button>
              <Button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, 'submit'))}
                disabled={createMutation.isPending || updateMutation.isPending}
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
