interface PlaceholderTabProps {
  title: string;
  description?: string;
}

export default function PlaceholderTab({ title, description }: PlaceholderTabProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
      <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
      {description && <p className="text-center text-gray-500">{description}</p>}
      <p className="mt-4 text-sm text-gray-400">Coming soon...</p>
    </div>
  );
}
