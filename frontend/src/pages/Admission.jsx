import { useEffect, useMemo, useState } from 'react';
import { ClipboardEdit, FileCheck2, GraduationCap } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { LoadingState } from '../components/StateBlock';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

export function Admission() {
  const { language } = useI18n();
  const fallback = useMemo(() => buildFallbackContent(language), [language]);
  const [pageContent, setPageContent] = useState(null);
  const [contentStatus, setContentStatus] = useState('loading');
  const content = useMemo(() => mergeAdmissionContent(fallback, pageContent, language), [fallback, pageContent, language]);

  useEffect(() => {
    let active = true;
    setContentStatus('loading');

    publicService
      .getPageContent('admission', language)
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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />

      {contentStatus === 'loading' && (
        <div className="mt-8">
          <LoadingState label="Chargement du contenu d'admission..." />
        </div>
      )}

      {contentStatus === 'fallback' && (
        <p className="mt-8 rounded-md bg-clay/15 p-4 text-sm font-semibold text-ink/70 dark:text-white/75">
          Contenu PageContent localisé indisponible. Affichage du contenu statique de secours.
        </p>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {content.trainingTypes.map((type) => (
          <article key={type.title} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-craft" />
              <h2 className="text-2xl font-bold text-ink dark:text-white">{type.title}</h2>
            </div>
            {type.description && <p className="mt-4 leading-7 text-ink/70 dark:text-white/70">{type.description}</p>}
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
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg bg-ink p-6 text-white shadow-soft dark:bg-[#101712]">
          <div className="flex items-center gap-3">
            <FileCheck2 className="text-clay" />
            <h2 className="text-2xl font-bold">{content.levels.title}</h2>
          </div>
          {content.levels.items.length > 0 && (
            <div className="mt-5 grid gap-3">
              {content.levels.items.map((level) => (
                <div key={`${level.code}-${level.label}`} className="rounded-md bg-white/10 p-4">
                  <p className="text-xl font-bold text-clay">{level.code}</p>
                  <p className="mt-1 text-sm text-white/75">{level.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
          <h2 className="text-2xl font-bold text-ink dark:text-white">{content.steps.title}</h2>
          {content.steps.description && <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{content.steps.description}</p>}
          {content.steps.items.length > 0 && (
            <ol className="mt-5 grid gap-3">
              {content.steps.items.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-md bg-paper p-4 dark:bg-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-craft text-sm font-bold text-white">{index + 1}</span>
                  <span className="text-sm leading-6 text-ink/75 dark:text-white/75">{step}</span>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-6 rounded-md border border-dashed border-ink/15 bg-paper p-4 dark:border-white/15 dark:bg-white/10">
            <h3 className="font-semibold text-ink dark:text-white">{content.documents.title}</h3>
            {content.documents.description && <p className="mt-2 text-sm leading-6 text-ink/70 dark:text-white/70">{content.documents.description}</p>}
            {content.documents.items.length > 0 && (
              <ul className="mt-3 grid gap-2 text-sm text-ink/75 dark:text-white/75">
                {content.documents.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-craft" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 rounded-md bg-craft/10 p-4 dark:bg-clay/10">
            <h3 className="font-semibold text-ink dark:text-white">{content.cta.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70 dark:text-white/70">{content.cta.description}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button to="/pre-registration">
                <ClipboardEdit size={18} /> {content.cta.primaryLabel}
              </Button>
              <Button to="/contact" variant="secondary">
                {content.cta.secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildFallbackContent(language) {
  const fallbacks = {
    fr: {
      hero: {
        eyebrow: 'Admission',
        title: "Conditions et parcours d'inscription",
        description:
          "Le centre accueille les candidats selon le type de formation, le niveau visé et les disponibilités communiquées par l'administration."
      },
      trainingTypes: [
        {
          title: 'Formation Initiale',
          description: 'Formation par apprentissage destinée aux jeunes candidats souhaitant apprendre un métier artisanal.',
          points: ['80% pratique', '20% théorie', 'Accompagnement pédagogique et professionnel']
        },
        {
          title: 'Formation Continue',
          description: 'Formation destinée aux artisans de la région Rabat-Salé-Kénitra pour renforcer leurs compétences.',
          points: ['Perfectionnement technique', 'Adaptation aux besoins du marché', 'Développement du produit artisanal']
        }
      ],
      levels: {
        title: 'Niveaux de formation',
        items: [
          { code: 'CAP', label: "Certificat d'Apprentissage Professionnelle" },
          { code: 'DSP', label: 'Diplôme de Spécialisation Professionnelle' },
          { code: 'DQP', label: 'Diplôme de Qualification Professionnelle' }
        ]
      },
      steps: {
        title: 'Étapes recommandées',
        description: "Le dépôt d'une demande ne vaut pas admission automatique. L'administration vérifie le dossier et les places disponibles.",
        items: [
          'Consulter les formations et choisir le métier souhaité.',
          'Remplir le formulaire de pré-inscription en ligne.',
          'Préparer les documents demandés par l’administration du centre.',
          'Attendre la prise de contact ou la convocation du centre.',
          'Finaliser le dossier après validation de la demande.'
        ]
      },
      documents: {
        title: 'Dossier et documents',
        description: "Les pièces exactes à fournir sont confirmées par l'administration du centre selon la formation et le niveau demandés.",
        items: ['Informations personnelles complètes', 'Coordonnées valides', 'Niveau scolaire ou professionnel', 'Formation souhaitée']
      },
      cta: {
        title: 'Pré-inscription',
        description: "Après l'envoi du formulaire, l'administration examine la demande et contacte le candidat pour les étapes suivantes.",
        primaryLabel: 'Pré-inscription',
        secondaryLabel: 'Contacter le centre'
      }
    },
    ar: {
      hero: {
        eyebrow: 'التسجيل',
        title: 'شروط ومسار التسجيل',
        description: 'يستقبل المركز المترشحين حسب نوع التكوين والمستوى المطلوب والمقاعد المتاحة التي تعلن عنها الإدارة.'
      },
      trainingTypes: [
        {
          title: 'التكوين الأولي',
          description: 'تكوين بالتدرج موجه للشباب الراغبين في تعلم حرفة من حرف الصناعة التقليدية.',
          points: ['80% تطبيق', '20% نظري', 'مواكبة بيداغوجية ومهنية']
        },
        {
          title: 'التكوين المستمر',
          description: 'تكوين موجه لحرفيي جهة الرباط-سلا-القنيطرة من أجل تطوير مهاراتهم.',
          points: ['تطوير الكفاءات التقنية', 'ملاءمة حاجيات السوق', 'تطوير المنتوج الحرفي']
        }
      ],
      levels: {
        title: 'مستويات التكوين',
        items: [
          { code: 'CAP', label: 'شهادة التدرج المهني' },
          { code: 'DSP', label: 'دبلوم التخصص المهني' },
          { code: 'DQP', label: 'دبلوم التأهيل المهني' }
        ]
      },
      steps: {
        title: 'الخطوات المقترحة',
        description: 'تقديم طلب التسجيل القبلي لا يعني القبول النهائي. تقوم الإدارة بدراسة الملف حسب الشروط والمقاعد المتاحة.',
        items: [
          'الاطلاع على التكوينات واختيار الحرفة المناسبة.',
          'ملء استمارة التسجيل القبلي عبر الموقع.',
          'تحضير الوثائق التي تطلبها إدارة المركز.',
          'انتظار اتصال أو استدعاء من المركز.',
          'استكمال الملف بعد قبول الطلب.'
        ]
      },
      documents: {
        title: 'الملف والوثائق',
        description: 'تحدد إدارة المركز الوثائق المطلوبة حسب نوع التكوين والمستوى المختار.',
        items: ['المعلومات الشخصية الكاملة', 'وسائل اتصال صحيحة', 'المستوى الدراسي أو المهني', 'التكوين المرغوب فيه']
      },
      cta: {
        title: 'التسجيل القبلي',
        description: 'بعد إرسال الاستمارة، تدرس الإدارة الطلب وتتواصل مع المترشح لاستكمال المراحل التالية.',
        primaryLabel: 'التسجيل القبلي',
        secondaryLabel: 'اتصل بالمركز'
      }
    },
    en: {
      hero: {
        eyebrow: 'Admission',
        title: 'Admission Conditions and Process',
        description: 'The center welcomes candidates according to the training type, target level, and places announced by the administration.'
      },
      trainingTypes: [
        {
          title: 'Initial Training',
          description: 'Apprenticeship-based training for young candidates who want to learn an artisan craft.',
          points: ['80% practice', '20% theory', 'Educational and professional support']
        },
        {
          title: 'Continuing Training',
          description: 'Training for artisans in the Rabat-Salé-Kénitra region who want to strengthen their skills.',
          points: ['Technical improvement', 'Adaptation to market needs', 'Artisanal product development']
        }
      ],
      levels: {
        title: 'Training levels',
        items: [
          { code: 'CAP', label: 'Professional Apprenticeship Certificate' },
          { code: 'DSP', label: 'Professional Specialization Diploma' },
          { code: 'DQP', label: 'Professional Qualification Diploma' }
        ]
      },
      steps: {
        title: 'Recommended steps',
        description: 'Submitting a request does not mean automatic admission. The administration reviews the file and available places.',
        items: [
          'Review the training programs and choose the desired craft.',
          'Complete the online pre-registration form.',
          'Prepare the documents requested by the center administration.',
          'Wait for contact or an invitation from the center.',
          'Finalize the application file after validation.'
        ]
      },
      documents: {
        title: 'Application file and documents',
        description: 'The exact documents are confirmed by the center administration according to the requested training and level.',
        items: ['Complete personal information', 'Valid contact details', 'Educational or professional level', 'Desired training program']
      },
      cta: {
        title: 'Pre-registration',
        description: 'After the form is submitted, the administration reviews the request and contacts the candidate for the next steps.',
        primaryLabel: 'Pre-registration',
        secondaryLabel: 'Contact the center'
      }
    }
  };

  return fallbacks[language] ?? fallbacks.fr;
}

function mergeAdmissionContent(fallback, pageContent, language) {
  const sections =
    pageContent?.locale === language && !pageContent?.fallbackLocale && Array.isArray(pageContent.sections)
      ? pageContent.sections
      : [];
  const section = createSectionFinder(sections);
  const hero = section('hero', 'banner');
  const trainingTypes = section('trainingTypes', 'training', 'types');
  const levels = section('levels', 'trainingLevels');
  const steps = section('steps', 'admissionSteps', 'process');
  const documents = section('documents', 'requiredDocuments', 'dossier');
  const cta = section('cta', 'preRegistration');
  const ctaItems = normalizeCtaItems(cta?.items);

  return {
    hero: {
      eyebrow: text(hero?.subtitle, hero?.eyebrow, fallback.hero.eyebrow),
      title: text(hero?.title, fallback.hero.title),
      description: text(hero?.description, hero?.body, fallback.hero.description)
    },
    trainingTypes:
      normalizeTrainingTypes(trainingTypes?.items).length > 0
        ? normalizeTrainingTypes(trainingTypes.items)
        : fallback.trainingTypes,
    levels: {
      title: text(levels?.title, fallback.levels.title),
      items: normalizeLevels(levels?.items).length > 0 ? normalizeLevels(levels.items) : fallback.levels.items
    },
    steps: {
      title: text(steps?.title, fallback.steps.title),
      description: text(steps?.description, steps?.body, fallback.steps.description),
      items: normalizeStrings(steps?.items).length > 0 ? normalizeStrings(steps.items) : fallback.steps.items
    },
    documents: {
      title: text(documents?.title, fallback.documents.title),
      description: text(documents?.description, documents?.body, fallback.documents.description),
      items: normalizeStrings(documents?.items).length > 0 ? normalizeStrings(documents.items) : fallback.documents.items
    },
    cta: {
      title: text(cta?.title, fallback.cta.title),
      description: text(cta?.description, cta?.body, fallback.cta.description),
      primaryLabel: text(ctaItems.primaryLabel, fallback.cta.primaryLabel),
      secondaryLabel: text(ctaItems.secondaryLabel, fallback.cta.secondaryLabel)
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

function normalizeLevels(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') {
        const [code, ...rest] = item.split(':');
        return { code: code.trim(), label: rest.join(':').trim() };
      }

      if (item && typeof item === 'object') {
        return {
          code: String(item.code ?? item.title ?? '').trim(),
          label: String(item.label ?? item.description ?? item.value ?? '').trim()
        };
      }

      return null;
    })
    .filter((item) => item?.code || item?.label);
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

    return labels;
  }, {});
}
