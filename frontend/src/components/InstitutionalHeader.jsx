import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';

const headerLogos = {
  artisanat: {
    name: 'Artisanat Maroc',
    logo: '/images/mda-ar.png',
    url: 'https://mtaess.gov.ma/',
    alt: 'Logo Artisanat Maroc'
  },
  fondation: {
    name: 'Fondation Mohammed V',
    logo: '/images/logo.svg',
    url: 'https://www.fm5.ma/',
    alt: 'Logo Fondation Mohammed V pour la Solidarité'
  }
};

export function InstitutionalHeader() {
  const { t } = useI18n();

  return (
    <div className="border-b border-ink/10 bg-white dark:border-white/10 dark:bg-[#111b15]">
      <div className="mx-auto grid max-w-7xl grid-cols-[4.5rem_1fr_4.5rem] items-center gap-3 px-4 py-4 sm:grid-cols-[8rem_1fr_8rem] sm:px-6 lg:px-8">
        <InstitutionLogoLink logo={headerLogos.artisanat} />
        <Link to="/" className="min-w-0 text-center" aria-label={t('brand.name')}>
          <p className="text-[0.8rem] font-extrabold uppercase leading-tight tracking-wide text-ink dark:text-white sm:text-xl lg:text-2xl">
            {t('brand.fullTitleLine1')}
          </p>
          <p className="mt-1 text-[0.78rem] font-extrabold uppercase leading-tight tracking-wide text-ink dark:text-white sm:text-lg lg:text-2xl">
            {t('brand.fullTitleLine2')} {t('brand.city')}
          </p>
        </Link>
        <InstitutionLogoLink logo={headerLogos.fondation} align="end" />
      </div>
    </div>
  );
}

function InstitutionLogoLink({ logo, align = 'start' }) {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.name}
      className={`inline-flex h-14 w-full max-w-28 items-center justify-center rounded-md bg-white px-2 shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:shadow-soft motion-reduce:transform-none dark:bg-white ${align === 'end' ? 'justify-self-end' : 'justify-self-start'}`}
    >
      {logo.logo && !failed ? (
        <img src={logo.logo} alt={logo.alt} className="max-h-11 max-w-full object-contain" onError={() => setFailed(true)} />
      ) : (
        <span className="text-center text-[10px] font-bold leading-tight text-ink">{logo.name}</span>
      )}
    </a>
  );
}
