'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DocumentsTab } from '@/app/admin/projects/[projectId]/components/DocumentsTab';

export default function FormOneBundleDetailPage() {
  const params = useParams();
  const { tenant, user } = useAuth();

  const projectId = params.id as string;
  const bundleId = params.bundleId as string;
  const tenantId = tenant?.id || '';
  const userId = user?.id || '';

  return (
    <div className="space-y-6 p-6">
      <DocumentsTab
        projectId={projectId}
        tenantId={tenantId}
        userId={userId}
        pageTitle="Form 1.0 - Lembar Pengendalian Arus Dokumen"
        pageDescription={`Detail bundle ${bundleId}`}
      />
    </div>
  );
}
