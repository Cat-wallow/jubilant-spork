import { Card } from '@/components/ui/card';

export default function PPhBadanPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <Card className="flex items-center justify-center rounded-[20px] bg-white p-[100px]">
        <div className="text-center">
          <h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
            PPh Badan 1771
          </h2>
          <p className="mt-2 font-roboto text-sm text-[#A3AED0]">
            Halaman ini akan segera tersedia
          </p>
        </div>
      </Card>
    </div>
  );
}
