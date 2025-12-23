export default async function KK5Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return (
    <div>
      BAST page
    </div>
  );
}
