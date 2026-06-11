import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '../data/seedData';
import { useI18n } from '../hooks/useI18n';
import { HeaderControls } from './HeaderControls';

export function TopBar() {
  const { t } = useI18n();

  return (
    <div className="bg-ink text-white dark:bg-[#0b1f18]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 text-xs sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/80">
          <span className="inline-flex min-w-0 items-center gap-2">
            <Phone size={14} aria-hidden="true" />
            <span className="flex flex-wrap gap-x-2" dir="ltr">
              {contactInfo.phoneNumbers.map((phone, index) => (
                <span key={phone}>
                  {phone}
                  {index < contactInfo.phoneNumbers.length - 1 && <span className="px-2 text-white/35">|</span>}
                </span>
              ))}
            </span>
          </span>
          <a href={`mailto:${contactInfo.email}`} className="inline-flex min-w-0 items-center gap-2 hover:text-clay">
            <Mail size={14} aria-hidden="true" />
            <span>{contactInfo.email}</span>
          </a>
          <span className="inline-flex min-w-0 items-center gap-2">
            <MapPin size={14} aria-hidden="true" />
            <span>{contactInfo.address}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-start lg:justify-end">
          <div className="flex items-center gap-2">
            <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white" aria-label={t('common.facebook')}>
              <Facebook size={16} aria-hidden="true" />
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white" aria-label={t('common.instagram')}>
              <Instagram size={16} aria-hidden="true" />
            </a>
          </div>
          <HeaderControls tone="dark" />
        </div>
      </div>
    </div>
  );
}
