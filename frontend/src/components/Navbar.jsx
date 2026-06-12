import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { useI18n } from '../hooks/useI18n';

export const publicNavLinks = [
  ['nav.home', '/'],
  ['nav.about', '/about'],
  ['nav.formations', '/formations'],
  ['nav.admission', '/admission'],
  ['nav.accompaniment', '/accompagnement'],
  ['nav.news', '/news'],
  ['nav.events', '/events'],
  ['nav.contact', '/contact']
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const navClass = ({ isActive }) =>
    `relative px-2 py-3 text-sm font-bold text-ink transition after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-clay after:transition-transform hover:text-moss dark:text-white/80 dark:hover:text-clay ${
      isActive ? 'text-moss after:scale-x-100 dark:text-clay' : 'after:scale-x-0'
    }`;

  const mobileNavClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-moss text-white' : 'text-ink hover:bg-paper dark:text-white/80 dark:hover:bg-white/10'
    }`;

  return (
    <div className="border-b border-ink/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#111b15]">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="hidden lg:block" />
        <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Navigation principale">
          {publicNavLinks.map(([labelKey, to]) => (
            <NavLink key={to} to={to} end={to === '/'} className={navClass}>
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden justify-self-end lg:block">
          <Button to="/pre-registration" className="bg-moss hover:bg-ink dark:hover:bg-clay dark:hover:text-ink">
            {t('nav.preRegistration')}
          </Button>
        </div>

        <button
          type="button"
          className="col-start-2 my-2 inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-md text-ink ring-1 ring-ink/10 transition hover:bg-paper focus-ring dark:text-white dark:ring-white/15 dark:hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-white px-4 pb-4 dark:border-white/10 dark:bg-[#111b15] lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 pt-3" aria-label="Navigation mobile">
            {publicNavLinks.map(([labelKey, to]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={mobileNavClass}>
                {t(labelKey)}
              </NavLink>
            ))}
            <Button to="/pre-registration" className="mt-2 bg-moss hover:bg-ink" onClick={() => setOpen(false)}>
              {t('nav.preRegistration')}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
