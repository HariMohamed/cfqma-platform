import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../hooks/useI18n';
import { publicService } from '../services/publicService';

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  age: '',
  city: '',
  desiredFormation: '',
  educationLevel: '',
  message: ''
};

export function PreRegistration() {
  const { language } = useI18n();
  const copy = useMemo(() => getPreRegistrationCopy(language), [language]);
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState(initialForm);
  const [formations, setFormations] = useState([]);
  const [formationsStatus, setFormationsStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const set = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  useEffect(() => {
    publicService
      .getFormations()
      .then((data) => {
        setFormations(data);
        setFormationsStatus('ready');
      })
      .catch(() => setFormationsStatus('error'));
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setTrackingCode('');

    const hasValidFormation = formations.some((item) => item.title === form.desiredFormation);
    if (!hasValidFormation) {
      setStatus('error');
      setMessage(copy.invalidFormation);
      return;
    }

    try {
      const result = await publicService.sendRegistration({ ...form, age: Number(form.age) });
      setStatus('success');
      setTrackingCode(result.trackingCode || '');
      setMessage(copy.success);
      setForm(initialForm);
    } catch {
      setStatus('error');
      setMessage(copy.error);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mt-6 flex flex-wrap gap-3">
        <Button to="/admission" variant="secondary">
          {copy.admissionButton}
        </Button>
        <Button to="/application-tracking" variant="ghost">
          {copy.trackingButton}
        </Button>
      </div>
      <form onSubmit={onSubmit} className="mt-8 rounded-lg bg-white p-6 shadow-soft dark:bg-white/10 dark:ring-1 dark:ring-white/10">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={copy.fields.fullName} value={form.fullName} onChange={(value) => set('fullName', value)} />
          <Field label={copy.fields.phone} value={form.phone} onChange={(value) => set('phone', value)} />
          <Field label={copy.fields.email} type="email" value={form.email} onChange={(value) => set('email', value)} required={false} />
          <Field label={copy.fields.age} type="number" value={form.age} onChange={(value) => set('age', value)} />
          <Field label={copy.fields.city} value={form.city} onChange={(value) => set('city', value)} />
          <label className="block text-sm font-semibold text-ink dark:text-white">
            {copy.fields.desiredFormation}
            <select
              required
              disabled={formationsStatus !== 'ready' || formations.length === 0}
              value={form.desiredFormation}
              onChange={(event) => set('desiredFormation', event.target.value)}
              className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-white/15 dark:bg-[#101712] dark:text-white dark:disabled:bg-white/10"
            >
              <option value="">{formationsStatus === 'loading' ? copy.loadingShort : copy.choose}</option>
              {formations.map((item) => (
                <option key={item.slug} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <Field label={copy.fields.educationLevel} value={form.educationLevel} onChange={(value) => set('educationLevel', value)} />
        </div>
        {formationsStatus === 'loading' && (
          <div className="mt-4">
            <LoadingState label={copy.formationsLoading} />
          </div>
        )}
        {formationsStatus === 'error' && (
          <div className="mt-4">
            <ErrorState label={copy.formationsError} />
          </div>
        )}
        {formationsStatus === 'ready' && formations.length === 0 && (
          <div className="mt-4">
            <ErrorState label={copy.formationsEmpty} />
          </div>
        )}
        <label className="mt-4 block text-sm font-semibold text-ink dark:text-white">
          {copy.fields.message}
          <textarea
            value={form.message}
            onChange={(event) => set('message', event.target.value)}
            className="mt-2 min-h-32 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring dark:border-white/15 dark:bg-[#101712] dark:text-white"
          />
        </label>
        <Button className="mt-5" disabled={status === 'loading' || formationsStatus !== 'ready' || formations.length === 0}>
          {status === 'loading' ? copy.sending : copy.submit}
        </Button>
        {status === 'success' && (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-5 text-green-800 dark:border-green-400/30 dark:bg-green-400/10 dark:text-green-200">
            <p className="text-sm font-semibold">{message}</p>
            {trackingCode && (
              <>
                <p className="mt-3 text-sm">{copy.trackingIntro}</p>
                <p className="mt-2 inline-flex rounded-md bg-white px-3 py-2 font-mono text-lg font-bold text-ink ring-1 ring-green-200 dark:bg-[#101712] dark:text-white dark:ring-green-400/30" dir="ltr">
                  {trackingCode}
                </p>
                <div className="mt-4">
                  <Button to={`/application-tracking?code=${encodeURIComponent(trackingCode)}`} variant="secondary">
                    {copy.trackNow}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        {status === 'error' && <p className="mt-3 text-sm text-red-700 dark:text-red-300">{message}</p>}
      </form>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required = true }) {
  return (
    <label className="block text-sm font-semibold text-ink dark:text-white">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring dark:border-white/15 dark:bg-[#101712] dark:text-white"
      />
    </label>
  );
}

function getPreRegistrationCopy(language) {
  const copies = {
    fr: {
      eyebrow: 'Pré-inscription',
      title: 'Demande de pré-inscription',
      description: "Remplissez le formulaire. L'administration pourra traiter la demande depuis le dashboard.",
      admissionButton: "Voir les conditions d'admission",
      trackingButton: 'Suivre une demande',
      loadingShort: 'Chargement...',
      choose: 'Choisir',
      formationsLoading: 'Chargement des formations depuis MongoDB...',
      formationsError: 'Impossible de charger les formations depuis le backend. La pré-inscription est suspendue.',
      formationsEmpty: 'Aucune formation disponible dans MongoDB pour la pré-inscription.',
      invalidFormation: 'Sélectionnez une formation valide depuis la liste chargée depuis MongoDB.',
      success: 'Demande envoyée. Conservez votre code de suivi.',
      error: 'Envoi impossible pour le moment. Vérifiez la connexion au backend puis réessayez.',
      sending: 'Envoi...',
      submit: 'Envoyer la demande',
      trackingIntro: 'Votre code de suivi est :',
      trackNow: 'Suivre ma demande',
      fields: {
        fullName: 'Nom complet',
        phone: 'Téléphone',
        email: 'Email',
        age: 'Âge',
        city: 'Ville',
        desiredFormation: 'Formation souhaitée',
        educationLevel: 'Niveau scolaire',
        message: 'Message'
      }
    },
    ar: {
      eyebrow: 'التسجيل القبلي',
      title: 'طلب التسجيل القبلي',
      description: 'املأ الاستمارة. ستتمكن الإدارة من معالجة الطلب من لوحة التحكم.',
      admissionButton: 'عرض شروط القبول',
      trackingButton: 'تتبع طلب',
      loadingShort: 'جار التحميل...',
      choose: 'اختر',
      formationsLoading: 'جار تحميل التكوينات من MongoDB...',
      formationsError: 'تعذر تحميل التكوينات من الخادم. التسجيل القبلي متوقف مؤقتا.',
      formationsEmpty: 'لا توجد تكوينات متاحة في MongoDB للتسجيل القبلي.',
      invalidFormation: 'اختر تكوينا صالحا من القائمة المحملة من MongoDB.',
      success: 'تم إرسال الطلب. احتفظ برمز التتبع.',
      error: 'تعذر الإرسال حاليا. تحقق من الاتصال بالخادم ثم أعد المحاولة.',
      sending: 'جار الإرسال...',
      submit: 'إرسال الطلب',
      trackingIntro: 'رمز تتبع طلبك هو:',
      trackNow: 'تتبع طلبي',
      fields: {
        fullName: 'الاسم الكامل',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        age: 'العمر',
        city: 'المدينة',
        desiredFormation: 'التكوين المطلوب',
        educationLevel: 'المستوى الدراسي',
        message: 'رسالة'
      }
    },
    en: {
      eyebrow: 'Pre-registration',
      title: 'Pre-registration request',
      description: 'Complete the form. The administration can process the request from the dashboard.',
      admissionButton: 'View admission conditions',
      trackingButton: 'Track an application',
      loadingShort: 'Loading...',
      choose: 'Choose',
      formationsLoading: 'Loading training programs from MongoDB...',
      formationsError: 'Unable to load training programs from the backend. Pre-registration is temporarily unavailable.',
      formationsEmpty: 'No training program is available in MongoDB for pre-registration.',
      invalidFormation: 'Select a valid training program from the MongoDB-loaded list.',
      success: 'Request submitted. Keep your tracking code.',
      error: 'Submission is currently unavailable. Check the backend connection and try again.',
      sending: 'Sending...',
      submit: 'Submit request',
      trackingIntro: 'Your tracking code is:',
      trackNow: 'Track my application',
      fields: {
        fullName: 'Full name',
        phone: 'Phone',
        email: 'Email',
        age: 'Age',
        city: 'City',
        desiredFormation: 'Desired training',
        educationLevel: 'Education level',
        message: 'Message'
      }
    }
  };

  return copies[language] ?? copies.fr;
}
