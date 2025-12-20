import { redirect } from 'next/navigation';

export default function PPNDetailPage({
  params,
}: {
  params: { projectId: string; id: string };
}) {
  redirect(
    `/tenant/projects/${params.projectId}/kk3/tax-count/ppn/${params.id}/overview`
  );
}
