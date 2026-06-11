import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ClipboardEdit, GraduationCap, Handshake, Images, Newspaper } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { SectionHeader } from '../components/SectionHeader';
import { centerFacts, formations, news, sectors, stats, trainingTypes } from '../data/seedData';
import { useI18n } from '../hooks/useI18n';

export function Home() {
  const { t } = useI18n();
  const statLabels = t('home.stats');
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img src="/images/page.jpg" alt="Façade du CFQMA Salé" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#071d2b]/95 via-[#12382d]/82 to-[#12382d]/45 dark:from-[#06120f]/96 dark:via-[#0b231c]/88" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#12382d] to-transparent" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-clay">{t('hero.eyebrow')}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{t('hero.title')}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">{t('hero.description')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/formations" className="bg-clay text-ink hover:bg-white">
                {t('hero.formationsCta')} <ArrowRight size={18} />
              </Button>
              <Button to="/pre-registration" variant="secondary" className="bg-white text-ink hover:bg-paper">
                <ClipboardEdit size={18} /> {t('hero.registrationCta')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#12382d] py-10 text-white dark:bg-[#0b231c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PartnerMarquee tone="green" showNames />
        </div>
      </section>

      <section className="bg-[#12382d] pb-10 text-white dark:bg-[#0b231c]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((item, index) => (
            <div key={item.label} className="rounded-lg bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur">
              <p className="text-3xl font-bold text-clay">{item.value}</p>
              <p className="mt-2 text-sm text-white/75">{Array.isArray(statLabels) ? statLabels[index] : item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t('home.centerEyebrow')} title={t('home.centerTitle')} description={t('home.centerDescription')} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {centerFacts.map((fact) => (
            <div key={fact.label} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-craft">{fact.label}</p>
              <p className="mt-2 text-lg font-bold text-ink dark:text-white">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={t('home.trainingEyebrow')} title={t('home.trainingTitle')} description={t('home.trainingDescription')} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {trainingTypes.map((type) => (
              <article key={type.title} className="rounded-lg bg-paper p-6 ring-1 ring-ink/5 dark:bg-white/10 dark:ring-white/10">
                <h3 className="text-2xl font-bold text-ink dark:text-white">{type.title}</h3>
                <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{type.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {type.points.map((point) => (
                    <span key={point} className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm dark:bg-white/10 dark:text-white">
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t('home.formationsEyebrow')} title={t('home.formationsTitle')} description={t('home.formationsDescription')} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {formations.slice(0, 6).map((item) => (
            <Card key={item.slug} to={`/formations/${item.slug}`} image={item.image} title={item.title} description={item.description} meta={item.type} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={t('home.sectorsEyebrow')} title={t('home.sectorsTitle')} description={t('home.sectorsDescription')} />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sectors.map((item) => (
              <Card key={item.slug} to={`/sectors/${item.slug}`} image={item.image} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader eyebrow={t('home.newsEyebrow')} title={t('home.newsTitle')} description={t('home.newsDescription')} />
            <div className="mt-6 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <Newspaper size={18} /> <span>{t('home.backendReady')}</span>
            </div>
            <div className="mt-3 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <Images size={18} /> <span>{t('home.galleryReady')}</span>
            </div>
            <div className="mt-3 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <GraduationCap size={18} /> <span>{t('home.managementReady')}</span>
            </div>
            <div className="mt-3 flex gap-3 text-sm text-ink/70 dark:text-white/70">
              <Handshake size={18} /> <span>{t('home.accompanimentReady')}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/accompagnement" variant="secondary">
                {t('home.accompanimentCta')}
              </Button>
              <Button to="/admission" variant="ghost">
                {t('nav.admission')}
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {news.map((item) => (
              <Card key={item.slug} to={`/news/${item.slug}`} image={item.coverImage} title={item.title} description={item.excerpt} meta={item.category} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
