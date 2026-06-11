import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { HeaderControls } from './HeaderControls';

export function TopBar() {
  const { t } = useI18n();
  const { settings } = useSiteContent();
  const phoneNumbers = settings.phoneNumbers ?? [];

  return (
    <div className="bg-ink text-white dark:bg-[#0b1f18]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 text-xs sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/80">
          {phoneNumbers.length > 0 && (
            <span className="inline-flex min-w-0 items-center gap-2">
              <Phone size={14} aria-hidden="true" />
              <span className="flex flex-wrap gap-x-2" dir="ltr">
                {phoneNumbers.map((phone, index) => (
                  <span key={phone}>
                    {phone}
                    {index < phoneNumbers.length - 1 && <span className="px-2 text-white/35">|</span>}
                  </span>
                ))}
              </span>
            </span>
          )}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="inline-flex min-w-0 items-center gap-2 hover:text-clay">
              <Mail size={14} aria-hidden="true" />
              <span>{settings.email}</span>
            </a>
          )}
          {settings.address && (
            <span className="inline-flex min-w-0 items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              <span>{settings.address}</span>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-start lg:justify-end">
          <div className="flex items-center gap-2">
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white" aria-label={t('common.facebook')}>
                <Facebook size={16} aria-hidden="true" />
              </a>
            )}
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white" aria-label={t('common.instagram')}>
                <Instagram size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          <HeaderControls tone="dark" />
        </div>
      </div>
    </div>
  );
}
