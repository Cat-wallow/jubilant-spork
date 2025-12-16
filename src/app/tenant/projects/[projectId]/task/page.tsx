import { redirect } from "next/navigation";

export default function ProjectTaskAlias({ params }: { params: { projectId: string } }) {
  const projectId = params.projectId;
  redirect(`/tenant/projects/${projectId}/tasks`);
}
