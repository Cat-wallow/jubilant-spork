import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function OutputTab() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					Output
				</CardTitle>
			</CardHeader>
			<CardContent className="max-h-[450px] space-y-4">
				<div className="flex items-center space-x-2">
					<Calculator className="h-4 w-4" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							Output
						</p>
						<p className="text-sm text-muted-foreground">
							Output
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
