import React from 'react';
import { redirect } from 'next/navigation';

export default async function PphBadanPage({ params }) {
  // Redirect to edit page
  redirect(`/tenant/projects/${params.projectId}/kk3/spt-management/pph-badan/${params.id}/edit`);
}
