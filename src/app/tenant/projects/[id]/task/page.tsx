import { redirect } from "next/navigation";

export default function ProjectTaskAlias({ params }: { params: { id: string } }) {
  const id = params.id;
  redirect(`/tenant/projects/${id}/tasks`);
}
