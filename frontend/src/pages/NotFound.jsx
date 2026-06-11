import { Button } from '../components/Button';

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-craft">404</p>
      <h1 className="mt-3 text-4xl font-bold">Page introuvable</h1>
      <p className="mt-4 text-ink/70">La page demandée n existe pas ou a été déplacée.</p>
      <Button to="/" className="mt-8">Retour à l accueil</Button>
    </section>
  );
}
