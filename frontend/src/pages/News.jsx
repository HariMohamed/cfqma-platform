import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { news } from '../data/seedData';

export function News() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Actualités" title="News et activités" description="Articles et activités du centre." />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {news.map((item) => (
          <Card key={item.slug} to={`/news/${item.slug}`} image={item.coverImage} title={item.title} description={item.excerpt} meta={item.category} />
        ))}
      </div>
    </section>
  );
}
