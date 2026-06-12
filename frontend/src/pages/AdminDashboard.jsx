import { useEffect, useState } from 'react';
import { ErrorState, LoadingState } from '../components/StateBlock';
import { adminService } from '../services/adminService';

const statCards = [
  ['formationsCount', 'Formations'],
  ['sectorsCount', 'Secteurs'],
  ['newsCount', 'Actualités'],
  ['eventsCount', 'Événements'],
  ['galleryCount', 'Images'],
  ['registrationsCount', 'Pré-inscriptions'],
  ['pendingRegistrationsCount', 'Demandes à traiter'],
  ['contactMessagesCount', 'Messages'],
  ['unreadContactMessagesCount', 'Messages non lus']
];

export function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    adminService
      .dashboardStats()
      .then((data) => {
        setStats(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') return <LoadingState label="Chargement des statistiques MongoDB..." />;
  if (status === 'error') return <ErrorState label="Impossible de charger les statistiques depuis le backend." />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([key, label]) => (
          <div key={key} className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-3xl font-bold text-craft">{stats[key] ?? 0}</p>
            <p className="mt-1 text-sm text-ink/60">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-lg bg-white p-5 text-sm text-ink/70 shadow-sm">
        Ces statistiques sont calculées depuis MongoDB via l'endpoint admin.
      </p>
    </div>
  );
}
