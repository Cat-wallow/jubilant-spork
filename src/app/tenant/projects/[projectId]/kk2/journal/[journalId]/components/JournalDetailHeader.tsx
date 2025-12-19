import { JournalDetail } from '../../mock-data';

interface JournalDetailHeaderProps {
  data: JournalDetail;
}

export function JournalDetailHeader({ data }: JournalDetailHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-[5px] self-stretch">
      <div className="self-stretch text-sm font-medium leading-6 text-[#707EAE]">
        KK 2.0 &gt; Journal
      </div>
      <div className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
        Journal Entry Detail
      </div>
      <div className="font-normal leading-5 text-black">
        {data.number} • {data.date}
      </div>
    </div>
  );
}
