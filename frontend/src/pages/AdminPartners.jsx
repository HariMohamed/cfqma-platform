import { AdminCrudPage } from '../features/admin/AdminCrudPage';

const fields = [
  { name: 'name', label: 'Nom' },
  { name: 'logo', label: 'Logo', type: 'image', required: false },
  { name: 'url', label: 'Lien officiel', required: false },
  { name: 'alt', label: 'Texte alternatif', required: false },
  { name: 'order', label: 'Ordre', type: 'number', defaultValue: 0, required: false },
  { name: 'isPublished', label: 'Publié', type: 'checkbox', defaultValue: true, required: false }
];

export function AdminPartners() {
  return <AdminCrudPage title="Partenaires" resource="partners" fields={fields} />;
}
