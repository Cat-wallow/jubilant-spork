import { auditLogData } from "./data";

export function AuditLog() {
	return (
		<div className="flex items-start gap-[5px] self-stretch">
			{/* Timeline */}
			<div className="flex w-[31px] flex-col items-center">
				{auditLogData.map((_, index) => (
					<div key={index} className="flex flex-col items-center">
						<div className="h-[15px] w-[15px] rounded-full border border-[#404040]" />
						{index < auditLogData.length - 1 && (
							<div className="h-[57px] w-px bg-gray-300" />
						)}
					</div>
				))}
			</div>

			{/* Content */}
			<div className="flex flex-col items-start justify-center gap-2.5">
				{auditLogData.map((item, index) => (
					<div
						key={index}
						className="flex w-[227px] flex-col items-end justify-center gap-2.5"
					>
						<span className="self-stretch  text-xs leading-4 tracking-[0.4px] text-primary">
							{item.time}
						</span>
						<div className="flex flex-col items-end self-stretch">
							<div className="flex items-center gap-[5px] self-stretch">
								<div className="flex h-5 w-5 flex-col items-start justify-center gap-2.5 rounded-[50px] bg-primary">
									<span className="self-stretch text-center font-dm text-xs leading-[30px] tracking-[-0.24px] text-white">
										{item.initials}
									</span>
								</div>
								<div className="flex w-[183px] items-center">
									<span className=" text-sm leading-5 tracking-[0.25px] text-primary">
										{item.user}
									</span>
									<span className=" text-xs font-medium leading-4 tracking-[0.4px] text-primary">
										{item.action}
									</span>
								</div>
							</div>
							<span className="w-[202px]  text-xs leading-4 tracking-[0.4px] text-primary">
								{item.reference}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
