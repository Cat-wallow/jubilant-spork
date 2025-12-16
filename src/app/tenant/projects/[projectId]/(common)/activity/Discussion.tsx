import { discussionData } from "./data";

export function Discussion() {
  return (
    <div className="flex flex-col items-start gap-2.5 self-stretch">
      {discussionData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-center gap-2.5 self-stretch rounded-[10px] border border-[rgba(145,158,171,0.20)] p-4"
        >
          <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#404040]">
            {item.time}
          </span>
          <div className="flex items-start gap-2.5">
            <div className="flex h-5 w-5 flex-col items-start justify-center gap-2.5 rounded-[50px] bg-[#332687]">
              <span className="self-stretch text-center font-dm text-xs font-normal leading-[30px] tracking-[-0.24px] text-white">
                {item.initials}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-roboto text-sm font-normal leading-5 tracking-[0.25px] text-[#404040]">
                {item.user}
              </span>
              <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#404040]">
                {item.message}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
