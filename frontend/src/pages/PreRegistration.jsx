import { useState } from 'react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { formations } from '../data/seedData';
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
  const set = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    try {
      await publicService.sendRegistration({ ...form, age: Number(form.age) });
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Pré-inscription" title="Demande de pré-inscription" description="Remplissez le formulaire. L administration pourra traiter la demande depuis le dashboard." />
      <div className="mt-6 flex flex-wrap gap-3">
        <Button to="/admission" variant="secondary">Voir les conditions d admission</Button>
        <Button to="/application-tracking" variant="ghost">Suivre une demande</Button>
      </div>
      <form onSubmit={onSubmit} className="mt-8 rounded-lg bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nom complet" value={form.fullName} onChange={(value) => set('fullName', value)} />
          <Field label="Telephone" value={form.phone} onChange={(value) => set('phone', value)} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => set('email', value)} />
          <Field label="Age" type="number" value={form.age} onChange={(value) => set('age', value)} />
          <Field label="Ville" value={form.city} onChange={(value) => set('city', value)} />
          <label className="block text-sm font-semibold">
            Formation souhaitée
            <select required value={form.desiredFormation} onChange={(event) => set('desiredFormation', event.target.value)} className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2 focus-ring">
              <option value="">Choisir</option>
              {formations.map((item) => (
                <option key={item.slug} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <Field label="Niveau scolaire" value={form.educationLevel} onChange={(value) => set('educationLevel', value)} />
        </div>
        <label className="mt-4 block text-sm font-semibold">
          Message
          <textarea value={form.message} onChange={(event) => set('message', event.target.value)} className="mt-2 min-h-32 w-full rounded-md border border-ink/15 px-3 py-2 focus-ring" />
        </label>
        <Button className="mt-5" disabled={status === 'loading'}>
          {status === 'loading' ? 'Envoi...' : 'Envoyer la demande'}
        </Button>
        {status === 'success' && <p className="mt-3 text-sm text-green-700">Demande envoyée.</p>}
        {status === 'error' && <p className="mt-3 text-sm text-red-700">Envoi impossible pour le moment.</p>}
      </form>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2 focus-ring" />
    </label>
  );
}
