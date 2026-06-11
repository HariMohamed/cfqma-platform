import { PartnerLogoCard } from './PartnerMarquee';
import { useSiteContent } from '../hooks/useSiteContent';

export function PartnerList({ compact = false }) {
  const { partners, status } = useSiteContent();

  if (partners.length === 0) {
    return (
      <div className="rounded-lg bg-white p-5 text-sm font-semibold text-ink/70 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:text-white/70 dark:ring-white/10">
        {status === 'loading' ? 'Chargement des partenaires...' : 'Aucun partenaire publié.'}
      </div>
    );
  }

  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
      {partners.map((partner) => (
        <PartnerLogoCard key={partner.name} partner={partner} compact={compact} />
      ))}
    </div>
  );
}
