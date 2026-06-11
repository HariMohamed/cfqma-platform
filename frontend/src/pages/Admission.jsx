import { ClipboardEdit, FileCheck2, GraduationCap } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { admissionSteps, trainingLevels, trainingTypes } from '../data/seedData';

export function Admission() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Admission"
        title="Conditions et parcours d inscription"
        description="Le centre accueille les candidats selon le type de formation, le niveau vise et les disponibilites communiquees par l administration."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {trainingTypes.map((type) => (
          <article key={type.title} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-craft" />
              <h2 className="text-2xl font-bold">{type.title}</h2>
            </div>
            <p className="mt-4 leading-7 text-ink/70">{type.description}</p>
            <ul className="mt-5 grid gap-2 text-sm text-ink/75">
              {type.points.map((point) => (
                <li key={point} className="rounded-md bg-paper px-3 py-2">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg bg-ink p-6 text-white shadow-soft">
          <div className="flex items-center gap-3">
            <FileCheck2 className="text-clay" />
            <h2 className="text-2xl font-bold">Niveaux de formation</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {trainingLevels.map((level) => (
              <div key={level.code} className="rounded-md bg-white/10 p-4">
                <p className="text-xl font-bold text-clay">{level.code}</p>
                <p className="mt-1 text-sm text-white/75">{level.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-ink/5">
          <h2 className="text-2xl font-bold">Étapes recommandées</h2>
          <ol className="mt-5 grid gap-3">
            {admissionSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-md bg-paper p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-craft text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm leading-6 text-ink/75">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button to="/pre-registration">
              <ClipboardEdit size={18} /> Pré-inscription
            </Button>
            <Button to="/contact" variant="secondary">
              Contacter le centre
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
