import { useParams } from 'react-router-dom';
import { news } from '../data/seedData';
import { NotFound } from './NotFound';

export function NewsDetail() {
  const item = news.find((entry) => entry.slug === useParams().slug);
  if (!item) return <NotFound />;

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <img src={item.coverImage} alt={item.title} className="h-80 w-full rounded-lg object-cover shadow-soft" />
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-craft">{item.category}</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">{item.title}</h1>
      <p className="mt-6 text-lg leading-8 text-ink/75">{item.content}</p>
    </article>
  );
}
