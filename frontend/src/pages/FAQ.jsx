import { SectionHeader } from '../components/SectionHeader';
import { faqItems } from '../data/seedData';

export function FAQ() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Questions fréquentes" description="Réponses rapides sur l admission, les formations et le suivi des demandes." />
      <div className="mt-8 grid gap-4">
        {faqItems.map((item) => (
          <article key={item.question} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/5">
            <h2 className="text-lg font-bold">{item.question}</h2>
            <p className="mt-3 leading-7 text-ink/70">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
