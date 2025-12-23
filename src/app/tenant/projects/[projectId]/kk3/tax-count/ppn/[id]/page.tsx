import { redirect } from 'next/navigation';

interface PPNDetailPageProps {
  params: {
    projectId: string;
    id: string;
  };
}

export default function PPNDetailPage({ params }: PPNDetailPageProps) {
  redirect(`/tenant/projects/${params.projectId}/kk3/tax-count/ppn/${params.id}/overview`);
}
