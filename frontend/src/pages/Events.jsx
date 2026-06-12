import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';
import { mediaUrl } from '../utils/media';

const typeKeys = ['all', 'exhibition', 'event', 'workshop', 'announcement'];

const copies = {
  fr: {
    eyebrow: 'Expositions / Événements',
    title: 'Vie du centre et valorisation des métiers',
    description: 'Expositions, ateliers et événements où les apprentis et artisans présentent leurs réalisations.',
    loading: 'Chargement des événements...',
    error: 'Impossible de charger les événements depuis le backend.',
    empty: 'Aucun événement publié pour le moment.',
    all: 'Tous',
    date: 'Date',
    location: 'Lieu',
    seeDetails: 'Voir les détails',
    types: {
      exhibition: 'Exposition',
      event: 'Événement',
      workshop: 'Atelier',
      announcement: 'Annonce'
    }
  },
  ar: {
    eyebrow: 'المعارض / الأحداث',
    title: 'حياة المركز وتثمين المهن',
    description: 'معارض وورشات وأحداث يقدم فيها المتدرجون والحرفيون أعمالهم ومنتجاتهم اليدوية.',
    loading: 'جار تحميل الأحداث...',
    error: 'تعذر تحميل الأحداث من الخادم.',
    empty: 'لا يوجد أي حدث منشور حاليا.',
    all: 'الكل',
    date: 'التاريخ',
    location: 'المكان',
    seeDetails: 'عرض التفاصيل',
    types: {
      exhibition: 'معرض',
      event: 'حدث',
      workshop: 'ورشة',
      announcement: 'إعلان'
    }
  },
  en: {
    eyebrow: 'Exhibitions / Events',
    title: 'Center life and craft promotion',
    description: 'Exhibitions, workshops, and events where apprentices and artisans present their handmade work.',
    loading: 'Loading events...',
    error: 'Unable to load events from the backend.',
    empty: 'No published event is available yet.',
    all: 'All',
    date: 'Date',
    location: 'Location',
    seeDetails: 'View details',
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

export function Events() {
  const { language } = useI18n();
  const copy = useMemo(() => copies[language] ?? copies.fr, [language]);
  const [items, setItems] = useState([]);
  const [activeType, setActiveType] = useState('all');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    publicService
      .getEvents()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const filteredItems = activeType === 'all' ? items : items.filter((item) => item.type === activeType);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <div className="mt-8 flex flex-wrap gap-2">
        {typeKeys.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeType === type
                ? 'bg-moss text-white shadow-sm'
                : 'bg-white text-ink ring-1 ring-ink/10 hover:bg-paper dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/15'
            }`}
          >
            {type === 'all' ? copy.all : getTypeLabel(type, copy)}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {status === 'loading' && <LoadingState label={copy.loading} />}
        {status === 'error' && <ErrorState label={copy.error} />}
        {status === 'ready' && filteredItems.length === 0 && <EmptyState label={copy.empty} />}
        {status === 'ready' && filteredItems.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Link key={item.slug} to={`/events/${item.slug}`} className="group block h-full">
                <article className="h-full overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl dark:bg-white/10 dark:ring-white/10">
                  {item.coverImage && <img src={mediaUrl(item.coverImage)} alt={item.title} className="h-52 w-full object-cover" loading="lazy" />}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-craft/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-craft dark:bg-clay/15 dark:text-clay">
                        {getTypeLabel(item.type, copy)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink/55 dark:text-white/60">
                        <CalendarDays size={14} /> {formatDate(item.date, language)}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-ink dark:text-white">{item.title}</h2>
                    {item.location && (
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink/60 dark:text-white/60">
                        <MapPin size={15} /> {item.location}
                      </p>
                    )}
                    {item.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/70 dark:text-white/70">{item.excerpt}</p>}
                    <span className="mt-4 inline-flex text-sm font-semibold text-moss dark:text-clay">{copy.seeDetails}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
