'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function P2PPhIdPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const projectId = params.projectId as string;
    const id = params.id as string;
    router.replace(`/tenant/projects/${projectId}/kk3/tax-count/p2pph/${id}/overview`);
  }, [params, router]);

  return null;
}
