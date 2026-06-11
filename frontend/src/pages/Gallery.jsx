import { useEffect, useState } from 'react';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';
import { mediaUrl } from '../utils/media';

export function Gallery() {
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    publicService
      .getGallery()
      .then((data) => {
        setItems(data.filter((item) => item.isPublished !== false));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={t('galleryPage.eyebrow')} title={t('galleryPage.title')} description={t('galleryPage.description')} />

      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && items.length === 0 && <EmptyState label={t('galleryPage.empty')} />}
        {status === 'ready' && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={`${item.title}-${item.imageUrl}`} className="overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <img src={mediaUrl(item.imageUrl)} alt={item.alt || item.title} className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-craft">{item.category}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink dark:text-white">{item.title}</h2>
                  {item.description && <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-white/70">{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
