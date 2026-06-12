import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ClipboardEdit, GraduationCap, Handshake, Images, Newspaper } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

export function Home() {
  const { language } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const fallback = useMemo(() => buildFallbackContent(language), [language]);
  const [pageContent, setPageContent] = useState(null);
  const [contentStatus, setContentStatus] = useState('loading');
  const [backendData, setBackendData] = useState({ formations: [], sectors: [], news: [] });
  const [backendStatus, setBackendStatus] = useState('loading');
  const [events, setEvents] = useState([]);
  const [eventsStatus, setEventsStatus] = useState('loading');
  const content = useMemo(() => mergeHomeContent(fallback, pageContent, language), [fallback, pageContent, language]);
  const eventsCopy = useMemo(() => getHomeEventsCopy(language), [language]);

  useEffect(() => {
    let active = true;
    setContentStatus('loading');

    publicService
      .getPageContent('home', language)
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

  useEffect(() => {
    Promise.all([publicService.getFormations(), publicService.getSectors(), publicService.getNews()])
      .then(([formations, sectors, news]) => {
        setBackendData({ formations, sectors, news });
        setBackendStatus('ready');
      })
      .catch(() => setBackendStatus('error'));
  }, []);

  useEffect(() => {
    setEventsStatus('loading');
    publicService
      .getEvents()
      .then((data) => {
        setEvents(data);
        setEventsStatus('ready');
      })
      .catch(() => setEventsStatus('error'));
  }, []);

  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img src="/images/page.jpg" alt="Façade du CFQMA Salé" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#071d2b]/95 via-[#12382d]/82 to-[#12382d]/45 dark:from-[#06120f]/96 dark:via-[#0b231c]/88" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#12382d] to-transparent" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-clay">{content.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{content.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">{content.hero.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/formations" className="bg-clay text-ink hover:bg-white">
                {content.hero.formationsCta} <ArrowRight size={18} />
              </Button>
              <Button to="/pre-registration" variant="secondary" className="bg-white text-ink hover:bg-paper">
                <ClipboardEdit size={18} /> {content.hero.registrationCta}
              </Button>
              <Button to="/contact" variant="secondary" className="bg-white/10 text-white ring-white/20 hover:bg-white/20 dark:bg-white/10 dark:text-white">
                {content.hero.contactCta}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#12382d] py-10 text-white dark:bg-[#0b231c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PartnerMarquee tone="green" showNames />
        </div>
      </section>

      <section className="bg-[#12382d] pb-10 text-white dark:bg-[#0b231c]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {content.stats.map((item) => (
            <div key={`${item.label}-${item.value}`} className="rounded-lg bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur">
              <p className="text-3xl font-bold text-clay">{item.value}</p>
              <p className="mt-2 text-sm text-white/75">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {contentStatus === 'loading' && (
          <div className="mb-8">
            <LoadingState label="Chargement du contenu de la page d'accueil..." />
          </div>
        )}

        {contentStatus === 'fallback' && (
          <p className="mb-8 rounded-md bg-clay/15 p-4 text-sm font-semibold text-ink/70 dark:text-white/75">
            Contenu PageContent localisé indisponible. Affichage du contenu statique de secours.
          </p>
        )}

        <SectionHeader eyebrow={content.center.eyebrow} title={content.center.title} description={content.center.description} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.center.facts.map((fact) => (
            <div key={`${fact.label}-${fact.value}`} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-craft">{fact.label}</p>
              <p className="mt-2 text-lg font-bold text-ink dark:text-white">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={content.training.eyebrow} title={content.training.title} description={content.training.description} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {content.training.types.map((type) => (
              <article key={type.title} className="rounded-lg bg-paper p-6 ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <h3 className="text-2xl font-bold text-ink dark:text-white">{type.title}</h3>
                <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{type.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {type.points.map((point) => (
                    <span key={point} className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm dark:bg-white/10 dark:text-white">
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={content.formations.eyebrow} title={content.formations.title} description={content.formations.description} />
        <BackendCardGrid
          status={backendStatus}
          items={backendData.formations.slice(0, 6)}
          empty="Aucune formation publiée pour le moment."
          render={(item) => <Card key={item.slug} to={`/formations/${item.slug}`} image={item.image} title={item.title} description={item.description} meta={item.type} />}
        />
      </section>

      <section className="bg-white py-16 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={content.sectors.eyebrow} title={content.sectors.title} description={content.sectors.description} />
          <BackendCardGrid
            status={backendStatus}
            items={backendData.sectors}
            empty="Aucun secteur publié pour le moment."
            render={(item) => <Card key={item.slug} to={`/sectors/${item.slug}`} image={item.image} title={item.title} description={item.description} />}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader eyebrow={content.news.eyebrow} title={content.news.title} description={content.news.description} />
            <div className="mt-6 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <Newspaper size={18} /> <span>{content.featureLinks.news}</span>
            </div>
            <div className="mt-3 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <Images size={18} /> <span>{content.featureLinks.gallery}</span>
            </div>
            <div className="mt-3 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <GraduationCap size={18} /> <span>{content.featureLinks.management}</span>
            </div>
            <div className="mt-3 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <Handshake size={18} /> <span>{content.featureLinks.accompaniment}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/accompagnement" variant="secondary">
                {content.featureLinks.accompanimentCta}
              </Button>
              <Button to="/admission" variant="ghost">
                {content.featureLinks.admissionCta}
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {backendStatus === 'loading' && <LoadingState />}
            {backendStatus === 'error' && <ErrorState label="Impossible de charger les actualités depuis le backend." />}
            {backendStatus === 'ready' && backendData.news.length === 0 && <EmptyState label="Aucune actualité publiée pour le moment." />}
            {backendStatus === 'ready' &&
              backendData.news.slice(0, 2).map((item) => (
                <Card key={item.slug} to={`/news/${item.slug}`} image={item.coverImage} title={item.title} description={item.excerpt} meta={item.category} />
              ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={eventsCopy.eyebrow} title={eventsCopy.title} description={eventsCopy.description} />
          <BackendCardGrid
            status={eventsStatus}
            items={events.slice(0, 3)}
            empty={eventsCopy.empty}
            render={(item) => (
              <Card
                key={item.slug}
                to={`/events/${item.slug}`}
                image={item.coverImage}
                title={item.title}
                description={item.excerpt}
                meta={`${eventsCopy.types[item.type] ?? item.type} · ${formatHomeDate(item.date, language)}`}
              />
            )}
          />
          <div className="mt-8">
            <Button to="/events" variant="secondary">
              {eventsCopy.cta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function BackendCardGrid({ status, items, render, empty }) {
  return (
    <div className="mt-8">
      {status === 'loading' && <LoadingState />}
      {status === 'error' && <ErrorState label="Impossible de charger les données depuis le backend." />}
      {status === 'ready' && items.length === 0 && <EmptyState label={empty} />}
      {status === 'ready' && items.length > 0 && <div className="grid gap-6 md:grid-cols-3">{items.map(render)}</div>}
    </div>
  );
}

function getHomeEventsCopy(language) {
  const copies = {
    fr: {
      eyebrow: 'Expositions / Événements',
      title: 'Produits, savoir-faire et vie du centre',
      description: 'Découvrez les expositions, ateliers et événements organisés autour des apprentis et artisans.',
      empty: 'Aucun événement publié pour le moment.',
      cta: 'Voir tous les événements',
      types: {
        exhibition: 'Exposition',
        event: 'Événement',
        workshop: 'Atelier',
        announcement: 'Annonce'
      }
    },
    ar: {
      eyebrow: 'المعارض / الأحداث',
      title: 'المنتجات والمهارات وحياة المركز',
      description: 'اكتشف المعارض والورشات والأحداث المنظمة حول المتدرجين والحرفيين.',
      empty: 'لا يوجد أي حدث منشور حاليا.',
      cta: 'عرض كل الأحداث',
      types: {
        exhibition: 'معرض',
        event: 'حدث',
        workshop: 'ورشة',
        announcement: 'إعلان'
      }
    },
    en: {
      eyebrow: 'Exhibitions / Events',
      title: 'Products, know-how, and center life',
      description: 'Discover exhibitions, workshops, and events organized around apprentices and artisans.',
      empty: 'No published event is available yet.',
      cta: 'View all events',
      types: {
        exhibition: 'Exhibition',
        event: 'Event',
        workshop: 'Workshop',
        announcement: 'Announcement'
      }
    }
  };

  return copies[language] ?? copies.fr;
}

function formatHomeDate(value, language) {
  if (!value) return '';
  const locale = language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-US' : 'fr-FR';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function buildFallbackContent(language) {
  const fallbacks = {
    fr: {
      hero: {
        eyebrow: 'CFQMA Salé',
        title: 'Former, qualifier et accompagner les talents de l’artisanat.',
        description:
          'Centre de Formation et de Qualification dans les Métiers d’Artisanat à Salé, dédié à l’apprentissage pratique, à la formation continue et à l’insertion professionnelle.',
        formationsCta: 'Découvrir nos formations',
        registrationCta: 'Pré-inscription',
        contactCta: 'Contact'
      },
      stats: [
        { label: 'Capacité d’accueil', value: '300' },
        { label: 'Pratique en apprentissage', value: '80%' },
        { label: 'Jeunes ciblés', value: '15–30' },
        { label: 'Investissement', value: '13 MDH' }
      ],
      center: {
        eyebrow: 'Centre',
        title: 'Repères institutionnels',
        description: 'Le CFQMA Salé est conçu pour qualifier les jeunes, accompagner les lauréats et soutenir la sauvegarde des métiers d’artisanat.',
        facts: [
          { label: 'Inauguration', value: '28 juillet 2012 / 8 Ramadan 1433' },
          { label: 'Financement', value: 'Fondation Mohammed V pour la Solidarité' },
          { label: 'Investissement', value: '13 millions MAD' },
          { label: 'Capacité', value: '300 apprentis' },
          { label: 'Public cible', value: 'Jeunes de 15 à 30 ans' },
          { label: 'Modèle pédagogique', value: '80% pratique / 20% théorie' }
        ]
      },
      training: {
        eyebrow: 'Parcours',
        title: 'Formation initiale et formation continue',
        description: 'Deux approches complémentaires: qualifier les jeunes par apprentissage et renforcer les compétences des artisans de la région.',
        types: [
          {
            title: 'Formation Initiale',
            description: 'Formation par apprentissage destinée aux jeunes, avec un modèle basé sur 80% de pratique et 20% de théorie.',
            points: ['Formation par apprentissage', '80% pratique', '20% théorique', 'Insertion sociale et économique']
          },
          {
            title: 'Formation Continue',
            description: 'Parcours destinés aux artisans de la région Rabat-Salé-Kénitra pour renforcer les compétences et développer le produit artisanal.',
            points: ['Artisans de la région Rabat-Salé-Kénitra', 'Renforcement des compétences', 'Développement du produit artisanal']
          }
        ]
      },
      formations: {
        eyebrow: 'Formations',
        title: 'Parcours de qualification',
        description: 'Des formations orientées pratique pour construire des compétences directement utiles en atelier et sur le marché.'
      },
      sectors: {
        eyebrow: 'Secteurs',
        title: 'Six familles de métiers',
        description: 'Une organisation claire par secteur pour explorer les savoir-faire du centre.'
      },
      news: {
        eyebrow: 'Actualités',
        title: 'Vie du centre',
        description: 'Suivez les activités, ateliers et actions d’accompagnement.'
      },
      featureLinks: {
        news: 'Actualités et activités alimentées depuis MongoDB.',
        gallery: 'Galerie publique et administrable.',
        management: 'Gestion des formations et inscriptions.',
        accompaniment: 'Accompagnement des lauréats et insertion professionnelle.',
        accompanimentCta: 'Découvrir l’accompagnement',
        admissionCta: 'Admission'
      }
    },
    ar: {
      hero: {
        eyebrow: 'مركز التكوين والتأهيل بسلا',
        title: 'تكوين وتأهيل ومواكبة كفاءات الصناعة التقليدية.',
        description: 'مركز التكوين والتأهيل في مهن الصناعة التقليدية بسلا، مخصص للتعلم التطبيقي والتكوين المستمر والإدماج المهني.',
        formationsCta: 'اكتشف التكوينات',
        registrationCta: 'التسجيل الأولي',
        contactCta: 'اتصل بنا'
      },
      stats: [
        { label: 'الطاقة الاستيعابية', value: '300' },
        { label: 'تطبيق في التكوين بالتدرج', value: '80%' },
        { label: 'الفئة العمرية المستهدفة', value: '15–30' },
        { label: 'الاستثمار', value: '13 MDH' }
      ],
      center: {
        eyebrow: 'المركز',
        title: 'معطيات مؤسساتية',
        description: 'يهدف مركز التكوين والتأهيل بسلا إلى تأهيل الشباب ومواكبة الخريجين والحفاظ على مهارات الصناعة التقليدية.',
        facts: [
          { label: 'الافتتاح', value: '28 يوليوز 2012 / 8 رمضان 1433' },
          { label: 'التمويل', value: 'مؤسسة محمد الخامس للتضامن' },
          { label: 'الاستثمار', value: '13 مليون درهم' },
          { label: 'الطاقة الاستيعابية', value: '300 متدرج' },
          { label: 'الفئة المستهدفة', value: 'الشباب من 15 إلى 30 سنة' },
          { label: 'النموذج البيداغوجي', value: '80% تطبيق / 20% نظري' }
        ]
      },
      training: {
        eyebrow: 'المسارات',
        title: 'التكوين الأولي والتكوين المستمر',
        description: 'مقاربتان متكاملتان: تأهيل الشباب بالتدرج وتقوية كفاءات الحرفيين في الجهة.',
        types: [
          {
            title: 'التكوين الأولي',
            description: 'تكوين بالتدرج موجه للشباب، يعتمد على نموذج يقوم على 80% من التطبيق و20% من الجانب النظري.',
            points: ['التكوين بالتدرج', '80% تطبيق', '20% نظري', 'إدماج اجتماعي واقتصادي']
          },
          {
            title: 'التكوين المستمر',
            description: 'مسارات موجهة لحرفيي جهة الرباط-سلا-القنيطرة من أجل تقوية الكفاءات وتطوير المنتوج التقليدي.',
            points: ['حرفيو جهة الرباط-سلا-القنيطرة', 'تقوية الكفاءات', 'تطوير المنتوج التقليدي']
          }
        ]
      },
      formations: {
        eyebrow: 'التكوينات',
        title: 'مسارات التأهيل',
        description: 'تكوينات عملية لبناء كفاءات مفيدة مباشرة داخل الورش وسوق العمل.'
      },
      sectors: {
        eyebrow: 'الشعب',
        title: 'ست عائلات مهنية',
        description: 'تنظيم واضح حسب المجال لاستكشاف مهارات المركز.'
      },
      news: {
        eyebrow: 'المستجدات',
        title: 'حياة المركز',
        description: 'تابعوا الأنشطة والورشات وبرامج المواكبة.'
      },
      featureLinks: {
        news: 'مستجدات وأنشطة مرتبطة بقاعدة MongoDB.',
        gallery: 'رواق عمومي قابل للتدبير.',
        management: 'تدبير التكوينات والتسجيلات.',
        accompaniment: 'مواكبة الخريجين والإدماج المهني.',
        accompanimentCta: 'اكتشف المواكبة',
        admissionCta: 'القبول'
      }
    },
    en: {
      hero: {
        eyebrow: 'CFQMA Salé',
        title: 'Training, qualifying, and supporting craft talent.',
        description:
          'Centre de Formation et de Qualification dans les Métiers d’Artisanat in Salé, dedicated to practical apprenticeship, continuing training, and professional integration.',
        formationsCta: 'Discover training programs',
        registrationCta: 'Pre-registration',
        contactCta: 'Contact'
      },
      stats: [
        { label: 'Training capacity', value: '300' },
        { label: 'Practice-based apprenticeship', value: '80%' },
        { label: 'Target age group', value: '15–30' },
        { label: 'Investment', value: 'MAD 13M' }
      ],
      center: {
        eyebrow: 'Center',
        title: 'Institutional facts',
        description: 'CFQMA Salé is designed to qualify young people, support graduates, and preserve craft skills.',
        facts: [
          { label: 'Inauguration', value: '28 July 2012 / 8 Ramadan 1433' },
          { label: 'Financing', value: 'Fondation Mohammed V pour la Solidarité' },
          { label: 'Investment', value: 'MAD 13 million' },
          { label: 'Capacity', value: '300 apprentices' },
          { label: 'Target audience', value: 'Young people aged 15 to 30' },
          { label: 'Training model', value: '80% practice / 20% theory' }
        ]
      },
      training: {
        eyebrow: 'Pathways',
        title: 'Initial training and continuing training',
        description: 'Two complementary approaches: qualifying young people through apprenticeship and strengthening the skills of regional artisans.',
        types: [
          {
            title: 'Initial Training',
            description: 'Apprenticeship training for young people, based on a model of 80% practice and 20% theory.',
            points: ['Apprenticeship training', '80% practice', '20% theory', 'Social and economic integration']
          },
          {
            title: 'Continuing Training',
            description: 'Training pathways for artisans in the Rabat-Salé-Kénitra region to strengthen skills and develop craft products.',
            points: ['Artisans from Rabat-Salé-Kénitra', 'Skills development', 'Craft product development']
          }
        ]
      },
      formations: {
        eyebrow: 'Training',
        title: 'Qualification pathways',
        description: 'Practice-oriented programs that build skills directly useful in workshops and on the labor market.'
      },
      sectors: {
        eyebrow: 'Sectors',
        title: 'Six craft families',
        description: 'A clear sector-based structure for exploring the center’s areas of know-how.'
      },
      news: {
        eyebrow: 'News',
        title: 'Center life',
        description: 'Follow activities, workshops, and support initiatives.'
      },
      featureLinks: {
        news: 'News and activities powered by MongoDB.',
        gallery: 'Public and admin-ready gallery.',
        management: 'Training and registration management.',
        accompaniment: 'Graduate support and professional integration.',
        accompanimentCta: 'Discover support services',
        admissionCta: 'Admission'
      }
    }
  };

  return fallbacks[language] ?? fallbacks.fr;
}

function mergeHomeContent(fallback, pageContent, language) {
  const sections =
    pageContent?.locale === language && !pageContent?.fallbackLocale && Array.isArray(pageContent.sections)
      ? pageContent.sections
      : [];
  const section = createSectionFinder(sections);
  const hero = section('hero', 'banner');
  const heroCtas = normalizeCtaItems(hero?.items);
  const stats = section('stats', 'figures', 'keyFigures');
  const center = section('center', 'facts', 'institutionalFacts');
  const training = section('training', 'trainingTypes', 'trainingModel');
  const formations = section('formations');
  const sectors = section('sectors');
  const news = section('news', 'actualites');
  const featureLinks = section('featureLinks', 'features', 'readyBlocks');

  return {
    hero: {
      eyebrow: text(hero?.subtitle, hero?.eyebrow, fallback.hero.eyebrow),
      title: text(hero?.title, fallback.hero.title),
      description: text(hero?.description, hero?.body, fallback.hero.description),
      formationsCta: text(heroCtas.primaryLabel, fallback.hero.formationsCta),
      registrationCta: text(heroCtas.secondaryLabel, fallback.hero.registrationCta),
      contactCta: text(heroCtas.tertiaryLabel, fallback.hero.contactCta)
    },
    stats: normalizeFacts(stats?.items).length > 0 ? normalizeFacts(stats.items) : fallback.stats,
    center: {
      eyebrow: text(center?.subtitle, center?.eyebrow, fallback.center.eyebrow),
      title: text(center?.title, fallback.center.title),
      description: text(center?.description, center?.body, fallback.center.description),
      facts: normalizeFacts(center?.items).length > 0 ? normalizeFacts(center.items) : fallback.center.facts
    },
    training: {
      eyebrow: text(training?.subtitle, training?.eyebrow, fallback.training.eyebrow),
      title: text(training?.title, fallback.training.title),
      description: text(training?.description, training?.body, fallback.training.description),
      types: normalizeTrainingTypes(training?.items).length > 0 ? normalizeTrainingTypes(training.items) : fallback.training.types
    },
    formations: sectionText(formations, fallback.formations),
    sectors: sectionText(sectors, fallback.sectors),
    news: sectionText(news, fallback.news),
    featureLinks: {
      ...fallback.featureLinks,
      ...normalizeKeyedLabels(featureLinks?.items)
    }
  };
}

function sectionText(section, fallback) {
  return {
    eyebrow: text(section?.subtitle, section?.eyebrow, fallback.eyebrow),
    title: text(section?.title, fallback.title),
    description: text(section?.description, section?.body, fallback.description)
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

function normalizeTrainingTypes(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { title: item.trim(), description: '', points: [] };
      }

      if (item && typeof item === 'object') {
        return {
          title: String(item.title ?? item.label ?? '').trim(),
          description: String(item.description ?? item.body ?? '').trim(),
          points: normalizeStrings(item.points ?? item.items)
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

    if (item?.type === 'secondary' || index === 1) {
      return { ...labels, secondaryLabel: String(label).trim() };
    }

    if (item?.type === 'tertiary' || index === 2) {
      return { ...labels, tertiaryLabel: String(label).trim() };
    }

    return labels;
  }, {});
}

function normalizeKeyedLabels(value) {
  if (!Array.isArray(value)) return {};

  return value.reduce((labels, item) => {
    if (!item || typeof item !== 'object') return labels;
    const key = String(item.key ?? '').trim();
    const label = String(item.label ?? item.title ?? item.description ?? '').trim();
    return key && label ? { ...labels, [key]: label } : labels;
  }, {});
}
