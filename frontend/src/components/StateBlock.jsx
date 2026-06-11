export function LoadingState({ label = 'Chargement...' }) {
  return <div className="rounded-lg bg-white p-8 text-center text-ink/70 shadow-soft dark:bg-white/10 dark:text-white/70">{label}</div>;
}

export function ErrorState({ label = 'Une erreur est survenue.' }) {
  return <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">{label}</div>;
}

export function EmptyState({ label = 'Aucun contenu disponible pour le moment.' }) {
  return (
    <div className="rounded-lg border border-dashed border-ink/20 bg-white/70 p-8 text-center text-ink/60 dark:border-white/20 dark:bg-white/10 dark:text-white/60">
      {label}
    </div>
  );
}
