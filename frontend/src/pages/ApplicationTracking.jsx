import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ClipboardCheck, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

const CODE_PATTERN = /^CFQMA-\d{4}-\d{5}$/;

const copies = {
  fr: {
    eyebrow: 'Suivi',
    title: 'Suivi de pré-inscription',
    description: 'Saisissez le code reçu après votre pré-inscription pour consulter l’état public de votre demande.',
    label: 'Code de suivi',
    placeholder: 'CFQMA-2026-00023',
    submit: 'Rechercher',
    invalid: 'Veuillez saisir un code valide au format CFQMA-YYYY-XXXXX.',
    notFound: 'Aucune demande ne correspond à ce code de suivi.',
    empty: 'Votre résultat apparaîtra ici après la recherche.',
    code: 'Code',
    candidate: 'Candidat',
    formation: 'Formation souhaitée',
    status: 'Statut',
    createdAt: 'Date de dépôt',
    nextStep: 'Prochaine étape',
    statusLabels: {
      new: 'Reçue',
      reviewing: 'En cours d’examen',
      accepted: 'Acceptée',
      rejected: 'Non retenue'
    },
    defaultMessages: {
      new: 'Votre demande a été reçue. Elle sera examinée par l’administration du centre.',
      reviewing: 'Votre demande est en cours d’examen par l’administration du centre.',
      accepted: 'Votre demande a été acceptée. Le centre vous contactera pour les prochaines étapes.',
      rejected: 'Votre demande n’a pas été retenue à cette étape. Contactez le centre pour plus d’informations.'
    },
    helpTitle: 'Vous n’avez pas encore de code?',
    helpText: 'Envoyez une pré-inscription. Le code de suivi sera affiché après l’envoi du formulaire.',
    register: 'Faire une pré-inscription',
    contact: 'Contacter le centre'
  },
  ar: {
    eyebrow: 'تتبع',
    title: 'تتبع طلب التسجيل القبلي',
    description: 'أدخل الرمز الذي حصلت عليه بعد التسجيل القبلي للاطلاع على الحالة العامة لطلبك.',
    label: 'رمز التتبع',
    placeholder: 'CFQMA-2026-00023',
    submit: 'بحث',
    invalid: 'يرجى إدخال رمز صحيح بالصيغة CFQMA-YYYY-XXXXX.',
    notFound: 'لا يوجد أي طلب مطابق لرمز التتبع.',
    empty: 'ستظهر نتيجة التتبع هنا بعد البحث.',
    code: 'الرمز',
    candidate: 'المترشح',
    formation: 'التكوين المطلوب',
    status: 'الحالة',
    createdAt: 'تاريخ الإيداع',
    nextStep: 'الخطوة التالية',
    statusLabels: {
      new: 'تم الاستلام',
      reviewing: 'قيد الدراسة',
      accepted: 'مقبول',
      rejected: 'غير مقبول'
    },
    defaultMessages: {
      new: 'تم استلام طلبك وسيتم فحصه من طرف إدارة المركز.',
      reviewing: 'طلبك قيد الدراسة من طرف إدارة المركز.',
      accepted: 'تم قبول طلبك. سيتواصل معك المركز من أجل الخطوات المقبلة.',
      rejected: 'لم يتم قبول طلبك في هذه المرحلة. يرجى التواصل مع المركز لمزيد من المعلومات.'
    },
    helpTitle: 'ليس لديك رمز بعد؟',
    helpText: 'أرسل طلب التسجيل القبلي وسيظهر رمز التتبع بعد إرسال الاستمارة.',
    register: 'التسجيل القبلي',
    contact: 'اتصل بالمركز'
  },
  en: {
    eyebrow: 'Tracking',
    title: 'Pre-registration tracking',
    description: 'Enter the code received after pre-registration to check the public status of your application.',
    label: 'Tracking code',
    placeholder: 'CFQMA-2026-00023',
    submit: 'Search',
    invalid: 'Please enter a valid code in the format CFQMA-YYYY-XXXXX.',
    notFound: 'No application matches this tracking code.',
    empty: 'Your result will appear here after searching.',
    code: 'Code',
    candidate: 'Candidate',
    formation: 'Desired training',
    status: 'Status',
    createdAt: 'Submission date',
    nextStep: 'Next step',
    statusLabels: {
      new: 'Received',
      reviewing: 'Under review',
      accepted: 'Accepted',
      rejected: 'Not selected'
    },
    defaultMessages: {
      new: 'Your application has been received and will be reviewed by the center administration.',
      reviewing: 'Your application is currently being reviewed by the center administration.',
      accepted: 'Your application has been accepted. The center will contact you for the next steps.',
      rejected: 'Your application was not selected at this stage. Please contact the center for more information.'
    },
    helpTitle: 'No code yet?',
    helpText: 'Submit a pre-registration form. The tracking code will be shown after the form is sent.',
    register: 'Pre-register',
    contact: 'Contact the center'
  }
};

const statusStyles = {
  new: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-200 dark:ring-sky-400/30',
  reviewing: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30',
  accepted: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/30',
  rejected: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/15 dark:text-red-200 dark:ring-red-400/30'
};

function normalizeCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, '');
}

function formatDate(value, language) {
  if (!value) return '';
  const locale = language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-US' : 'fr-FR';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
}

function TrackingResult({ result, copy, language }) {
  const statusLabel = copy.statusLabels[result.status] ?? result.status;
  const publicMessage = result.publicMessage || copy.defaultMessages[result.status] || '';

  return (
    <article className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-craft dark:text-clay">{copy.code}</p>
          <p className="mt-1 font-mono text-2xl font-bold text-ink dark:text-white" dir="ltr">
            {result.trackingCode}
          </p>
        </div>
        <span className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ring-1 ${statusStyles[result.status] ?? statusStyles.new}`}>
          {statusLabel}
        </span>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-paper p-4 dark:bg-ink/40">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-white/50">{copy.candidate}</dt>
          <dd className="mt-1 text-base font-semibold text-ink dark:text-white">{result.fullName || '-'}</dd>
        </div>
        <div className="rounded-md bg-paper p-4 dark:bg-ink/40">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-white/50">{copy.formation}</dt>
          <dd className="mt-1 text-base font-semibold text-ink dark:text-white">{result.desiredFormation || '-'}</dd>
        </div>
        <div className="rounded-md bg-paper p-4 dark:bg-ink/40">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-white/50">
            <CalendarDays size={14} />
            {copy.createdAt}
          </dt>
          <dd className="mt-1 text-base font-semibold text-ink dark:text-white">{formatDate(result.createdAt, language)}</dd>
        </div>
        <div className="rounded-md bg-paper p-4 dark:bg-ink/40">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-white/50">
            <ClipboardCheck size={14} />
            {copy.status}
          </dt>
          <dd className="mt-1 text-base font-semibold text-ink dark:text-white">{statusLabel}</dd>
        </div>
      </dl>

      {publicMessage && (
        <div className="mt-5 rounded-md border border-craft/15 bg-craft/5 p-4 text-sm leading-6 text-ink/75 dark:border-clay/20 dark:bg-clay/10 dark:text-white/75">
          <p className="font-semibold text-ink dark:text-white">{copy.nextStep}</p>
          <p className="mt-1">{publicMessage}</p>
        </div>
      )}
    </article>
  );
}

export function ApplicationTracking() {
  const { language } = useI18n();
  const copy = useMemo(() => copies[language] ?? copies.fr, [language]);
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [lookupStatus, setLookupStatus] = useState(initialCode ? 'loading' : 'idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const lookup = async (value) => {
    const normalized = normalizeCode(value);
    setTrackingCode(normalized);
    setResult(null);
    setError('');

    if (!CODE_PATTERN.test(normalized)) {
      setLookupStatus('idle');
      setError(copy.invalid);
      return;
    }

    setLookupStatus('loading');
    try {
      const response = await publicService.trackRegistration(normalized);
      setResult(response);
      setLookupStatus('ready');
    } catch (err) {
      setLookupStatus('ready');
      const status = err?.response?.status;
      setError(status === 404 ? copy.notFound : err?.response?.data?.message || copy.notFound);
    }
  };

  useEffect(() => {
    if (initialCode) lookup(initialCode);
    // Run once to support direct links from the pre-registration success screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await lookup(trackingCode);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-craft/10 text-craft dark:bg-clay/15 dark:text-clay">
              <Search size={22} />
            </span>
            <h2 className="text-xl font-bold text-ink dark:text-white">{copy.label}</h2>
          </div>

          <form className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="tracking-code">
              {copy.label}
            </label>
            <input
              id="tracking-code"
              className="min-h-12 rounded-md border border-ink/10 bg-white px-4 font-mono text-base text-ink outline-none transition focus:border-craft focus:ring-2 focus:ring-craft/20 dark:border-white/15 dark:bg-ink/50 dark:text-white"
              dir="ltr"
              value={trackingCode}
              onChange={(event) => setTrackingCode(event.target.value.toUpperCase())}
              placeholder={copy.placeholder}
              autoComplete="off"
            />
            <Button type="submit" disabled={lookupStatus === 'loading'} className="min-h-12">
              {lookupStatus === 'loading' ? '...' : copy.submit}
            </Button>
          </form>

          {error && <div className="mt-5"><ErrorState label={error} /></div>}

          <div className="mt-6">
            {lookupStatus === 'loading' && <LoadingState label={copy.submit} />}
            {lookupStatus !== 'loading' && result && <TrackingResult result={result} copy={copy} language={language} />}
            {lookupStatus === 'idle' && !result && !error && <EmptyState label={copy.empty} />}
          </div>
        </div>

        <aside className="rounded-lg bg-paper p-6 ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
          <h3 className="text-lg font-bold text-ink dark:text-white">{copy.helpTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-white/70">{copy.helpText}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button to="/pre-registration">{copy.register}</Button>
            <Button to="/contact" variant="secondary">
              {copy.contact}
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
