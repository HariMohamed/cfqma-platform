import { useEffect, useMemo, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { LoadingState } from '../components/StateBlock';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

export function FAQ() {
  const { language } = useI18n();
  const fallback = useMemo(() => buildFallbackContent(language), [language]);
  const [pageContent, setPageContent] = useState(null);
  const [contentStatus, setContentStatus] = useState('loading');
  const content = useMemo(() => mergeFaqContent(fallback, pageContent, language), [fallback, pageContent, language]);

  useEffect(() => {
    let active = true;
    setContentStatus('loading');

    publicService
      .getPageContent('faq', language)
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
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />

      {contentStatus === 'loading' && (
        <div className="mt-8">
          <LoadingState label="Chargement de la FAQ..." />
        </div>
      )}

      {contentStatus === 'fallback' && (
        <p className="mt-8 rounded-md bg-clay/15 p-4 text-sm font-semibold text-ink/70 dark:text-white/75">
          Contenu PageContent localisé indisponible. Affichage du contenu statique de secours.
        </p>
      )}

      {content.questions.length > 0 && (
        <div className="mt-8 grid gap-4">
          {content.questions.map((item) => (
            <article key={item.question} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
              <h2 className="text-lg font-bold text-ink dark:text-white">{item.question}</h2>
              <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{item.answer}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function buildFallbackContent(language) {
  const fallbacks = {
    fr: {
      hero: {
        eyebrow: 'FAQ',
        title: 'Questions fréquentes',
        description: 'Réponses rapides sur l’admission, les formations et le suivi des demandes.'
      },
      questions: [
        {
          question: 'À qui s’adresse la formation initiale ?',
          answer: 'Elle s’adresse principalement aux jeunes de 15 à 30 ans souhaitant se qualifier dans les métiers de l’artisanat.'
        },
        {
          question: 'Quelle est la différence entre formation initiale et formation continue ?',
          answer: 'La formation initiale concerne les parcours par apprentissage. La formation continue concerne les artisans de la région Rabat-Salé-Kénitra.'
        },
        {
          question: 'Quel est le modèle pédagogique ?',
          answer: 'La formation par apprentissage repose sur 80% de pratique et 20% de théorie.'
        },
        {
          question: 'Comment suivre une demande de pré-inscription ?',
          answer: 'Le suivi en ligne doit être confirmé par l’administration. En attendant, le candidat peut contacter le centre par téléphone ou email.'
        }
      ]
    },
    ar: {
      hero: {
        eyebrow: 'أسئلة شائعة',
        title: 'أسئلة شائعة',
        description: 'إجابات مختصرة حول القبول والتكوينات وتتبع الطلبات.'
      },
      questions: [
        {
          question: 'من يمكنه الاستفادة من التكوين الأولي؟',
          answer: 'يستهدف أساسا الشباب من 15 إلى 30 سنة الراغبين في التأهيل في مهن الصناعة التقليدية.'
        },
        {
          question: 'ما الفرق بين التكوين الأولي والتكوين المستمر؟',
          answer: 'التكوين الأولي يهم مسارات التدرج، أما التكوين المستمر فيهم حرفيي جهة الرباط-سلا-القنيطرة.'
        },
        {
          question: 'ما هو النموذج البيداغوجي؟',
          answer: 'يعتمد التكوين بالتدرج على 80% من التطبيق و20% من الجانب النظري.'
        },
        {
          question: 'كيف يمكن تتبع طلب التسجيل القبلي؟',
          answer: 'يعتمد التتبع الإلكتروني الكامل على التحقق الإداري. يمكن للمترشح الاتصال بالمركز عبر الهاتف أو البريد الإلكتروني.'
        }
      ]
    },
    en: {
      hero: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        description: 'Quick answers about admission, training programs, and request follow-up.'
      },
      questions: [
        {
          question: 'Who can apply for Initial Training?',
          answer: 'It is mainly intended for young people aged 15 to 30 who want to qualify in artisan craft professions.'
        },
        {
          question: 'What is the difference between Initial Training and Continuing Training?',
          answer: 'Initial Training covers apprenticeship pathways. Continuing Training is for artisans in the Rabat-Salé-Kénitra region.'
        },
        {
          question: 'What is the training model?',
          answer: 'Apprenticeship training is based on 80% practice and 20% theory.'
        },
        {
          question: 'How can I follow up on a pre-registration request?',
          answer: 'Full online tracking must be confirmed by the administration. Meanwhile, candidates can contact the center by phone or email.'
        }
      ]
    }
  };

  return fallbacks[language] ?? fallbacks.fr;
}

function mergeFaqContent(fallback, pageContent, language) {
  const sections =
    pageContent?.locale === language && !pageContent?.fallbackLocale && Array.isArray(pageContent.sections)
      ? pageContent.sections
      : [];
  const section = createSectionFinder(sections);
  const hero = section('hero', 'banner');
  const questions = section('questions', 'faq');

  return {
    hero: {
      eyebrow: text(hero?.subtitle, hero?.eyebrow, fallback.hero.eyebrow),
      title: text(hero?.title, fallback.hero.title),
      description: text(hero?.description, hero?.body, fallback.hero.description)
    },
    questions: normalizeQuestions(questions?.items).length > 0 ? normalizeQuestions(questions.items) : fallback.questions
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

function normalizeQuestions(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { question: item.trim(), answer: '' };
      }

      if (item && typeof item === 'object') {
        return {
          question: String(item.question ?? item.title ?? item.label ?? '').trim(),
          answer: String(item.answer ?? item.description ?? item.body ?? item.value ?? '').trim()
        };
      }

      return null;
    })
    .filter((item) => item?.question);
}
