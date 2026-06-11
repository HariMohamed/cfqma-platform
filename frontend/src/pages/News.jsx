import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { publicService } from '../services/publicService';

export function News() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    publicService
      .getNews()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Actualités" title="News et activités" description="Articles et activités du centre publiés depuis MongoDB." />
      <div className="mt-8">
        {status === 'loading' && <LoadingState label="Chargement des actualités..." />}
        {status === 'error' && <ErrorState label="Impossible de charger les actualités depuis le backend." />}
        {status === 'ready' && items.length === 0 && <EmptyState label="Aucune actualité publiée pour le moment." />}
        {status === 'ready' && items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item) => (
              <Card key={item.slug} to={`/news/${item.slug}`} image={item.coverImage} title={item.title} description={item.excerpt} meta={item.category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
