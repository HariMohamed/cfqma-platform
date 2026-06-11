import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { adminService } from '../services/adminService';

const emptyForm = {
  phoneNumbers: '',
  email: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
  openingHours: '',
  mapEmbedUrl: '',
  defaultLanguage: 'fr'
};

export function AdminSettings() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  useEffect(() => {
    adminService
      .getSettings()
      .then((settings) => {
        setForm({
          phoneNumbers: (settings.phoneNumbers ?? []).join(', '),
          email: settings.email ?? '',
          address: settings.address ?? '',
          facebookUrl: settings.facebookUrl ?? '',
          instagramUrl: settings.instagramUrl ?? '',
          openingHours: settings.openingHours ?? '',
          mapEmbedUrl: settings.mapEmbedUrl ?? '',
          defaultLanguage: settings.defaultLanguage ?? 'fr'
        });
        setStatus('ready');
      })
      .catch(() => {
        setStatus('ready');
        setMessageType('error');
        setMessage('Paramètres introuvables. Enregistrez le formulaire pour créer la configuration.');
      });
  }, []);

  const set = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');
    try {
      await adminService.updateSettings({
        ...form,
        phoneNumbers: form.phoneNumbers
          .split(',')
          .map((phone) => phone.trim())
          .filter(Boolean)
      });
      setStatus('ready');
      setMessageType('success');
      setMessage('Paramètres enregistrés.');
    } catch {
      setStatus('ready');
      setMessageType('error');
      setMessage('Enregistrement impossible. Vérifiez le backend et la validation.');
    }
  };

  if (status === 'loading') return <LoadingState label="Chargement des paramètres..." />;

  return (
    <section className="max-w-4xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-ink">Paramètres du site</h1>
      {message && (
        <div className="mt-4">
          {messageType === 'success' ? (
            <p className="rounded-md bg-green-50 p-4 text-sm font-semibold text-green-700">{message}</p>
          ) : (
            <ErrorState label={message} />
          )}
        </div>
      )}
      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Téléphones (séparés par virgule)" value={form.phoneNumbers} onChange={(value) => set('phoneNumbers', value)} />
        <Field label="Email" type="email" value={form.email} onChange={(value) => set('email', value)} />
        <Field label="Adresse" value={form.address} onChange={(value) => set('address', value)} wide />
        <Field label="Facebook URL" value={form.facebookUrl} onChange={(value) => set('facebookUrl', value)} required={false} />
        <Field label="Instagram URL" value={form.instagramUrl} onChange={(value) => set('instagramUrl', value)} required={false} />
        <Field label="Horaires" value={form.openingHours} onChange={(value) => set('openingHours', value)} required={false} />
        <label className="block text-sm font-semibold">
          Langue par défaut
          <select value={form.defaultLanguage} onChange={(event) => set('defaultLanguage', event.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring">
            <option value="fr">FR</option>
            <option value="ar">AR</option>
            <option value="en">EN</option>
          </select>
        </label>
        <Field label="Google Map embed URL" value={form.mapEmbedUrl} onChange={(value) => set('mapEmbedUrl', value)} wide required={false} />
        <div className="md:col-span-2">
          <Button disabled={status === 'saving'}>{status === 'saving' ? 'Enregistrement...' : 'Enregistrer'}</Button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', wide = false, required = true }) {
  return (
    <label className={`block text-sm font-semibold ${wide ? 'md:col-span-2' : ''}`}>
      {label}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring" />
    </label>
  );
}
