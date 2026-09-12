import type { ReactNode } from 'react';

type SubSectionProps = {
  label: string;
  children: ReactNode;
};

const SubSection = ({ label, children }: SubSectionProps) => (
  <div className="flex flex-col gap-2 px-3">
    <span className="px-2 text-base font-bold tracking-wide text-muted-foreground uppercase">{label}</span>
    <div className="flex flex-col rounded-xl border border-border bg-card p-1">{children}</div>
  </div>
);

export default SubSection;
