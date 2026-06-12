import { AdminInboxPage } from '../features/admin/AdminInboxPage';

const columns = [
  { key: 'trackingCode', label: 'Code de suivi', render: (row) => row.trackingCode || '-' },
  { key: 'fullName', label: 'Nom' },
  { key: 'phone', label: 'Téléphone' },
  { key: 'desiredFormation', label: 'Formation' },
  { key: 'createdAt', label: 'Date', render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '') }
];

export function AdminRegistrations() {
  return (
    <AdminInboxPage
      title="Pré-inscriptions"
      resource="registrations"
      columns={columns}
      statusOptions={['new', 'reviewing', 'accepted', 'rejected']}
      allowPublicMessage
    />
  );
}
