import { LogOut, Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLogout } from '@/hooks/use-logout';
import type { StravaAthlete } from '@/lib/strava/types';
import { useUiStore } from '@/stores/ui-store';

type NavbarProps = {
  athlete?: StravaAthlete;
  menuDisabled?: boolean;
};

const Navbar = ({ athlete, menuDisabled }: NavbarProps) => {
  const isMenuOpen = useUiStore((state) => state.isMenuOpen);
  const toggleMenu = useUiStore((state) => state.toggleMenu);
  const handleLogout = useLogout();

  return (
    <header className="absolute inset-x-0 top-0 z-60 flex h-(--navbar-height) items-center justify-between gap-4 border-b border-border bg-background/90 px-5 shadow-sm backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleMenu}
          disabled={menuDisabled}
          aria-label="Toggle menu"
          className="-ml-1.5 cursor-pointer text-muted-foreground not-disabled:hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        <button
          type="button"
          onClick={toggleMenu}
          disabled={menuDisabled}
          aria-label="Toggle menu"
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <img src={logo} alt="Bifurkate" className="h-8" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {athlete && (
          <Popover>
            <PopoverTrigger
              disabled={menuDisabled}
              className="flex cursor-pointer items-center gap-4 rounded-full not-disabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {athlete.profile && <img src={athlete.profile} alt="" className="size-10 rounded-full object-cover" />}
              <span className="hidden text-base font-medium text-foreground sm:inline">
                {athlete.firstname} {athlete.lastname}
              </span>
            </PopoverTrigger>
            <PopoverContent align="end" className="z-70 w-56 rounded-xl p-1.5">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 text-base font-medium outline-none hover:bg-accent focus-visible:bg-accent"
              >
                Log off
                <LogOut className="size-5 text-muted-foreground" />
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Navbar;
