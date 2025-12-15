export enum TransactionStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  LEADER_APPROVED = "LEADER_APPROVED",
  PMO_APPROVED = "PMO_APPROVED",
}

export interface Transaction {
  id: string;
  tenant_id: string;
  project_id: string;
  transaction_number: string;
  transaction_date: string; // Assuming ISO string from backend
  description: string;
  amount: number;
  currency?: string;
  vendor_name?: string;
  vendor_npwp?: string;
  category?: string;
  account_code?: string;
  tax_type?: string;
  tax_amount?: number;
  has_documents?: boolean;
  document_warning?: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: TransactionStatus;
}

export interface Document {
  id: string;
  tenant_id: string;
  project_id: string;

  jenis_dokumen: string;
  tipe_dokumen: string
  nomor_dokumen: string;

  document_date: string;

  jumlah_lembar: number;
  status: string

  folder: string;

  asal_dokumen_status: boolean;
  asal_dokumen_by: string;
  asal_dokumen_date: string;
  asal_dokumen_source: string;

  pengiriman_status: boolean;
  pengiriman_by: string | null;
  pengiriman_date: string | null;

  penerimaan_status: boolean;
  penerimaan_by: string;
  penerimaan_date: string;

  digitalisasi_status: boolean;
  digitalisasi_by: string;
  digitalisasi_date: string;

  pendeskripsian_status: boolean;
  pendeskripsian_by: string;
  pendeskripsian_date: string;

  original_filename: string;
  stored_filename: string;
  s3_key: string;
  s3_bucket: string;

  file_size: number;
  mime_type: string;
  checksum: string;

  uploaded_by: string;

  description: string;
  ocr_text: string | null;
  ocr_status: string;

  version: number;
  is_deleted: boolean;

  created_at: string;
  updated_at: string;
}

export interface DocumentTransaction extends Document {
  transaction_documents: Transaction[];
  transaction: string;
}


export interface TransactionResponse {
    success: boolean;
    message: string;
    data: {
      documents: DocumentTransaction[];
    }
}
