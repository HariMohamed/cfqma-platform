import { Search } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';

export function ApplicationTracking() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Suivi"
        title="Suivi de pré-inscription"
        description="Le suivi en ligne complet dépendra de la validation administrative et de la connexion backend. Cette page clarifie le processus sans inventer de statut automatique."
      />
      <div className="mt-8 rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5">
        <div className="flex items-center gap-3">
          <Search className="text-craft" />
          <h2 className="text-2xl font-bold">Comment suivre votre demande?</h2>
        </div>
        <ol className="mt-5 grid gap-3 text-sm leading-6 text-ink/75">
          <li className="rounded-md bg-paper p-4">1. Envoyez votre demande depuis la page de pré-inscription.</li>
          <li className="rounded-md bg-paper p-4">2. L administration vérifie les informations et la formation souhaitée.</li>
          <li className="rounded-md bg-paper p-4">3. Le centre contacte le candidat pour compléter ou confirmer le dossier.</li>
        </ol>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button to="/pre-registration">Faire une pré-inscription</Button>
          <Button to="/contact" variant="secondary">Contacter le centre</Button>
        </div>
      </div>
    </section>
  );
}
