import * as React from 'react';
import { cn } from 'src/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'font-roboto flex h-[54px] w-full appearance-none rounded-lg border border-[#D9D9D9] bg-white px-5 py-3 pr-10 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#332687] disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-6 w-3 -translate-y-1/2 text-[#332687]" />
      </div>
    );
  },
);
Select.displayName = 'Select';

export { Select };
