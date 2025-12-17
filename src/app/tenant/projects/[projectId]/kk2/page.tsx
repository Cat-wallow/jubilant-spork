import { redirect } from 'next/navigation';

export default async function KK2Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  redirect(`/tenant/projects/${projectId}/kk2/dashboard`);
}
