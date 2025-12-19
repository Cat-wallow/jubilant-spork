import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Send, RotateCcw } from 'lucide-react';

export function ActionButtons() {
  return (
    <Card className="flex flex-col items-center justify-end gap-[26.25px] self-stretch rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
      <CardTitle className="flex h-[25px] w-[452px] items-center p-6 pb-0 text-base font-medium leading-[24.5px] tracking-[-0.394px] text-[#1E293B]">
        Actions
      </CardTitle>

      <CardContent className="flex w-[494px] flex-col items-start gap-[10.5px]">
        <Button
          variant="outline"
          className="flex items-end justify-end gap-[7px] self-stretch rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.15)]"
        >
          <Save className="h-[14px] w-[14px] text-[#1E293B]" />
          <span className="text-xs font-medium leading-[17.5px] text-[#1E293B]">
            Save as Draft
          </span>
        </Button>

        <Button
          disabled
          className="flex items-end justify-end gap-[7px] self-stretch rounded-[5.25px] bg-[#332687] opacity-50"
        >
          <Send className="h-[14px] w-[14px]" />
          <span className="text-xs font-medium leading-[17.5px]">Post to GL</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-end justify-end gap-[7px] self-stretch rounded-[5.25px]"
        >
          <RotateCcw className="h-[14px] w-[14px] text-[#1E293B]" />
          <span className="text-xs font-medium leading-[17.5px] text-[#1E293B]">
            Reset Form
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
