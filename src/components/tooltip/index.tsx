import { Tooltip } from '@chakra-ui/tooltip';
import type { ReactElement } from "react";
const TooltipHorizon = (props: {
  extra: string;
  trigger: ReactElement;
  content: ReactElement;
  placement: 'left' | 'right' | 'top' | 'bottom';
}) => {
  const { extra, trigger, content, placement } = props;
  return (
    <Tooltip
      placement={placement}
      label={content}
      className={`w-max rounded-xl bg-card px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${extra}`}
    >
      {trigger}
    </Tooltip>
  );
};

export default TooltipHorizon;
