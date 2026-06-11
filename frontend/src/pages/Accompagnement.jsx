import { useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, Handshake, Sprout } from 'lucide-react';
import { Button } from '../components/Button';
import { PartnerList } from '../components/PartnerList';
import { SectionHeader } from '../components/SectionHeader';
import { LoadingState } from '../components/StateBlock';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

const cardIcons = [BriefcaseBusiness, Sprout, Handshake];

export function Accompagnement() {
  const { language } = useI18n();
  const fallback = useMemo(() => buildFallbackContent(language), [language]);
  const [pageContent, setPageContent] = useState(null);
  const [contentStatus, setContentStatus] = useState('loading');
  const content = useMemo(() => mergeAccompagnementContent(fallback, pageContent, language), [fallback, pageContent, language]);

  useEffect(() => {
    let active = true;
    setContentStatus('loading');

    publicService
      .getPageContent('accompagnement', language)
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
          <img src="/images/CFMA-img7.jpg" alt="Accompagnement des lauréats CFQMA Salé" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35 dark:from-[#101712] dark:via-[#101712]/90" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">{content.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{content.hero.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{content.hero.description}</p>
          {content.hero.highlights.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {content.hero.highlights.map((item) => (
                <span key={item} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {contentStatus === 'loading' && (
          <div className="mb-8">
            <LoadingState label="Chargement du contenu d'accompagnement..." />
          </div>
        )}

        {contentStatus === 'fallback' && (
          <p className="mb-8 rounded-md bg-clay/15 p-4 text-sm font-semibold text-ink/70 dark:text-white/75">
            Contenu PageContent localisé indisponible. Affichage du contenu statique de secours.
          </p>
        )}

        <SectionHeader eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />

        {content.cards.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.cards.map((card, index) => {
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

        {content.actions.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.actions.map((action) => (
              <article key={action.title} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <h3 className="text-lg font-bold text-ink dark:text-white">{action.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-white/70">{action.description}</p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-lg bg-paper p-6 ring-1 ring-ink/5 dark:bg-white/5 dark:ring-white/10">
          <SectionHeader eyebrow={content.partners.eyebrow} title={content.partners.title} description={content.partners.description} />
          <div className="mt-8">
            <PartnerList />
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-ink p-6 text-white shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{content.cta.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{content.cta.description}</p>
          </div>
          <Button to="/contact" variant="secondary" className="mt-5 bg-white text-ink hover:bg-paper dark:bg-white dark:text-ink dark:hover:bg-paper md:mt-0">
            {content.cta.buttonLabel}
          </Button>
        </div>
      </main>
    </div>
  );
}

function buildFallbackContent(language) {
  const fallbacks = {
    fr: {
      hero: {
        eyebrow: 'Accompagnement',
        title: 'Accompagnement, insertion et suivi des lauréats',
        description:
          'Le CFQMA Salé accompagne les lauréats vers l’insertion professionnelle, l’orientation, l’entrepreneuriat et la création d’activités durables avec ses partenaires.',
        highlights: ['Insertion professionnelle', 'Orientation', 'Suivi des lauréats', 'Entrepreneuriat', 'Coaching', 'PIAE']
      },
      intro: {
        eyebrow: 'Parcours d’appui',
        title: 'Un accompagnement après la formation',
        description:
          'Le centre ne se limite pas à la formation. Il aide les lauréats à comprendre les opportunités, intégrer le marché du travail, créer une activité et rester accompagnés après la formation.'
      },
      cards: [
        { title: 'Insertion et orientation', description: 'Orientation des lauréats, préparation à l’emploi et suivi de leur intégration professionnelle.' },
        { title: 'Entrepreneuriat et coaching', description: 'Appui aux jeunes porteurs de projets, avec formation et coaching avant et après la création de l’activité.' },
        { title: 'Partenaires et ateliers', description: 'Ateliers avec ANAPEC, CIH Bank Salé, Banque Populaire Salé, ODCO, Maroc PME, GIZ et Fondation Mohammed V.' }
      ],
      actions: [
        { title: 'Insertion professionnelle', description: 'Accompagnement des lauréats vers le marché du travail et suivi de leur intégration professionnelle.' },
        { title: 'Orientation', description: 'Information, conseil et orientation vers les opportunités de formation, d’emploi ou de création d’activité.' },
        { title: 'Ateliers avec partenaires', description: 'Organisation d’ateliers avec ANAPEC, CIH Bank Salé, Banque Populaire Salé, ODCO, Maroc PME et GIZ.' },
        { title: 'Programme PIAE', description: 'Programme d’Insertion par les Activités Économiques pour appuyer les jeunes porteurs de projets.' },
        { title: 'Soutien sur deux ans', description: 'Accompagnement des jeunes porteurs de projets pendant deux ans, avant et après la création de leur activité.' },
        { title: 'Coaching avant et après création', description: 'Formation et coaching avant le lancement du projet, puis accompagnement après la création de l’activité.' },
        { title: 'Appui managérial', description: 'Accompagnement managérial par des professionnels, notamment Maroc PME et GIZ.' },
        { title: 'Équipement et activité durable', description: 'Appui de la Fondation Mohammed V à travers l’équipement et le développement d’activités économiques durables.' }
      ],
      partners: {
        eyebrow: 'Nos Partenaires / Collaborations',
        title: 'Un réseau d’appui pour les lauréats',
        description: 'Ces partenaires renforcent l’orientation, le financement, l’entrepreneuriat, la gestion et la création d’activités économiques durables.'
      },
      cta: {
        title: 'Vous avez un projet après la formation ?',
        description: 'Contactez le centre pour connaître les actions d’accompagnement disponibles et les ateliers avec les partenaires.',
        buttonLabel: 'Demander une orientation'
      }
    },
    ar: {
      hero: {
        eyebrow: 'المواكبة',
        title: 'المواكبة والإدماج وتتبع الخريجين',
        description:
          'يرافق مركز التكوين والتأهيل بسلا الخريجين نحو الإدماج المهني والتوجيه والمقاولة وإحداث أنشطة مستدامة بشراكة مع الفاعلين المؤسساتيين والاقتصاديين.',
        highlights: ['الإدماج المهني', 'التوجيه', 'تتبع الخريجين', 'المقاولة', 'التدريب والمواكبة', 'PIAE']
      },
      intro: {
        eyebrow: 'مسار الدعم',
        title: 'مواكبة بعد التكوين',
        description:
          'لا يقتصر دور المركز على التكوين فقط. فهو يساعد الخريجين على فهم الفرص، والولوج إلى سوق العمل، وإحداث نشاط اقتصادي، والاستفادة من المواكبة بعد نهاية التكوين.'
      },
      cards: [
        { title: 'الإدماج والتوجيه', description: 'توجيه الخريجين، إعدادهم لفرص الشغل، وتتبع اندماجهم المهني.' },
        { title: 'المقاولة والتدريب', description: 'دعم الشباب حاملي المشاريع بالتكوين والتدريب قبل وبعد إحداث النشاط.' },
        { title: 'الشركاء والورشات', description: 'ورشات مع أنابيك، CIH Bank Salé، Banque Populaire Salé، ODCO، Maroc PME، GIZ ومؤسسة محمد الخامس.' }
      ],
      actions: [
        { title: 'الإدماج المهني', description: 'مواكبة الخريجين نحو سوق العمل وتتبع اندماجهم المهني.' },
        { title: 'التوجيه', description: 'إعلام واستشارة وتوجيه نحو فرص التكوين أو الشغل أو إحداث النشاط.' },
        { title: 'ورشات مع الشركاء', description: 'تنظيم ورشات مع أنابيك، CIH Bank Salé، Banque Populaire Salé، ODCO، Maroc PME وGIZ.' },
        { title: 'برنامج PIAE', description: 'برنامج الإدماج عبر الأنشطة الاقتصادية لدعم الشباب حاملي المشاريع.' },
        { title: 'دعم لمدة سنتين', description: 'مواكبة الشباب حاملي المشاريع لمدة سنتين، قبل وبعد إحداث نشاطهم.' },
        { title: 'التدريب قبل وبعد الإحداث', description: 'تكوين وتدريب قبل إطلاق المشروع، ثم مواكبة بعد إحداث النشاط.' },
        { title: 'الدعم في التدبير', description: 'مواكبة في التدبير من طرف مهنيين، خاصة Maroc PME وGIZ.' },
        { title: 'التجهيز والنشاط المستدام', description: 'دعم مؤسسة محمد الخامس من خلال التجهيز وتطوير أنشطة اقتصادية مستدامة.' }
      ],
      partners: {
        eyebrow: 'شركاؤنا / التعاونات',
        title: 'شبكة دعم للخريجين',
        description: 'يعزز هؤلاء الشركاء التوجيه والتمويل والمقاولة والتدبير وإحداث أنشطة اقتصادية مستدامة.'
      },
      cta: {
        title: 'هل لديك مشروع بعد التكوين؟',
        description: 'اتصل بالمركز للتعرف على إجراءات المواكبة المتاحة والورشات المنظمة مع الشركاء.',
        buttonLabel: 'طلب توجيه'
      }
    },
    en: {
      hero: {
        eyebrow: 'Support',
        title: 'Graduate support, integration, and follow-up',
        description:
          'CFQMA Salé supports graduates with professional integration, guidance, entrepreneurship, and sustainable activity creation alongside institutional and economic partners.',
        highlights: ['Professional integration', 'Guidance', 'Graduate follow-up', 'Entrepreneurship', 'Coaching', 'PIAE']
      },
      intro: {
        eyebrow: 'Support pathway',
        title: 'Support after training',
        description:
          'The center does more than train. It helps graduates understand opportunities, enter the job market, create an activity, and remain supported after training.'
      },
      cards: [
        { title: 'Integration and guidance', description: 'Guidance for graduates, preparation for employment opportunities, and follow-up on professional integration.' },
        { title: 'Entrepreneurship and coaching', description: 'Support for young project holders, with training and coaching before and after business creation.' },
        { title: 'Partners and workshops', description: 'Workshops with ANAPEC, CIH Bank Salé, Banque Populaire Salé, ODCO, Maroc PME, GIZ, and Fondation Mohammed V.' }
      ],
      actions: [
        { title: 'Professional integration', description: 'Support for graduates entering the labor market and follow-up on their professional integration.' },
        { title: 'Guidance', description: 'Information, advice, and orientation toward training, employment, or business creation opportunities.' },
        { title: 'Partner workshops', description: 'Workshops organized with ANAPEC, CIH Bank Salé, Banque Populaire Salé, ODCO, Maroc PME, and GIZ.' },
        { title: 'PIAE program', description: 'Programme d’Insertion par les Activités Économiques supporting young project holders.' },
        { title: 'Two-year support', description: 'Support for young project holders over two years, before and after the creation of their activity.' },
        { title: 'Training and coaching before and after creation', description: 'Training and coaching before launching the project, followed by support after business creation.' },
        { title: 'Managerial support', description: 'Managerial support by professionals, especially Maroc PME and GIZ.' },
        { title: 'Equipment and sustainable activity', description: 'Fondation Mohammed V support through equipment and the development of sustainable economic activities.' }
      ],
      partners: {
        eyebrow: 'Partners / Collaborations',
        title: 'A support network for graduates',
        description: 'These partners strengthen guidance, financing, entrepreneurship, management, and sustainable economic activity creation.'
      },
      cta: {
        title: 'Do you have a project after training?',
        description: 'Contact the center to learn about available support actions and partner workshops.',
        buttonLabel: 'Request guidance'
      }
    }
  };

  return fallbacks[language] ?? fallbacks.fr;
}

function mergeAccompagnementContent(fallback, pageContent, language) {
  const sections =
    pageContent?.locale === language && !pageContent?.fallbackLocale && Array.isArray(pageContent.sections)
      ? pageContent.sections
      : [];
  const section = createSectionFinder(sections);
  const hero = section('hero', 'banner');
  const intro = section('intro', 'support', 'overview');
  const cards = section('cards', 'supportCards');
  const actions = section('actions', 'supportActions');
  const partners = section('partners', 'collaborations');
  const cta = section('cta');
  const ctaItems = normalizeCtaItems(cta?.items);

  return {
    hero: {
      eyebrow: text(hero?.subtitle, hero?.eyebrow, fallback.hero.eyebrow),
      title: text(hero?.title, fallback.hero.title),
      description: text(hero?.description, hero?.body, fallback.hero.description),
      highlights: normalizeStrings(hero?.items).length > 0 ? normalizeStrings(hero.items) : fallback.hero.highlights
    },
    intro: {
      eyebrow: text(intro?.subtitle, intro?.eyebrow, fallback.intro.eyebrow),
      title: text(intro?.title, fallback.intro.title),
      description: text(intro?.description, intro?.body, fallback.intro.description)
    },
    cards: normalizeCards(cards?.items).length > 0 ? normalizeCards(cards.items) : fallback.cards,
    actions: normalizeCards(actions?.items).length > 0 ? normalizeCards(actions.items) : fallback.actions,
    partners: {
      eyebrow: text(partners?.subtitle, partners?.eyebrow, fallback.partners.eyebrow),
      title: text(partners?.title, fallback.partners.title),
      description: text(partners?.description, partners?.body, fallback.partners.description)
    },
    cta: {
      title: text(cta?.title, fallback.cta.title),
      description: text(cta?.description, cta?.body, fallback.cta.description),
      buttonLabel: text(ctaItems.primaryLabel, fallback.cta.buttonLabel)
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
      if (item?.label) return String(item.label).trim();
      if (item?.description) return String(item.description).trim();
      return '';
    })
    .filter(Boolean);
}

function normalizeCards(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { title: item.trim(), description: '' };
      }

      if (item && typeof item === 'object') {
        return {
          title: String(item.title ?? item.label ?? '').trim(),
          description: String(item.description ?? item.body ?? item.value ?? '').trim()
        };
      }

      return null;
    })
    .filter((item) => item?.title);
}

function normalizeCtaItems(value) {
  if (!Array.isArray(value)) return {};

  return value.reduce((labels, item, index) => {
    const label = typeof item === 'string' ? item : item?.label ?? item?.title;
    if (!label) return labels;

    if (item?.type === 'primary' || index === 0) {
      return { ...labels, primaryLabel: String(label).trim() };
    }

    return labels;
  }, {});
}
