import { formations, galleryItems, news, sectors } from '../data/seedData';

export function AdminDashboard() {
  const stats = [
    { label: 'Formations', value: formations.length },
    { label: 'Secteurs', value: sectors.length },
    { label: 'Actualités', value: news.length },
    { label: 'Images', value: galleryItems.length }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-3xl font-bold text-craft">{item.value}</p>
            <p className="mt-1 text-sm text-ink/60">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-lg bg-white p-5 text-sm text-ink/70 shadow-sm">
        Les ecrans CRUD utilisent les routes admin Express quand le backend est disponible. Les donnees seed servent au premier rendu frontend.
      </p>
    </div>
  );
}
