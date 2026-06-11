import { AdminInboxPage } from '../features/admin/AdminInboxPage';

const columns = [
  { key: 'fullName', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'subject', label: 'Sujet' },
  { key: 'createdAt', label: 'Date', render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '' }
];

export function AdminContacts() {
  return <AdminInboxPage title="Messages de contact" resource="contact-messages" columns={columns} statusOptions={['new', 'read', 'archived']} />;
}
