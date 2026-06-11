import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { ErrorState, LoadingState } from '../../components/StateBlock';
import { adminService } from '../../services/adminService';
import { AdminTable } from './AdminTable';

export function AdminCrudPage({ title, resource, fields }) {
  const emptyForm = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? (field.type === 'checkbox' ? false : '')])),
    [fields]
  );
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    try {
      const response = await adminService.list(resource);
      setRows(response.data ?? response);
      setStatus('ready');
    } catch {
      setRows([]);
      setStatus('ready');
      setError('Backend indisponible ou session admin expirée.');
    }
  };

  useEffect(() => {
    load();
  }, [resource]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const payload = normalizePayload(form, fields);
      if (editing) await adminService.update(resource, editing._id || editing.id, payload);
      else await adminService.create(resource, payload);
      setForm(emptyForm);
      setEditing(null);
      await load();
    } catch {
      setError('Opération impossible. Vérifiez le backend, le token admin et la validation.');
    }
  };

  const editRow = (row) => {
    setEditing(row);
    setForm(Object.fromEntries(fields.map((field) => [field.name, valueForInput(row[field.name], field)])));
  };

  const deleteRow = async (row) => {
    try {
      await adminService.remove(resource, row._id);
      await load();
    } catch {
      setError('Suppression impossible.');
    }
  };

  const columns = [
    ...fields.slice(0, 4).map((field) => ({ key: field.name, label: field.label, render: (row) => displayValue(row[field.name]) })),
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-ink" onClick={() => editRow(row)}>Editer</button>
          <button className="rounded-md bg-red-50 px-3 py-1 text-xs font-semibold text-red-700" onClick={() => deleteRow(row)}>Supprimer</button>
        </div>
      )
    }
  ];

  if (status === 'loading') return <LoadingState />;

  return (
    <div className="grid min-w-0 gap-6">
      {error && <ErrorState label={error} />}
      <section className="min-w-0 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-ink">{editing ? `Modifier ${title}` : `Ajouter ${title}`}</h2>
        <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <Field key={field.name} field={field} value={form[field.name]} onChange={(value) => setForm((previous) => ({ ...previous, [field.name]: value }))} />
          ))}
          <div className="flex items-end gap-3 md:col-span-2">
            <Button>{editing ? 'Enregistrer' : 'Creer'}</Button>
            {editing && (
              <button type="button" className="rounded-md px-4 py-2.5 text-sm font-semibold text-ink hover:bg-slate-100" onClick={() => { setEditing(null); setForm(emptyForm); }}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>
      <AdminTable title={title} rows={rows} columns={columns} />
    </div>
  );
}

function Field({ field, value, onChange }) {
  if (field.type === 'textarea') {
    return (
      <label className="block text-sm font-semibold md:col-span-2">
        {field.label}
        <textarea required={field.required !== false} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-24 w-full rounded-md border px-3 py-2 focus-ring" />
      </label>
    );
  }
  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        {field.label}
      </label>
    );
  }
  return (
    <label className="block text-sm font-semibold">
      {field.label}
      <input required={field.required !== false} type={field.type || 'text'} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring" />
    </label>
  );
}

function normalizePayload(form, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const value = form[field.name];
      if (field.array) return [field.name, String(value).split(',').map((item) => item.trim()).filter(Boolean)];
      if (field.type === 'number') return [field.name, Number(value)];
      return [field.name, value];
    })
  );
}

function valueForInput(value, field) {
  if (Array.isArray(value)) return value.join(', ');
  if (field.type === 'checkbox') return Boolean(value);
  return value ?? '';
}

function displayValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  return String(value ?? '');
}
