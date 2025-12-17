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
import { updateTransaction, approveTransaction, createTransaction, uploadTransactionProof } from "@/services/transaction.service";
import { TransactionStatus } from "@/types/transaction";
import { toast } from "sonner";

// Sub-components
import IdentitasDokumen from "./components/IdentitasDocument";
import InformasiAdministrasi from "./components/InformasiAdministrasi";
import InformasiObjekPajak from "./components/InformasiObjekPajak";
import TabelBarangJasa from "./components/TabelBarangJasa";
import KertasKerjaPerpajakan from "./components/KertasKerjaPerpajakan";
import { Skeleton } from "@/components/ui/skeleton";

// --- SCHEMAS ---

// Base item schema (lax for draft)
const itemSchema = z.object({
  id: z.string().uuid().optional(),
  description: z.string().optional(),
  quantity: z.coerce.number().min(0).optional(),
  satuan: z.string().optional(),
  unit_price: z.coerce.number().min(0).optional(),
  total_amount: z.coerce.number().min(0).optional(),
  ppn: z.coerce.number().min(0).optional(),
  p2pph: z.coerce.number().min(0).optional(),
});

// Strict item schema for Submit
const itemSubmitSchema = itemSchema.extend({
  description: z.string().min(1, "Nama item wajib diisi"),
  quantity: z.coerce.number().min(0.0001, "Quantity wajib diisi"),
  satuan: z.string().min(1, "Satuan wajib diisi"),
  unit_price: z.coerce.number().min(0, "Harga satuan wajib diisi"),
  total_amount: z.coerce.number().min(0, "Total amount wajib diisi"),
});

// Base schema (Draft - all optional)
const draftSchema = z.object({
  document_id: z.string().uuid().optional(),
  document: z.any().optional(),
  // description optional for draft
  description: z.string().optional(),
  currency: z.string().optional(),
  vendor_name: z.string().optional(),
  vendor_npwp: z.string().optional(),
  counterparty_type: z.string().uuid().optional(),
  vendor_pkp_status: z.string().uuid().optional(),
  category: z.string().uuid().optional(),
  general_notes: z.string().optional(),

  transaction_items: z.array(itemSchema).optional(),

  // Untuk transaction_taxes
  transaction_taxes: z.object({
    tax_deposit: z.coerce.number().min(0).optional(),
    ppn: z.coerce.number().min(0).optional(),
    pph_21: z.coerce.number().min(0).optional(),
    pph_23: z.coerce.number().min(0).optional(),
    pph_4_2: z.coerce.number().min(0).optional(),
    pph_credit: z.coerce.number().min(0).optional(),
    other_pph: z.coerce.number().min(0).optional(),
  }).optional(),

  tax_proof_files: z.array(
    z.object({
      id: z.string().optional(),
      file_name: z.string(),
      file_url: z.string(),
      file: z.any().optional(),
    })
  ).optional(),

  vouching_notes: z.string().optional(),
  status: z.nativeEnum(TransactionStatus).optional(),
});

// Submit Schema (Strict)
const submitSchema = draftSchema.extend({
  description: z.string().min(1, "Deskripsi wajib diisi"),
  category: z.string().uuid("Kategori transaksi wajib dipilih"),
  counterparty_type: z.string().uuid("Subjek lawan wajib dipilih"),
  vendor_pkp_status: z.string().uuid("Status PKP wajib dipilih"),
  vendor_npwp: z.string().min(1, "NPWP wajib diisi"),

  transaction_items: z.array(itemSubmitSchema).min(1, "Minimal satu item transaksi wajib ada"),

}).refine((data) => {
  // Tax proof logic: if any tax field filled, proof is required
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

type DraftFormSchema = z.infer<typeof draftSchema>;

export default function KK1AddPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { projectId, documentId } = params as { projectId: string, documentId: string };

  // Use draftSchema for the form (allows saving draft at any state)
  const methods = useForm({
    // resolver: zodResolver(draftSchema),
    defaultValues: {
      currency: "IDR",
      transaction_items: [
        { description: "", quantity: 0, satuan: "", unit_price: 0, total_amount: 0, ppn: 0, p2pph: 0 }
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

  const { handleSubmit, setValue, reset, watch, setError } = methods;
  const currentStatus = watch("status");

  const { data: documentResponse, isLoading: isLoadingDocument } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => getDocumentById(documentId),
    enabled: !!documentId,
  });

  const documentData = documentResponse?.data;
  const existingTransaction = documentData?.transaction;
  const transactionId = existingTransaction?.id;

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

  useEffect(() => {
    if (existingTransaction) {
      reset({
        ...existingTransaction,
        transaction_items: existingTransaction.transaction_items?.length
          ? existingTransaction.transaction_items
          : [{ description: "", quantity: 0, satuan: "", unit_price: 0, total_amount: 0, ppn: 0, p2pph: 0 }],
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
          ? [{ id: `existing-attachment-${Date.now()}`, file_name: "Attachment", file_url: existingTransaction.transaction_taxes.attachment_url }]
          : [],
        category: existingTransaction.category || undefined,
        counterparty_type: existingTransaction.counterparty_type || undefined,
        vendor_pkp_status: existingTransaction.vendor_pkp_status || undefined,
        general_notes: existingTransaction.general_notes || undefined,
      });
      // Set values for read-only display
      if (existingTransaction.transaction_number) setValue("transaction_number" as any, existingTransaction.transaction_number);
      if (existingTransaction.transaction_date) setValue("transaction_date" as any, new Date(existingTransaction.transaction_date));

    } else if (documentData) {
      setValue('document_id', documentId);
      setValue('description', documentData.description || documentData.original_filename || '');
    }
  }, [existingTransaction, documentData, reset, setValue, documentId]);

  useEffect(() => {
    if (documentData) {
      setValue('document', documentData);
    }
  }, [documentData, setValue]);

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
        let uploadedAttachmentUrl = payload.transaction_taxes?.attachment_url;
        if (payload.tax_proof_files && payload.tax_proof_files.length > 0) {
            const fileToUpload = payload.tax_proof_files[0];
            if (fileToUpload.file) {
                try {
                    const uploadRes = await uploadTransactionProof(fileToUpload.file);
                    uploadedAttachmentUrl = uploadRes.data.url;
                } catch (error: any) {
                    toast.error(`Failed to upload proof file: ${error.message}`);
                    throw error;
                }
            }
        }
        const finalPayload = {
            ...payload,
            transaction_taxes: {
                ...payload.transaction_taxes,
                attachment_url: uploadedAttachmentUrl
            },
            tax_proof_files: undefined
        };
        return createTransaction(projectId, finalPayload);
    },
    onSuccess: () => {
      toast.success("Transaction created successfully.");
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['documentsForKK1', projectId] });
      router.push(`/tenant/projects/${projectId}/kk1`);
    },
    onError: (error: any) => {
      toast.error("Failed to create transaction.", {
        description: error.message,
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string, payload: any }) => {
        let uploadedAttachmentUrl = data.payload.transaction_taxes?.attachment_url;
        if (data.payload.tax_proof_files && data.payload.tax_proof_files.length > 0) {
            const fileToUpload = data.payload.tax_proof_files[0];
            if (fileToUpload.file) {
                try {
                    const uploadRes = await uploadTransactionProof(fileToUpload.file);
                    uploadedAttachmentUrl = uploadRes.data.url;
                } catch (error: any) {
                    toast.error(`Failed to upload proof file: ${error.message}`);
                    throw error;
                }
            }
        }
        const finalPayload = {
            ...data.payload,
            transaction_taxes: {
                ...data.payload.transaction_taxes,
                attachment_url: uploadedAttachmentUrl
            },
            tax_proof_files: undefined
        };
        return updateTransaction(data.id, finalPayload);
    },
    onSuccess: () => {
      toast.success("Transaction updated successfully.");
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['documentsForKK1', projectId] });
      router.push(`/tenant/projects/${projectId}/kk1`);
    },
    onError: (error: any) => {
      toast.error("Failed to update transaction.", {
        description: error.message,
      });
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => approveTransaction(id),
    onSuccess: () => {
      toast.success("Transaction approved.");
      queryClient.invalidateQueries({ queryKey: ['document', documentId] });
      queryClient.invalidateQueries({ queryKey: ['documentsForKK1', projectId] });
      router.push(`/tenant/projects/${projectId}/kk1`);
    },
    onError: (error: any) => {
      toast.error("Failed to approve transaction.", {
        description: error.message,
      });
    }
  });

  const onSubmit = (data: DraftFormSchema, action: 'save' | 'submit') => {
    // 1. Validation Logic
    // if (action === 'submit') {
    //   const result = submitSchema.safeParse(data);
    //   if (!result.success) {
    //     // Display toast error
    //     toast.error("Mohon lengkapi semua data wajib untuk Submit.", {
    //         description: "Periksa kembali field yang berwarna merah."
    //     });

    //     // Map Zod errors to React Hook Form to show red borders/messages
    //     result.error.issues.forEach((issue) => {
    //         const path = issue.path.join('.'); // e.g. "transaction_items.0.description"
    //         setError(path as any, {
    //             type: "manual",
    //             message: issue.message
    //         });
    //     });
    //     return; // Stop submission
    //   }
    // }

    const status = action === 'submit' ? TransactionStatus.SUBMITTED : TransactionStatus.IN_PROGRESS;

    const { ...payloadData } = data;

    const payload = {
        ...payloadData,
        status,
        project_id: projectId,
        document_id: documentId,
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
  }

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
