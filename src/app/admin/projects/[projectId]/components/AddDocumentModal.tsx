'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Upload,
  X,
  Loader2,
  FileText,
  File,
  Image,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Types & Constants
// =============================================================================

interface AddDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DocumentFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface DocumentFormData {
  // Informasi Dokumen
  tipeDokumen: string;
  jenisDokumen: string;
  nomorDokumen: string;
  tanggalDokumen: string;
  jumlahLembar: number;
  asalDokumen: 'asli' | 'copy' | 'digital';
  files: File[];
  
  // Informasi Administrasi
  adminPicKlien: string;
  divisi: string;
  posisiDokumenAsli: string;
  noUrutSortiran: string;
  // Informasi Tambahan
  catatan: string;
}

// Tipe Dokumen options
const TIPE_DOKUMEN_OPTIONS = [
  { value: 'faktur_pajak', label: 'Faktur Pajak' },
  { value: 'bukti_potong', label: 'Bukti Potong' },
  { value: 'spt', label: 'SPT' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'kontrak', label: 'Kontrak' },
  { value: 'kwitansi', label: 'Kwitansi' },
  { value: 'po', label: 'Purchase Order' },
  { value: 'lainnya', label: 'Lainnya' },
];

// Jenis Dokumen options (bisa berbeda berdasarkan tipe)
const JENIS_DOKUMEN_OPTIONS = [
  { value: 'ppn_masukan', label: 'PPN Masukan' },
  { value: 'ppn_keluaran', label: 'PPN Keluaran' },
  { value: 'pph_21', label: 'PPh 21' },
  { value: 'pph_22', label: 'PPh 22' },
  { value: 'pph_23', label: 'PPh 23' },
  { value: 'pph_4_2', label: 'PPh 4(2)' },
  { value: 'pph_25', label: 'PPh 25' },
  { value: 'pph_badan', label: 'PPh Badan' },
  { value: 'lainnya', label: 'Lainnya' },
];

// Divisi options
const DIVISI_OPTIONS = [
  { value: 'keuangan', label: 'Keuangan' },
  { value: 'akuntansi', label: 'Akuntansi' },
  { value: 'pajak', label: 'Pajak' },
  { value: 'hrd', label: 'HRD' },
  { value: 'operasional', label: 'Operasional' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'it', label: 'IT' },
  { value: 'lainnya', label: 'Lainnya' },
];

// Asal Dokumen options
const ASAL_DOKUMEN_OPTIONS = [
  { value: 'asli', label: 'Asli' },
  { value: 'copy', label: 'Copy' },
  { value: 'digital', label: 'Digital' },
];

// =============================================================================
// Helper Functions
// =============================================================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return <Image className="h-4 w-4 text-purple-500" />;
  }
  if (mimeType === 'application/pdf') {
    return <FileText className="h-4 w-4 text-red-500" />;
  }
  return <File className="h-4 w-4 text-blue-500" />;
};

// =============================================================================
// Component
// =============================================================================

export function AddDocumentModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddDocumentModalProps) {
  // Informasi Dokumen state
  const [tipeDokumen, setTipeDokumen] = useState('');
  const [jenisDokumen, setJenisDokumen] = useState('');
  const [nomorDokumen, setNomorDokumen] = useState('');
  const [tanggalDokumen, setTanggalDokumen] = useState('');
  const [jumlahLembar, setJumlahLembar] = useState('');
  const [asalDokumen, setAsalDokumen] = useState<'asli' | 'copy' | 'digital'>('digital');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Informasi Administrasi state
  const [adminPicKlien, setAdminPicKlien] = useState('');
  const [divisi, setDivisi] = useState('');
  const [posisiDokumenAsli, setPosisiDokumenAsli] = useState('');
  const [noUrutSortiran, setNoUrutSortiran] = useState('');
  // Informasi Tambahan state
  const [catatan, setCatatan] = useState('');

  // =============================================================================
  // Handlers
  // =============================================================================

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const resetForm = () => {
    setTipeDokumen('');
    setJenisDokumen('');
    setNomorDokumen('');
    setTanggalDokumen('');
    setJumlahLembar('');
    setAsalDokumen('digital');
    setSelectedFiles([]);
    setAdminPicKlien('');
    setDivisi('');
    setPosisiDokumenAsli('');
    setNoUrutSortiran('');
    setCatatan('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!tipeDokumen) {
      toast.error('Pilih tipe dokumen');
      return;
    }
    if (!jenisDokumen) {
      toast.error('Pilih jenis dokumen');
      return;
    }
    if (!nomorDokumen) {
      toast.error('Masukkan nomor dokumen');
      return;
    }
    if (!tanggalDokumen) {
      toast.error('Masukkan tanggal dokumen');
      return;
    }
    if (!jumlahLembar || parseInt(jumlahLembar) < 1) {
      toast.error('Masukkan jumlah lembar yang valid');
      return;
    }
    if (!adminPicKlien) {
      toast.error('Masukkan nama admin/PIC klien');
      return;
    }
    if (!divisi) {
      toast.error('Pilih divisi');
      return;
    }
    if (!posisiDokumenAsli) {
      toast.error('Masukkan posisi dokumen asli');
      return;
    }
    if (!catatan) {
      toast.error('Masukkan catatan');
      return;
    }

    const formData: DocumentFormData = {
      tipeDokumen,
      jenisDokumen,
      nomorDokumen,
      tanggalDokumen,
      jumlahLembar: parseInt(jumlahLembar),
      asalDokumen,
      files: selectedFiles,
      adminPicKlien,
      divisi,
      posisiDokumenAsli,
      noUrutSortiran,
      catatan,
    };

    try {
      await onSubmit(formData);
      resetForm();
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in parent
    }
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  // =============================================================================
  // Render
  // =============================================================================

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Tambah Dokumen Baru</DialogTitle>
          <DialogDescription>
            Tambahkan dokumen baru ke dengan mengisi informasi di bawah ini
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* ================================================================= */}
          {/* Section: Informasi Dokumen */}
          {/* ================================================================= */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-base">Informasi Dokumen</h3>

            {/* Tipe Dokumen */}
            <div className="space-y-2">
              <Label>Tipe Dokumen</Label>
              <Select value={tipeDokumen} onValueChange={setTipeDokumen}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tipe Dokumen" />
                </SelectTrigger>
                <SelectContent>
                  {TIPE_DOKUMEN_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Jenis Dokumen */}
            <div className="space-y-2">
              <Label>Jenis Dokumen</Label>
              <Select value={jenisDokumen} onValueChange={setJenisDokumen}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jenis Dokumen" />
                </SelectTrigger>
                <SelectContent>
                  {JENIS_DOKUMEN_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nomor Dokumen & Tanggal Dokumen - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Nomor Dokumen <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Masukan nomor dokumen"
                  value={nomorDokumen}
                  onChange={(e) => setNomorDokumen(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Tanggal Dokumen <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={tanggalDokumen}
                  onChange={(e) => setTanggalDokumen(e.target.value)}
                />
              </div>
            </div>

            {/* Jumlah Lembar & Asli/Copy/Digital - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Jumlah Lembar <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="Masukan jumlah lembar"
                  value={jumlahLembar}
                  onChange={(e) => setJumlahLembar(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Asli/Copy/Digital <span className="text-red-500">*</span>
                </Label>
                <Select value={asalDokumen} onValueChange={(val) => setAsalDokumen(val as 'asli' | 'copy' | 'digital')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih dokumen asal" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASAL_DOKUMEN_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lampiran Dokumen */}
            <div className="space-y-2">
              <Label>Lampiran Dokumen</Label>
              <div className="border rounded-lg p-3 bg-muted/30">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="document-file-upload"
                />
                <label
                  htmlFor="document-file-upload"
                  className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Choose File</span>
                </label>
              </div>
              
              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-1 mt-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {getFileIcon(file.type)}
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                <span>Format yang didukung: JPG, PNG, PDF</span>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* Section: Informasi Administrasi */}
          {/* ================================================================= */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-base">Informasi Administrasi</h3>

            {/* Admin (PIC) Klien & Divisi - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Admin (PIC) Klien <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Masukan nama admin/PIC dari Klien"
                  value={adminPicKlien}
                  onChange={(e) => setAdminPicKlien(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Divisi <span className="text-red-500">*</span>
                </Label>
                <Select value={divisi} onValueChange={setDivisi}>
                  <SelectTrigger>
                    <SelectValue placeholder="Divisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIVISI_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Posisi Dokumen Asli & No Urut Sortiran - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Posisi Dokumen Asli <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Lemari A-1, dll"
                  value={posisiDokumenAsli}
                  onChange={(e) => setPosisiDokumenAsli(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>No Urut Sortiran dari Klien</Label>
                <Input
                  placeholder="Opsional - otomatis jika dikosongkan"
                  value={noUrutSortiran}
                  onChange={(e) => setNoUrutSortiran(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* Section: Informasi Tambahan */}
          {/* ================================================================= */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-base">Informasi Tambahan</h3>

            <div className="space-y-2">
              <Label>
                Catatan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Deskripsi catatan"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              'Simpan Dokumen'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
