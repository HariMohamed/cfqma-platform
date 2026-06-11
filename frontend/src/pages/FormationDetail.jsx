import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { publicService } from '../services/publicService';

export function FormationDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    publicService
      .getFormation(slug)
      .then((data) => {
        setItem(data);
        setStatus(data ? 'ready' : 'not-found');
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  if (status === 'loading') return <section className="mx-auto max-w-5xl px-4 py-16"><LoadingState /></section>;
  if (status === 'error') return <section className="mx-auto max-w-5xl px-4 py-16"><ErrorState /></section>;
  if (status === 'not-found') return <section className="mx-auto max-w-5xl px-4 py-16"><ErrorState label="Formation introuvable." /></section>;

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <img src={item.image} alt={item.title} className="rounded-lg object-cover shadow-soft" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-craft">
            {item.type} - {item.level}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-ink">{item.title}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/75">{item.description}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4 shadow-sm">
              <dt className="text-sm text-ink/50">Durée</dt>
              <dd className="font-semibold">{item.duration}</dd>
            </div>
            <div className="rounded-md bg-white p-4 shadow-sm">
              <dt className="text-sm text-ink/50">Secteur</dt>
              <dd className="font-semibold">{item.sector}</dd>
            </div>
          </dl>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <List title="Conditions" items={item.requirements} />
            <List title="Compétences" items={item.skills} />
            <List title="Débouchés" items={item.opportunities} />
          </div>
          <div className="mt-8">
            <Button to="/pre-registration">Demander une pré-inscription</Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function List({ title, items = [] }) {
  return (
    <div>
      <h2 className="font-bold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-ink/70">
        {items.map((value) => (
          <li key={value}>- {value}</li>
        ))}
      </ul>
    </div>
  );
}
