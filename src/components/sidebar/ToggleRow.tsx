import type { LucideIcon } from 'lucide-react';
import { useId } from 'react';
import { Switch } from '@/components/ui/switch';

type ToggleRowProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: LucideIcon;
};

const ToggleRow = ({ label, active, onClick, icon: Icon }: ToggleRowProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium hover:bg-accent"
    >
      <span className="flex items-center gap-3">
        {Icon && <Icon className="size-5 text-foreground" />}
        {label}
      </span>
      <Switch id={id} checked={active} onCheckedChange={onClick} />
    </label>
  );
};

export default ToggleRow;
