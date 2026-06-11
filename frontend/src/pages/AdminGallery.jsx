import { AdminCrudPage } from '../features/admin/AdminCrudPage';

const fields = [
  { name: 'title', label: 'Titre' },
  { name: 'imageUrl', label: 'Image', type: 'image' },
  { name: 'alt', label: 'Texte alternatif' },
  { name: 'category', label: 'Categorie', required: false },
  { name: 'description', label: 'Description', type: 'textarea', required: false },
  { name: 'isPublished', label: 'Publiee', type: 'checkbox', defaultValue: true, required: false }
];

export function AdminGallery() {
  return <AdminCrudPage title="Galerie" resource="gallery" fields={fields} />;
}
