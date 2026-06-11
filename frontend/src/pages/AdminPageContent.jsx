import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { adminService } from '../services/adminService';

const pageOptions = [
  { value: 'about', label: 'About' },
  { value: 'admission', label: 'Admission' },
  { value: 'accompagnement', label: 'Accompagnement' },
  { value: 'faq', label: 'FAQ' },
  { value: 'home', label: 'Home' }
];

const localeOptions = [
  { value: 'fr', label: 'FR' },
  { value: 'ar', label: 'AR' },
  { value: 'en', label: 'EN' }
];

const createEmptySection = () => ({
  key: '',
  title: '',
  subtitle: '',
  description: '',
  body: '',
  items: [],
  extra: {}
});

export function AdminPageContent() {
  const [pageKey, setPageKey] = useState('about');
  const [locale, setLocale] = useState('fr');
  const [sections, setSections] = useState([createEmptySection()]);
  const [status, setStatus] = useState('loading');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const selectedLabel = useMemo(() => pageOptions.find((page) => page.value === pageKey)?.label ?? pageKey, [pageKey]);

  const load = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const content = await adminService.getPageContent(pageKey, locale);
      const nextSections = Array.isArray(content.sections) ? content.sections.map(toEditableSection) : [];
      setSections(nextSections.length > 0 ? nextSections : [createEmptySection()]);
      setStatus('ready');
    } catch {
      setSections([createEmptySection()]);
      setStatus('error');
      setMessageType('error');
      setMessage('Impossible de charger ce contenu depuis le backend.');
    }
  };

  useEffect(() => {
    load();
  }, [pageKey, locale]);

  const updateSection = (index, field, value) => {
    setSections((previous) => previous.map((section, sectionIndex) => (sectionIndex === index ? { ...section, [field]: value } : section)));
  };

  const addSection = () => {
    setSections((previous) => [...previous, createEmptySection()]);
  };

  const removeSection = (index) => {
    setSections((previous) => {
      const next = previous.filter((section, sectionIndex) => sectionIndex !== index);
      return next.length > 0 ? next : [createEmptySection()];
    });
  };

  const addItem = (sectionIndex) => {
    setSections((previous) =>
      previous.map((section, index) => (index === sectionIndex ? { ...section, items: [...section.items, ''] } : section))
    );
  };

  const updateItem = (sectionIndex, itemIndex, value) => {
    setSections((previous) =>
      previous.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: section.items.map((item, currentItemIndex) => (currentItemIndex === itemIndex ? value : item)) }
          : section
      )
    );
  };

  const removeItem = (sectionIndex, itemIndex) => {
    setSections((previous) =>
      previous.map((section, index) =>
        index === sectionIndex ? { ...section, items: section.items.filter((item, currentItemIndex) => currentItemIndex !== itemIndex) } : section
      )
    );
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    setSaveStatus('saving');

    try {
      const payload = normalizeSections(sections);
      await adminService.updatePageContent(pageKey, locale, { sections: payload });
      await load();
      setMessageType('success');
      setMessage('Contenu enregistre.');
      setSaveStatus('idle');
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'Enregistrement impossible. Verifiez le contenu et la session admin.');
      setSaveStatus('idle');
    }
  };

  return (
    <section className="grid gap-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-ink">Page Content</h1>
        <p className="mt-2 text-sm leading-6 text-ink/60">
          Modifiez les sections structurees utilisees par les pages publiques. Les champs vides ne sont pas enregistres.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-semibold text-ink">
            Page
            <select value={pageKey} onChange={(event) => setPageKey(event.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring">
              {pageOptions.map((page) => (
                <option key={page.value} value={page.value}>
                  {page.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-ink">
            Langue
            <select value={locale} onChange={(event) => setLocale(event.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring">
              {localeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {status === 'loading' && <LoadingState label="Chargement du contenu PageContent..." />}
      {status === 'error' && <ErrorState label={message} />}

      {status === 'ready' && (
        <form onSubmit={submit} className="grid gap-5">
          {message && (
            <div>
              {messageType === 'success' ? (
                <p className="rounded-md bg-green-50 p-4 text-sm font-semibold text-green-700">{message}</p>
              ) : (
                <ErrorState label={message} />
              )}
            </div>
          )}

          {sections.map((section, index) => (
            <SectionEditor
              key={`${section.key || 'section'}-${index}`}
              index={index}
              section={section}
              onChange={updateSection}
              onRemove={removeSection}
              onAddItem={addItem}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
            />
          ))}

          <div className="flex flex-col gap-3 rounded-lg bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={addSection} className="rounded-md border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-slate-50">
              Ajouter une section
            </button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={load} className="rounded-md px-4 py-2.5 text-sm font-semibold text-ink hover:bg-slate-100">
                Recharger
              </button>
              <Button disabled={saveStatus === 'saving'}>
                {saveStatus === 'saving' ? 'Enregistrement...' : `Enregistrer ${selectedLabel} ${locale.toUpperCase()}`}
              </Button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}

function SectionEditor({ index, section, onChange, onRemove, onAddItem, onUpdateItem, onRemoveItem }) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-ink">Section {index + 1}</h2>
        <button type="button" onClick={() => onRemove(index)} className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          Supprimer
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Key" value={section.key} onChange={(value) => onChange(index, 'key', value)} required />
        <Field label="Title" value={section.title} onChange={(value) => onChange(index, 'title', value)} />
        <Field label="Subtitle / eyebrow" value={section.subtitle} onChange={(value) => onChange(index, 'subtitle', value)} />
        <Field label="Description" value={section.description} onChange={(value) => onChange(index, 'description', value)} multiline />
        <Field label="Body" value={section.body} onChange={(value) => onChange(index, 'body', value)} multiline wide />
      </div>

      <div className="mt-5 rounded-md border border-ink/10 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink">Items</h3>
            <p className="mt-1 text-xs text-ink/55">Utilisez un texte simple par ligne. Les objets JSON valides sont aussi acceptes si necessaire.</p>
          </div>
          <button type="button" onClick={() => onAddItem(index)} className="rounded-md border border-ink/15 px-3 py-2 text-xs font-semibold text-ink hover:bg-slate-50">
            Ajouter un item
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          {section.items.length === 0 && <p className="text-sm text-ink/50">Aucun item pour cette section.</p>}
          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex gap-2">
              <input
                value={item}
                onChange={(event) => onUpdateItem(index, itemIndex, event.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm focus-ring"
                placeholder="Texte ou objet JSON"
              />
              <button type="button" onClick={() => onRemoveItem(index, itemIndex)} className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-ink">
                Retirer
              </button>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function Field({ label, value, onChange, required = false, multiline = false, wide = false }) {
  const className = `${wide ? 'md:col-span-2' : ''} block text-sm font-semibold text-ink`;

  if (multiline) {
    return (
      <label className={className}>
        {label}
        <textarea
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 min-h-24 w-full rounded-md border px-3 py-2 focus-ring"
        />
      </label>
    );
  }

  return (
    <label className={className}>
      {label}
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring" />
    </label>
  );
}

function toEditableSection(section = {}) {
  const {
    _id,
    id,
    __v,
    createdAt,
    updatedAt,
    key = '',
    title = '',
    subtitle = '',
    description = '',
    body = '',
    items = [],
    ...extra
  } = section;

  return {
    key: String(key ?? ''),
    title: String(title ?? ''),
    subtitle: String(subtitle ?? ''),
    description: String(description ?? ''),
    body: String(body ?? ''),
    items: Array.isArray(items) ? items.map(serializeItem) : [],
    extra
  };
}

function normalizeSections(sections) {
  const keys = new Set();
  const normalized = sections.map((section, index) => {
    const key = section.key.trim();
    if (!key) throw new Error(`La section ${index + 1} doit avoir une key.`);
    if (keys.has(key)) throw new Error(`La key "${key}" est dupliquee.`);
    keys.add(key);

    const payload = { ...section.extra, key };
    addIfFilled(payload, 'title', section.title);
    addIfFilled(payload, 'subtitle', section.subtitle);
    addIfFilled(payload, 'description', section.description);
    addIfFilled(payload, 'body', section.body);

    const items = section.items.map((item) => item.trim()).filter(Boolean).map(parseItem);
    if (items.length > 0) payload.items = items;

    if (!payload.title && !payload.subtitle && !payload.description && !payload.body && !payload.items?.length) {
      throw new Error(`La section "${key}" doit contenir au moins un champ ou un item.`);
    }

    return payload;
  });

  if (normalized.length === 0) throw new Error('Ajoutez au moins une section.');
  return normalized;
}

function addIfFilled(target, key, value) {
  const text = String(value ?? '').trim();
  if (text) target[key] = text;
}

function serializeItem(item) {
  return typeof item === 'string' ? item : JSON.stringify(item);
}

function parseItem(item) {
  const text = item.trim();
  if (!text.startsWith('{') && !text.startsWith('[')) return text;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Item JSON invalide: ${text.slice(0, 40)}`);
  }
}
