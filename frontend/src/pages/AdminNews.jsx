import { AdminCrudPage } from '../features/admin/AdminCrudPage';

const fields = [
  { name: 'title', label: 'Titre' },
  { name: 'slug', label: 'Slug', required: false },
  { name: 'excerpt', label: 'Extrait', type: 'textarea' },
  { name: 'content', label: 'Contenu', type: 'textarea' },
  { name: 'coverImage', label: 'Image de couverture', required: false },
  { name: 'category', label: 'Categorie', required: false },
  { name: 'status', label: 'Statut draft/published', defaultValue: 'draft' },
  { name: 'publishedAt', label: 'Date publication', required: false }
];

export function AdminNews() {
  return <AdminCrudPage title="Actualités" resource="news" fields={fields} />;
}
