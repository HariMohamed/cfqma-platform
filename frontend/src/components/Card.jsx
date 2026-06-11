import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { mediaUrl } from '../utils/media';

export function Card({ to, image, title, description, meta }) {
  const { t } = useI18n();
  const content = (
    <article className="group h-full overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl dark:bg-white/10 dark:ring-white/10">
      {image && <img src={mediaUrl(image)} alt={title} className="h-48 w-full object-cover" loading="lazy" />}
      <div className="p-5">
        {meta && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-craft">{meta}</p>}
        <h3 className="mt-2 text-xl font-bold text-ink dark:text-white">{title}</h3>
        {description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/70 dark:text-white/70">{description}</p>}
        {to && (
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-moss dark:text-clay">
            {t('common.seeMore')} <ArrowRight size={16} />
          </span>
        )}
      </div>
    </article>
  );
  return to ? (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}
