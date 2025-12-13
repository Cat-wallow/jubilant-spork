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

  // Custom fields added by service layer for frontend convenience
  document_type?: string;
  document_number?: string;
  document_date?: string;
}

export interface TransactionDocument {
  id: string;
  transaction_id: string;
  document_id: string;
  vouching_note?: string;
  linked_by: string;
  linked_at: string;
  documents: {
    id: string;
    jenis_dokumen: string;
    nomor_dokumen?: string;
    document_date?: string;
    // Add other relevant document fields if needed
  };
}
