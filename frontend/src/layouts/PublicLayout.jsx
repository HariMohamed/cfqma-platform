import { Link, Outlet } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { InstitutionalHeader } from '../components/InstitutionalHeader';
import { Navbar, publicNavLinks } from '../components/Navbar';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { ScrollToTop } from '../components/ScrollToTop';
import { TopBar } from '../components/TopBar';
import { useI18n } from '../hooks/useI18n';
import { useSiteContent } from '../hooks/useSiteContent';

const secondaryLinks = [
  ['nav.preRegistration', '/pre-registration'],
  ['nav.tracking', '/application-tracking'],
  ['nav.faq', '/faq']
];

export function PublicLayout() {
  const { t } = useI18n();
  const { settings } = useSiteContent();
  const phoneNumbers = settings.phoneNumbers ?? [];

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors dark:bg-[#101712] dark:text-white">
      <ScrollToTop />
      <header className="site-header-shell sticky top-0 z-40 shadow-sm motion-reduce:animate-none">
        <TopBar />
        <InstitutionalHeader />
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">{t('brand.name')}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{t('footer.description')}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={t('common.facebook')} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-white/80 hover:text-white">
                  <Facebook size={14} aria-hidden="true" /> {t('common.facebook')}
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={t('common.instagram')} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-white/80 hover:text-white">
                  <Instagram size={14} aria-hidden="true" /> {t('common.instagram')}
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">{t('footer.links')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {[...publicNavLinks.slice(1), ...secondaryLinks].map(([labelKey, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white">
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">{t('footer.contact')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {phoneNumbers.map((phone) => (
                <li key={phone} className="flex gap-2">
                  <Phone size={16} /> <span dir="ltr">{phone}</span>
                </li>
              ))}
              {settings.email && (
                <li className="flex gap-2">
                  <Mail size={16} /> {settings.email}
                </li>
              )}
              {settings.address && (
                <li className="flex gap-2">
                  <MapPin size={16} /> {settings.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-white">{t('partners.title')}</h3>
          <PartnerMarquee compact showHeader={false} tone="dark" className="mt-3" />
        </div>

        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
          2026 {t('brand.name')}. {t('footer.rights')}
        </div>
      </footer>
    </div>
  );
}
