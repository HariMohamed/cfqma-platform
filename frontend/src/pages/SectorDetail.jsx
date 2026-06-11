import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { publicService } from '../services/publicService';

export function SectorDetail() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    Promise.all([publicService.getSector(slug), publicService.getFormations()])
      .then(([sector, all]) =>
        setState({
          status: sector ? 'ready' : 'not-found',
          sector,
          formations: all.filter((formation) => formation.sector === slug)
        })
      )
      .catch(() => setState({ status: 'error' }));
  }, [slug]);

  if (state.status === 'loading') return <section className="mx-auto max-w-5xl px-4 py-16"><LoadingState /></section>;
  if (state.status !== 'ready') return <section className="mx-auto max-w-5xl px-4 py-16"><ErrorState label="Secteur introuvable." /></section>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <img src={state.sector.image} alt={state.sector.title} className="rounded-lg object-cover shadow-soft" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-craft">Secteur</p>
          <h1 className="mt-3 text-4xl font-bold">{state.sector.title}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/75">{state.sector.description}</p>
        </div>
      </div>
      <h2 className="mt-12 text-2xl font-bold">Formations du secteur</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {state.formations.map((item) => (
          <Card key={item.slug} to={`/formations/${item.slug}`} image={item.image} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  );
}
