import React from 'react';
import { redirect } from 'next/navigation';

export default async function PphBadanPage() {
  // Redirect to edit page
  redirect('./edit');
}
