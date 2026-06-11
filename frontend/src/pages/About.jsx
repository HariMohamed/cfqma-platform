import { PartnerList } from '../components/PartnerList';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../hooks/useI18n';

export function About() {
  const { t } = useI18n();
  const heroFacts = t('about.heroFacts');
  const centerFacts = t('about.centerFacts');
  const centerObjectives = t('about.objectives');
  const trainingTypes = t('about.trainingTypes');

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img src="/images/page.jpg" alt="Centre CFQMA Salé" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45 dark:from-[#101712] dark:via-[#101712]/90" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">{t('about.heroEyebrow')}</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{t('about.heroTitle')}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{t('about.heroDescription')}</p>
          </div>
          {Array.isArray(heroFacts) && (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {heroFacts.map((fact) => (
                <div key={`${fact.value}-${fact.label}`} className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                  <p className="text-2xl font-bold text-clay">{fact.value}</p>
                  <p className="mt-1 text-sm text-white/75">{fact.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <img src="/images/page.jpg" alt="Centre CFQMA Salé" className="h-full min-h-72 rounded-lg object-cover shadow-soft" />
          <div>
            <SectionHeader
              eyebrow={t('about.presentationEyebrow')}
              title={t('about.presentationTitle')}
              description={t('about.presentationDescription')}
            />
            <p className="mt-6 leading-8 text-ink/75 dark:text-white/75">{t('about.presentationBody')}</p>
            {Array.isArray(centerFacts) && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {centerFacts.map((fact) => (
                  <div key={fact.label} className="rounded-md bg-white p-4 text-sm text-ink shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:text-white dark:ring-white/10">
                    <span className="block font-semibold text-craft">{fact.label}</span>
                    <span className="mt-1 block font-medium">{fact.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader
            eyebrow={t('about.objectivesEyebrow')}
            title={t('about.objectivesTitle')}
            description={t('about.objectivesDescription')}
          />
          {Array.isArray(centerObjectives) && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {centerObjectives.map((goal) => (
                <div key={goal} className="rounded-md bg-white p-4 text-sm font-medium text-ink shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:text-white dark:ring-white/10">
                  {goal}
                </div>
              ))}
            </div>
          )}
        </section>

        {Array.isArray(trainingTypes) && (
          <section className="mt-16 grid gap-6 lg:grid-cols-2">
            {trainingTypes.map((type) => (
              <article key={type.title} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <h2 className="text-2xl font-bold text-ink dark:text-white">{type.title}</h2>
                <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{type.description}</p>
                <ul className="mt-5 grid gap-2 text-sm text-ink/75 dark:text-white/75">
                  {type.points.map((point) => (
                    <li key={point} className="rounded-md bg-paper px-3 py-2 dark:bg-white/10">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}

        <section className="mt-16">
          <SectionHeader
            eyebrow={t('about.partnersEyebrow')}
            title={t('about.partnersTitle')}
            description={t('about.partnersDescription')}
          />
          <div className="mt-8">
            <PartnerList />
          </div>
        </section>
      </main>
    </div>
  );
}
