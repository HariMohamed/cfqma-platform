import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { contactInfo } from '../data/seedData';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

const initialForm = { fullName: '', email: '', phone: '', subject: '', message: '' };

export function Contact() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState(initialForm);
  const { t } = useI18n();

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    try {
      await publicService.sendContact(form);
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} description={t('contact.description')} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Info icon={<Phone />} text={contactInfo.phoneNumbers.join(' / ')} dir="ltr" />
          <Info icon={<Mail />} text={contactInfo.email} />
          <Info icon={<MapPin />} text={contactInfo.address} />
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label={t('common.facebook')} className="inline-flex items-center justify-center gap-2 rounded-md bg-white p-4 text-sm font-semibold shadow-sm ring-1 ring-ink/5 hover:text-craft dark:bg-white/10 dark:text-white dark:ring-white/10">
              <Facebook size={16} aria-hidden="true" /> {t('common.facebook')}
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('common.instagram')} className="inline-flex items-center justify-center gap-2 rounded-md bg-white p-4 text-sm font-semibold shadow-sm ring-1 ring-ink/5 hover:text-craft dark:bg-white/10 dark:text-white dark:ring-white/10">
              <Instagram size={16} aria-hidden="true" /> {t('common.instagram')}
            </a>
          </div>
          <iframe
            className="mt-6 h-72 w-full rounded-lg shadow-soft"
            title="Carte CFQMA Sale"
            src="https://www.google.com/maps?q=CFQMA%20Sal%C3%A9%20Centre%20de%20Formation%20et%20de%20Qualification%20dans%20les%20M%C3%A9tiers%20d%27Artisanat%20Sal%C3%A9&output=embed"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <form onSubmit={onSubmit} className="rounded-lg bg-white p-6 shadow-soft dark:bg-white/10 dark:ring-1 dark:ring-white/10">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t('contact.fullName')} value={form.fullName} onChange={(value) => setForm({ ...form, fullName: value })} />
            <Field label={t('contact.email')} type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
            <Field label={t('contact.phone')} value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
            <Field label={t('contact.subject')} value={form.subject} onChange={(value) => setForm({ ...form, subject: value })} />
          </div>
          <label className="mt-4 block text-sm font-semibold text-ink dark:text-white">
            {t('contact.message')}
            <textarea
              required
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="mt-2 min-h-36 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring dark:border-white/15 dark:bg-[#101712] dark:text-white"
            />
          </label>
          <Button className="mt-5" disabled={status === 'loading'}>
            {status === 'loading' ? t('contact.sending') : t('contact.submit')}
          </Button>
          {status === 'success' && <p className="mt-3 text-sm text-green-700 dark:text-green-300">{t('contact.success')}</p>}
          {status === 'error' && <p className="mt-3 text-sm text-red-700 dark:text-red-300">{t('contact.error')}</p>}
        </form>
      </div>
    </section>
  );
}

function Info({ icon, text, dir }) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-white p-4 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:text-white dark:ring-white/10">
      {icon}
      <span className="text-sm font-medium" dir={dir}>{text}</span>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block text-sm font-semibold text-ink dark:text-white">
      {label}
      <input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring dark:border-white/15 dark:bg-[#101712] dark:text-white" />
    </label>
  );
}
