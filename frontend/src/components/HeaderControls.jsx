import { Languages, Moon, Sun } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' }
];

export function HeaderControls({ tone = 'light' }) {
  const { language, setLanguage, t } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const isDarkTone = tone === 'dark';
  const inactiveClass = isDarkTone
    ? 'text-white/70 hover:bg-white/10 hover:text-white'
    : 'text-ink/70 hover:bg-white dark:text-white/70 dark:hover:bg-white/10';
  const controlRing = isDarkTone ? 'ring-white/15 text-white' : 'ring-ink/10 text-ink dark:text-white dark:ring-white/15';

  return (
    <div className="flex items-center gap-2">
      <div className={`inline-flex h-9 items-center gap-1 rounded-md p-1 text-sm font-semibold ring-1 ${controlRing}`} role="group" aria-label={t('nav.language')} title={t('nav.language')}>
        <Languages size={16} aria-hidden="true" />
        {languages.map((item) => (
          <button
            key={item.code}
            type="button"
            className={`h-7 min-w-8 rounded px-2 text-xs font-bold transition focus-ring ${
              language === item.code ? 'bg-clay text-ink shadow-sm' : inactiveClass
            }`}
            onClick={() => setLanguage(item.code)}
            aria-pressed={language === item.code}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 transition focus-ring ${controlRing} ${inactiveClass}`}
        onClick={toggleTheme}
        aria-label={t('nav.theme')}
        title={t('nav.theme')}
      >
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
  );
}
