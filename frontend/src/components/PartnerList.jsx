import { PartnerLogoCard } from './PartnerMarquee';
import { partners } from '../data/partners';

export function PartnerList({ compact = false }) {
  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
      {partners.map((partner) => (
        <PartnerLogoCard key={partner.name} partner={partner} compact={compact} />
      ))}
    </div>
  );
}
