import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { mainTrainingFields, trainingLevels, trainingTypes } from '../data/seedData';
import { publicService } from '../services/publicService';

export function Formations() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    publicService
      .getFormations()
      .then((data) => {
        setItems(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Formations" title="Toutes les formations" description="Explorez les parcours du centre par secteur, niveau et opportunités." />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {trainingTypes.map((type) => (
          <article key={type.title} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/5">
            <h2 className="text-2xl font-bold">{type.title}</h2>
            <p className="mt-3 leading-7 text-ink/70">{type.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {type.points.map((point) => (
                <span key={point} className="rounded-md bg-paper px-3 py-1.5 text-sm font-medium text-ink">
                  {point}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg bg-ink p-6 text-white shadow-soft">
          <h2 className="text-2xl font-bold">Niveaux</h2>
          <div className="mt-5 grid gap-3">
            {trainingLevels.map((level) => (
              <div key={level.code} className="rounded-md bg-white/10 p-4">
                <p className="text-xl font-bold text-clay">{level.code}</p>
                <p className="mt-1 text-sm text-white/75">{level.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/5">
          <h2 className="text-2xl font-bold">Principales filières</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {mainTrainingFields.map((field) => (
              <span key={field} className="rounded-md bg-paper px-3 py-2 text-sm font-medium text-ink">
                {field}
              </span>
            ))}
          </div>
          <Button to="/admission" variant="secondary" className="mt-6">
            Voir les conditions d admission
          </Button>
        </div>
      </div>

      <div className="mt-8">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState />}
        {status === 'ready' && items.length === 0 && <EmptyState />}
        {status === 'ready' && items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.slug} to={`/formations/${item.slug}`} image={item.image} title={item.title} description={item.description} meta={item.sector} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
