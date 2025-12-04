import { redirect } from "next/navigation";
export default function Home({ params }: { params: { id: string } }) {
	const id = params.id;
	redirect(`/tenant/projects/${id}/summary`);
}
