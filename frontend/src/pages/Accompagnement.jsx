import { BriefcaseBusiness, Handshake, Sprout } from 'lucide-react';
import { Button } from '../components/Button';
import { PartnerList } from '../components/PartnerList';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../hooks/useI18n';

const cardIcons = [BriefcaseBusiness, Sprout, Handshake];

export function Accompagnement() {
  const { t } = useI18n();
  const heroHighlights = t('accompaniment.heroHighlights');
  const supportCards = t('accompaniment.cards');
  const actions = t('accompaniment.actions');

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img src="/images/CFMA-img7.jpg" alt="Accompagnement des lauréats CFQMA Salé" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35 dark:from-[#101712] dark:via-[#101712]/90" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">{t('accompaniment.heroEyebrow')}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{t('accompaniment.heroTitle')}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{t('accompaniment.heroDescription')}</p>
          {Array.isArray(heroHighlights) && (
            <div className="mt-8 flex flex-wrap gap-2">
              {heroHighlights.map((item) => (
                <span key={item} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t('accompaniment.introEyebrow')}
          title={t('accompaniment.introTitle')}
          description={t('accompaniment.introDescription')}
        />

        {Array.isArray(supportCards) && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {supportCards.map((card, index) => {
              const Icon = cardIcons[index] ?? Handshake;
              return (
                <article key={card.title} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                  <Icon className="text-craft" />
                  <h2 className="mt-4 text-xl font-bold text-ink dark:text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-white/70">{card.description}</p>
                </article>
              );
            })}
          </div>
        )}

        {Array.isArray(actions) && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {actions.map((action) => (
              <article key={action.title} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <h3 className="text-lg font-bold text-ink dark:text-white">{action.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-white/70">{action.description}</p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-lg bg-paper p-6 ring-1 ring-ink/5 dark:bg-white/5 dark:ring-white/10">
          <SectionHeader
            eyebrow={t('accompaniment.partnersEyebrow')}
            title={t('accompaniment.partnersTitle')}
            description={t('accompaniment.partnersDescription')}
          />
          <div className="mt-8">
            <PartnerList />
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-ink p-6 text-white shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t('accompaniment.ctaTitle')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{t('accompaniment.ctaDescription')}</p>
          </div>
          <Button to="/contact" variant="secondary" className="mt-5 bg-white text-ink hover:bg-paper dark:bg-white dark:text-ink dark:hover:bg-paper md:mt-0">
            {t('accompaniment.ctaButton')}
          </Button>
        </div>
      </main>
    </div>
  );
}
