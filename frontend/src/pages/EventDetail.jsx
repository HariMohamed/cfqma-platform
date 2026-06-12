import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';
import { mediaUrl } from '../utils/media';
import { NotFound } from './NotFound';

const copies = {
  fr: {
    back: 'Retour aux événements',
    loading: 'Chargement de l’événement...',
    error: 'Impossible de charger cet événement depuis le backend.',
    date: 'Date',
    endDate: 'Fin',
    location: 'Lieu',
    participants: 'Participants',
    relatedFormations: 'Formations liées',
    gallery: 'Galerie',
    types: {
      exhibition: 'Exposition',
      event: 'Événement',
      workshop: 'Atelier',
      announcement: 'Annonce'
    }
  },
  ar: {
    back: 'العودة إلى الأحداث',
    loading: 'جار تحميل الحدث...',
    error: 'تعذر تحميل هذا الحدث من الخادم.',
    date: 'التاريخ',
    endDate: 'النهاية',
    location: 'المكان',
    participants: 'المشاركون',
    relatedFormations: 'التكوينات المرتبطة',
    gallery: 'الرواق',
    types: {
      exhibition: 'معرض',
      event: 'حدث',
      workshop: 'ورشة',
      announcement: 'إعلان'
    }
  },
  en: {
    back: 'Back to events',
    loading: 'Loading event...',
    error: 'Unable to load this event from the backend.',
    date: 'Date',
    endDate: 'End',
    location: 'Location',
    participants: 'Participants',
    relatedFormations: 'Related training',
    gallery: 'Gallery',
    types: {
      exhibition: 'Exhibition',
      event: 'Event',
      workshop: 'Workshop',
      announcement: 'Announcement'
    }
  }
};

function formatDate(value, language) {
  if (!value) return '';
  const locale = language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-US' : 'fr-FR';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
}

function getTypeLabel(type, copy) {
  return copy.types[type] ?? type;
}

export function EventDetail() {
  const { slug } = useParams();
  const { language } = useI18n();
  const copy = useMemo(() => copies[language] ?? copies.fr, [language]);
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    publicService
      .getEvent(slug)
      .then((data) => {
        setItem(data);
        setStatus(data ? 'ready' : 'not-found');
      })
      .catch((error) => {
        setStatus(error.response?.status === 404 ? 'not-found' : 'error');
      });
  }, [slug]);

  if (status === 'loading') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16">
        <LoadingState label={copy.loading} />
      </section>
    );
  }

  if (status === 'not-found') return <NotFound />;

  if (status === 'error') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16">
        <ErrorState label={copy.error} />
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Button to="/events" variant="secondary">
        {copy.back}
      </Button>

      {item.coverImage && <img src={mediaUrl(item.coverImage)} alt={item.title} className="mt-8 h-80 w-full rounded-lg object-cover shadow-soft" />}

      <div className="mt-8">
        <span className="rounded-full bg-craft/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-craft dark:bg-clay/15 dark:text-clay">
          {getTypeLabel(item.type, copy)}
        </span>
        <h1 className="mt-4 text-4xl font-bold text-ink dark:text-white">{item.title}</h1>
        {item.excerpt && <p className="mt-4 text-lg leading-8 text-ink/70 dark:text-white/70">{item.excerpt}</p>}
      </div>

      <dl className="mt-8 grid gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10 sm:grid-cols-3">
        <div>
          <dt className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/50 dark:text-white/50">
            <CalendarDays size={15} /> {copy.date}
          </dt>
          <dd className="mt-1 font-semibold text-ink dark:text-white">{formatDate(item.date, language)}</dd>
        </div>
        {item.endDate && (
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/50 dark:text-white/50">{copy.endDate}</dt>
            <dd className="mt-1 font-semibold text-ink dark:text-white">{formatDate(item.endDate, language)}</dd>
          </div>
        )}
        {item.location && (
          <div>
            <dt className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/50 dark:text-white/50">
              <MapPin size={15} /> {copy.location}
            </dt>
            <dd className="mt-1 font-semibold text-ink dark:text-white">{item.location}</dd>
          </div>
        )}
      </dl>

      {item.description && <p className="mt-8 whitespace-pre-line text-lg leading-8 text-ink/75 dark:text-white/75">{item.description}</p>}

      {Array.isArray(item.galleryImages) && item.galleryImages.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink dark:text-white">{copy.gallery}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {item.galleryImages.map((image) => (
              <img key={image} src={mediaUrl(image)} alt={item.title} className="h-64 w-full rounded-lg object-cover shadow-sm" loading="lazy" />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {Array.isArray(item.participants) && item.participants.length > 0 && (
          <section className="rounded-lg bg-white p-5 ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
            <h2 className="inline-flex items-center gap-2 text-xl font-bold text-ink dark:text-white">
              <Users size={20} /> {copy.participants}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.participants.map((participant) => (
                <span key={participant} className="rounded-md bg-paper px-3 py-1.5 text-sm font-semibold text-ink/75 dark:bg-ink/40 dark:text-white/75">
                  {participant}
                </span>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(item.relatedFormations) && item.relatedFormations.length > 0 && (
          <section className="rounded-lg bg-white p-5 ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
            <h2 className="text-xl font-bold text-ink dark:text-white">{copy.relatedFormations}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.relatedFormations.map((formation) => (
                <span key={formation} className="rounded-md bg-craft/10 px-3 py-1.5 text-sm font-semibold text-craft dark:bg-clay/15 dark:text-clay">
                  {formation}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
