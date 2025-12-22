export function PageHeader({ title, breadcrumb }: { title: string; breadcrumb: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-medium text-[#707EAE]">{breadcrumb}</p>
      <h1 className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
        {title}
      </h1>
    </div>
  );
}
