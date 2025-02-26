import * as React from 'react';

import { cn } from '@/lib/utils';
import { FilterXIcon } from 'lucide-react';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onClear'
> & {
  onClear?: () => void;
  isSearching?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, isSearching = false, onClear = () => {}, ...props },
    ref,
  ) => {
    const onClickClear = () => {
      const input = document.querySelector('input');
      if (!input) return;

      input.value = '';
      onClear();
    };
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'flex min-h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {isSearching && (
          <FilterXIcon
            className="absolute right-2 top-3 cursor-pointer"
            onClick={() => onClickClear()}
          />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
