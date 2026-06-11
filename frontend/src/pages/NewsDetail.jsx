import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { publicService } from '../services/publicService';
import { mediaUrl } from '../utils/media';
import { NotFound } from './NotFound';

export function NewsDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    publicService
      .getNewsItem(slug)
      .then((data) => {
        setItem(data);
        setStatus(data ? 'ready' : 'not-found');
      })
      .catch((error) => {
        setStatus(error.response?.status === 404 ? 'not-found' : 'error');
      });
  }, [slug]);

  if (status === 'loading') return <section className="mx-auto max-w-4xl px-4 py-16"><LoadingState label="Chargement de l'actualité..." /></section>;
  if (status === 'not-found') return <NotFound />;
  if (status === 'error') return <section className="mx-auto max-w-4xl px-4 py-16"><ErrorState label="Impossible de charger cette actualité depuis le backend." /></section>;

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {item.coverImage && <img src={mediaUrl(item.coverImage)} alt={item.title} className="h-80 w-full rounded-lg object-cover shadow-soft" />}
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-craft">{item.category}</p>
      <h1 className="mt-3 text-4xl font-bold text-ink dark:text-white">{item.title}</h1>
      <p className="mt-6 whitespace-pre-line text-lg leading-8 text-ink/75 dark:text-white/75">{item.content}</p>
    </article>
  );
}
