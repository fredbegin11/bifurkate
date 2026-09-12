import { cn } from 'cn';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type CollapsibleSectionProps = {
  label: string;
  children: ReactNode;
  hasActiveFilter?: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const CollapsibleSection = ({ label, children, hasActiveFilter, isOpen, onOpenChange }: CollapsibleSectionProps) => (
  <Collapsible open={isOpen} onOpenChange={onOpenChange} className="border-b border-border">
    <CollapsibleTrigger className="sticky top-0 z-10 flex w-full cursor-pointer items-center justify-between border-b border-border bg-background px-5 py-3 text-lg font-bold hover:bg-accent">
      <span className="flex items-center gap-2">
        {label}
        {hasActiveFilter && (
          <span className="size-2 rounded-full bg-primary ring-2 ring-primary/25" aria-hidden="true" />
        )}
      </span>
      <ChevronDown className={cn('size-5 transition-transform', !isOpen && '-rotate-90')} />
    </CollapsibleTrigger>
    <CollapsibleContent className="flex flex-col gap-4 pt-3 pb-4">{children}</CollapsibleContent>
  </Collapsible>
);

export default CollapsibleSection;
