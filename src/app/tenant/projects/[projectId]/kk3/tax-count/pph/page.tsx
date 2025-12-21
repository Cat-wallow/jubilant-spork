import { redirect } from "next/navigation";

export default async function Home({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;
	redirect(`/tenant/projects/${projectId}/kk3/tax-count/pph/1771`);
}
