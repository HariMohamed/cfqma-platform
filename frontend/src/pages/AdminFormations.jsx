import { AdminCrudPage } from '../features/admin/AdminCrudPage';

const fields = [
  { name: 'title', label: 'Titre' },
  { name: 'slug', label: 'Slug', required: false },
  { name: 'sector', label: 'Secteur' },
  { name: 'type', label: 'Type' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'duration', label: 'Duree', required: false },
  { name: 'level', label: 'Niveau', required: false },
  { name: 'requirements', label: 'Conditions (separees par virgule)', array: true, required: false },
  { name: 'skills', label: 'Competences (separees par virgule)', array: true, required: false },
  { name: 'opportunities', label: 'Debouches (separes par virgule)', array: true, required: false },
  { name: 'image', label: 'Image', type: 'image', required: false },
  { name: 'isPublished', label: 'Publiee', type: 'checkbox', defaultValue: true, required: false }
];

export function AdminFormations() {
  return <AdminCrudPage title="Formations" resource="formations" fields={fields} />;
}
