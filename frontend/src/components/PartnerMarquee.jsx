import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { mediaUrl } from '../utils/media';

export function PartnerMarquee({ compact = false, showHeader = true, tone = 'default', className = '', showNames = false }) {
  const { t } = useI18n();
  const { partners, status } = useSiteContent();
  const repeatedPartners = [...partners, ...partners];
  const isDarkTone = tone === 'dark' || tone === 'green';
  const edgeClass = tone === 'green' ? 'from-[#12382d] dark:from-[#0b231c]' : tone === 'dark' ? 'from-ink' : 'from-paper dark:from-[#101712]';
  const titleClass = isDarkTone ? 'text-white' : 'text-ink dark:text-white';
  const descriptionClass = isDarkTone ? 'text-white/70' : 'text-ink/70 dark:text-white/70';

  return (
    <section className={className}>
      {showHeader && (
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${titleClass}`}>{t('partners.title')}</h2>
          <p className={`mt-4 text-base leading-7 ${descriptionClass}`}>{t('partners.description')}</p>
        </div>
      )}

      <div className={`relative ${showHeader ? 'mt-8' : ''} overflow-hidden`} dir="ltr" aria-label={t('partners.title')}>
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${edgeClass} to-transparent sm:w-28`} />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${edgeClass} to-transparent sm:w-28`} />
        {partners.length === 0 ? (
          <div className="flex justify-center py-2">
            <div className="inline-flex h-20 min-w-[220px] items-center justify-center rounded-lg bg-white px-5 text-center text-sm font-bold text-ink shadow-sm ring-1 ring-ink/10">
              {status === 'loading' ? 'Chargement des partenaires...' : 'Aucun partenaire publié.'}
            </div>
          </div>
        ) : (
          <div className="partner-marquee-track flex w-max gap-5 py-2 hover:[animation-play-state:paused] motion-reduce:transform-none">
            {repeatedPartners.map((partner, index) => (
              <PartnerLogoCard key={`${partner.name}-${index}`} partner={partner} compact={compact} showName={showNames} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function PartnerLogoCard({ partner, compact = false, showName = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasLogo = partner.logo && !imageFailed;
  const cardClass = `${compact ? 'h-16 min-w-[150px] px-4' : showName ? 'h-28 min-w-[220px] px-5 py-4' : 'h-24 min-w-[210px] px-6'} relative inline-flex flex-col items-center justify-center rounded-lg bg-white text-center text-sm font-bold text-ink shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft motion-reduce:transform-none dark:bg-white dark:text-ink`;
  const content = hasLogo ? (
    <img src={mediaUrl(partner.logo)} alt={partner.alt} className={`${compact ? 'max-h-10' : 'max-h-14'} max-w-[150px] object-contain`} loading="lazy" onError={() => setImageFailed(true)} />
  ) : (
    <span className="leading-5">{partner.name}</span>
  );
  const cardBody = (
    <>
      {content}
      {showName && hasLogo && <span className="mt-2 line-clamp-2 text-xs font-semibold leading-4 text-ink/75">{partner.name}</span>}
    </>
  );

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" className={cardClass} aria-label={`${partner.name} - ${partner.alt}`}>
        {cardBody}
        <ExternalLink className="absolute right-2 top-2 text-ink/35" size={13} aria-hidden="true" />
      </a>
    );
  }

  return <div className={cardClass}>{cardBody}</div>;
}
