import { discussionData } from "./data";

export function Discussion() {
	return (
		<div className="flex flex-col items-start gap-2.5 self-stretch">
			{discussionData.map((item, index) => (
				<div
					key={index}
					className="flex flex-col items-start justify-center gap-2.5 self-stretch rounded-[10px] border  p-4"
				>
					<span className=" text-xs leading-4 tracking-[0.4px] ">
						{item.time}
					</span>
					<div className="flex items-start gap-2.5">
						<div className="flex h-5 w-5 flex-col items-start justify-center gap-2.5 rounded-[50px] bg-primary">
							<span className="self-stretch text-center font-dm text-xs leading-[30px] tracking-[-0.24px] text-white">
								{item.initials}
							</span>
						</div>
						<div className="flex flex-col items-start">
							<span className=" text-sm leading-5 tracking-[0.25px] ">
								{item.user}
							</span>
							<span className=" text-xs leading-4 tracking-[0.4px] ">
								{item.message}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
