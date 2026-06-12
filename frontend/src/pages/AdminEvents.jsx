import { AdminCrudPage } from '../features/admin/AdminCrudPage';

const eventTypeOptions = [
  { value: 'exhibition', label: 'Exposition' },
  { value: 'event', label: 'Événement' },
  { value: 'workshop', label: 'Atelier' },
  { value: 'announcement', label: 'Annonce' }
];

const fields = [
  { name: 'title', label: 'Titre' },
  { name: 'slug', label: 'Slug', required: false },
  { name: 'type', label: 'Type', type: 'select', options: eventTypeOptions, defaultValue: 'exhibition' },
  { name: 'excerpt', label: 'Extrait', type: 'textarea', required: false },
  { name: 'description', label: 'Description', type: 'textarea', required: false },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'endDate', label: 'Date de fin', type: 'date', required: false },
  { name: 'location', label: 'Lieu', required: false },
  { name: 'coverImage', label: 'Image de couverture', type: 'image', required: false },
  { name: 'galleryImages', label: 'Images galerie (URLs séparées par virgule)', type: 'textarea', array: true, required: false },
  { name: 'participants', label: 'Participants (séparés par virgule)', type: 'textarea', array: true, required: false },
  { name: 'relatedFormations', label: 'Formations liées (séparées par virgule)', type: 'textarea', array: true, required: false },
  { name: 'isPublished', label: 'Publié', type: 'checkbox', defaultValue: true }
];

export function AdminEvents() {
  return <AdminCrudPage title="Événements" resource="events" fields={fields} />;
}
