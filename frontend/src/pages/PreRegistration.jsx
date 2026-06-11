import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { SectionHeader } from '../components/SectionHeader';
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
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState(initialForm);
  const [formations, setFormations] = useState([]);
  const [formationsStatus, setFormationsStatus] = useState('loading');
  const [message, setMessage] = useState('');
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

    const hasValidFormation = formations.some((item) => item.title === form.desiredFormation);
    if (!hasValidFormation) {
      setStatus('error');
      setMessage('Sélectionnez une formation valide depuis la liste chargée depuis MongoDB.');
      return;
    }

    try {
      await publicService.sendRegistration({ ...form, age: Number(form.age) });
      setStatus('success');
      setMessage('Demande envoyée. Le centre pourra la traiter depuis le dashboard admin.');
      setForm(initialForm);
    } catch {
      setStatus('error');
      setMessage('Envoi impossible pour le moment. Vérifiez la connexion au backend puis réessayez.');
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Pré-inscription" title="Demande de pré-inscription" description="Remplissez le formulaire. L'administration pourra traiter la demande depuis le dashboard." />
      <div className="mt-6 flex flex-wrap gap-3">
        <Button to="/admission" variant="secondary">Voir les conditions d'admission</Button>
        <Button to="/application-tracking" variant="ghost">Suivre une demande</Button>
      </div>
      <form onSubmit={onSubmit} className="mt-8 rounded-lg bg-white p-6 shadow-soft dark:bg-white/10 dark:ring-1 dark:ring-white/10">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nom complet" value={form.fullName} onChange={(value) => set('fullName', value)} />
          <Field label="Telephone" value={form.phone} onChange={(value) => set('phone', value)} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => set('email', value)} required={false} />
          <Field label="Age" type="number" value={form.age} onChange={(value) => set('age', value)} />
          <Field label="Ville" value={form.city} onChange={(value) => set('city', value)} />
          <label className="block text-sm font-semibold text-ink dark:text-white">
            Formation souhaitée
            <select
              required
              disabled={formationsStatus !== 'ready' || formations.length === 0}
              value={form.desiredFormation}
              onChange={(event) => set('desiredFormation', event.target.value)}
              className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-white/15 dark:bg-[#101712] dark:text-white dark:disabled:bg-white/10"
            >
              <option value="">{formationsStatus === 'loading' ? 'Chargement...' : 'Choisir'}</option>
              {formations.map((item) => (
                <option key={item.slug} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <Field label="Niveau scolaire" value={form.educationLevel} onChange={(value) => set('educationLevel', value)} />
        </div>
        {formationsStatus === 'loading' && <div className="mt-4"><LoadingState label="Chargement des formations depuis MongoDB..." /></div>}
        {formationsStatus === 'error' && <div className="mt-4"><ErrorState label="Impossible de charger les formations depuis le backend. La pré-inscription est suspendue." /></div>}
        {formationsStatus === 'ready' && formations.length === 0 && <div className="mt-4"><ErrorState label="Aucune formation disponible dans MongoDB pour la pre-inscription." /></div>}
        <label className="mt-4 block text-sm font-semibold text-ink dark:text-white">
          Message
          <textarea value={form.message} onChange={(event) => set('message', event.target.value)} className="mt-2 min-h-32 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring dark:border-white/15 dark:bg-[#101712] dark:text-white" />
        </label>
        <Button className="mt-5" disabled={status === 'loading' || formationsStatus !== 'ready' || formations.length === 0}>
          {status === 'loading' ? 'Envoi...' : 'Envoyer la demande'}
        </Button>
        {status === 'success' && <p className="mt-3 text-sm text-green-700 dark:text-green-300">{message}</p>}
        {status === 'error' && <p className="mt-3 text-sm text-red-700 dark:text-red-300">{message}</p>}
      </form>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required = true }) {
  return (
    <label className="block text-sm font-semibold text-ink dark:text-white">
      {label}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink focus-ring dark:border-white/15 dark:bg-[#101712] dark:text-white" />
    </label>
  );
}
