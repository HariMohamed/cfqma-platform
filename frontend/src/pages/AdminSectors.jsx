import { AdminCrudPage } from '../features/admin/AdminCrudPage';
import { sectors } from '../data/seedData';

const fields = [
  { name: 'title', label: 'Titre' },
  { name: 'slug', label: 'Slug', required: false },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image URL', required: false },
  { name: 'formations', label: 'Formations slugs (separees par virgule)', array: true, required: false },
  { name: 'isPublished', label: 'Publie', type: 'checkbox', defaultValue: true, required: false }
];

export function AdminSectors() {
  return <AdminCrudPage title="Secteurs" resource="sectors" fields={fields} seedRows={sectors} />;
}
