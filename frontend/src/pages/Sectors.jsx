import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { publicService } from '../services/publicService';

export function Sectors() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    publicService.getSectors().then(setItems);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Secteurs" title="Familles de métiers" description="Les formations sont organisées par domaines artisanaux." />
      <div className="mt-8">
        {!items ? (
          <LoadingState />
        ) : (
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
