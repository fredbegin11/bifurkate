import { Beer, LogOut, Mail } from 'lucide-react';
import { useLogout } from '@/hooks/use-logout';

const SidebarFooter = () => {
  const handleLogout = useLogout();

  return (
    <div className="mt-auto flex flex-col gap-1 border-t border-border py-2">
      <a
        href="mailto:frederic.begin.fb@gmail.com?subject=Bifurkate Feedback"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-md px-5 py-2 text-base font-medium hover:bg-accent"
      >
        Feedback / Suggestion
        <Mail className="size-5 text-muted-foreground" />
      </a>
      <a
        href="https://www.paypal.me/fredbegin11"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-md px-5 py-2 text-base font-medium hover:bg-accent"
      >
        Buy me a beer
        <Beer className="size-5 text-muted-foreground" />
      </a>
      <button
        type="button"
        onClick={handleLogout}
        className="flex cursor-pointer items-center justify-between rounded-md px-5 py-2 text-base font-medium hover:bg-accent sm:hidden"
      >
        Log off
        <LogOut className="size-5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default SidebarFooter;
