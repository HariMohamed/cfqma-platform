import { useEffect, useMemo, useState } from 'react';
import { PartnerList } from '../components/PartnerList';
import { SectionHeader } from '../components/SectionHeader';
import { LoadingState } from '../components/StateBlock';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

export function About() {
  const { t, language } = useI18n();
  const fallback = useMemo(() => buildFallbackContent(t), [t]);
  const [pageContent, setPageContent] = useState(null);
  const [contentStatus, setContentStatus] = useState('loading');
  const content = useMemo(() => mergeAboutContent(fallback, pageContent, language), [fallback, pageContent, language]);

  useEffect(() => {
    let active = true;
    setContentStatus('loading');

    publicService
      .getPageContent('about', language)
      .then((data) => {
        if (!active) return;
        setPageContent(data);
        setContentStatus(data?.fallbackLocale || data?.locale !== language ? 'fallback' : 'ready');
      })
      .catch(() => {
        if (!active) return;
        setPageContent(null);
        setContentStatus('fallback');
      });

    return () => {
      active = false;
    };
  }, [language]);

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img src="/images/page.jpg" alt="Centre CFQMA Sale" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45 dark:from-[#101712] dark:via-[#101712]/90" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">{content.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{content.hero.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{content.hero.description}</p>
          </div>
          {content.hero.facts.length > 0 && (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {content.hero.facts.map((fact) => (
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
        {contentStatus === 'loading' && (
          <div className="mb-8">
            <LoadingState label="Chargement du contenu depuis PageContent..." />
          </div>
        )}
        {contentStatus === 'fallback' && (
          <p className="mb-8 rounded-md bg-clay/15 p-4 text-sm font-semibold text-ink/70 dark:text-white/75">
            Contenu PageContent localise indisponible. Affichage du contenu statique de secours.
          </p>
        )}

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <img src="/images/page.jpg" alt="Centre CFQMA Sale" className="h-full min-h-72 rounded-lg object-cover shadow-soft" />
          <div>
            <SectionHeader
              eyebrow={content.presentation.eyebrow}
              title={content.presentation.title}
              description={content.presentation.description}
            />
            <p className="mt-6 leading-8 text-ink/75 dark:text-white/75">{content.presentation.body}</p>
            {content.presentation.facts.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {content.presentation.facts.map((fact) => (
                  <div key={`${fact.label}-${fact.value}`} className="rounded-md bg-white p-4 text-sm text-ink shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:text-white dark:ring-white/10">
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
            eyebrow={content.objectives.eyebrow}
            title={content.objectives.title}
            description={content.objectives.description}
          />
          {content.objectives.items.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.objectives.items.map((goal) => (
                <div key={goal} className="rounded-md bg-white p-4 text-sm font-medium text-ink shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:text-white dark:ring-white/10">
                  {goal}
                </div>
              ))}
            </div>
          )}
        </section>

        {content.trainingTypes.length > 0 && (
          <section className="mt-16 grid gap-6 lg:grid-cols-2">
            {content.trainingTypes.map((type) => (
              <article key={type.title} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <h2 className="text-2xl font-bold text-ink dark:text-white">{type.title}</h2>
                {type.description && <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{type.description}</p>}
                {type.points.length > 0 && (
                  <ul className="mt-5 grid gap-2 text-sm text-ink/75 dark:text-white/75">
                    {type.points.map((point) => (
                      <li key={point} className="rounded-md bg-paper px-3 py-2 dark:bg-white/10">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        <section className="mt-16">
          <SectionHeader
            eyebrow={content.partners.eyebrow}
            title={content.partners.title}
            description={content.partners.description}
          />
          <div className="mt-8">
            <PartnerList />
          </div>
        </section>
      </main>
    </div>
  );
}

function buildFallbackContent(t) {
  return {
    hero: {
      eyebrow: t('about.heroEyebrow'),
      title: t('about.heroTitle'),
      description: t('about.heroDescription'),
      facts: normalizeFacts(t('about.heroFacts'))
    },
    presentation: {
      eyebrow: t('about.presentationEyebrow'),
      title: t('about.presentationTitle'),
      description: t('about.presentationDescription'),
      body: t('about.presentationBody'),
      facts: normalizeFacts(t('about.centerFacts'))
    },
    objectives: {
      eyebrow: t('about.objectivesEyebrow'),
      title: t('about.objectivesTitle'),
      description: t('about.objectivesDescription'),
      items: normalizeStrings(t('about.objectives'))
    },
    trainingTypes: normalizeTrainingTypes(t('about.trainingTypes')),
    partners: {
      eyebrow: t('about.partnersEyebrow'),
      title: t('about.partnersTitle'),
      description: t('about.partnersDescription')
    }
  };
}

function mergeAboutContent(fallback, pageContent, language) {
  const sections =
    pageContent?.locale === language && !pageContent?.fallbackLocale && Array.isArray(pageContent.sections)
      ? pageContent.sections
      : [];
  const section = createSectionFinder(sections);
  const hero = section('hero', 'banner');
  const facts = section('facts', 'centerFacts', 'inaugurationFacts');
  const presentation = section('presentation', 'overview', 'centerPresentation');
  const objectives = section('objectives', 'goals');
  const training = section('training', 'trainingTypes', 'trainingModel');
  const partners = section('partners', 'collaborations');

  return {
    hero: {
      eyebrow: text(hero?.subtitle, hero?.eyebrow, fallback.hero.eyebrow),
      title: text(hero?.title, fallback.hero.title),
      description: text(hero?.description, hero?.body, fallback.hero.description),
      facts: normalizeFacts(hero?.items).length > 0 ? normalizeFacts(hero.items) : fallback.hero.facts
    },
    presentation: {
      eyebrow: text(presentation?.subtitle, presentation?.eyebrow, fallback.presentation.eyebrow),
      title: text(presentation?.title, fallback.presentation.title),
      description: text(presentation?.description, fallback.presentation.description),
      body: text(presentation?.body, fallback.presentation.body),
      facts: normalizeFacts(presentation?.items).length > 0 ? normalizeFacts(presentation.items) : normalizeFacts(facts?.items).length > 0 ? normalizeFacts(facts.items) : fallback.presentation.facts
    },
    objectives: {
      eyebrow: text(objectives?.subtitle, objectives?.eyebrow, fallback.objectives.eyebrow),
      title: text(objectives?.title, fallback.objectives.title),
      description: text(objectives?.description, objectives?.body, fallback.objectives.description),
      items: normalizeStrings(objectives?.items).length > 0 ? normalizeStrings(objectives.items) : fallback.objectives.items
    },
    trainingTypes: normalizeTrainingTypes(training?.items).length > 0 ? normalizeTrainingTypes(training.items) : fallback.trainingTypes,
    partners: {
      eyebrow: text(partners?.subtitle, partners?.eyebrow, fallback.partners.eyebrow),
      title: text(partners?.title, fallback.partners.title),
      description: text(partners?.description, partners?.body, fallback.partners.description)
    }
  };
}

function createSectionFinder(sections) {
  return (...keys) => {
    const normalizedKeys = keys.map(normalizeKey);
    return sections.find((section) => normalizedKeys.includes(normalizeKey(section.key)));
  };
}

function normalizeKey(value) {
  return String(value ?? '').toLowerCase().replace(/[\s_-]/g, '');
}

function text(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) ?? '';
}

function normalizeStrings(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item?.title) return String(item.title).trim();
      return '';
    })
    .filter(Boolean);
}

function normalizeFacts(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') {
        const [label, ...rest] = item.split(':');
        return rest.length > 0 ? { label: label.trim(), value: rest.join(':').trim() } : { label: '', value: item.trim() };
      }

      if (item && typeof item === 'object') {
        return {
          label: String(item.label ?? item.title ?? '').trim(),
          value: String(item.value ?? item.description ?? '').trim()
        };
      }

      return null;
    })
    .filter((item) => item?.label || item?.value);
}

function normalizeTrainingTypes(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { title: item.trim(), description: '', points: [] };
      }

      if (item && typeof item === 'object') {
        return {
          title: String(item.title ?? '').trim(),
          description: String(item.description ?? item.body ?? '').trim(),
          points: normalizeStrings(item.points ?? item.items)
        };
      }

      return null;
    })
    .filter((item) => item?.title);
}
