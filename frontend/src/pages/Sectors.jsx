import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { publicService } from '../services/publicService';

export function Sectors() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    publicService
      .getSectors()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Secteurs" title="Familles de métiers" description="Les formations sont organisées par domaines artisanaux." />
      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState label="Impossible de charger les secteurs depuis le backend." />}
        {status === 'ready' && items.length === 0 && <EmptyState label="Aucun secteur publié pour le moment." />}
        {status === 'ready' && items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item) => (
              <Card key={item.slug} to={`/sectors/${item.slug}`} image={item.image} title={item.title} description={item.description} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
