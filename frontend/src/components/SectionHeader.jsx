export function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-craft">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink dark:text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-ink/70 dark:text-white/70">{description}</p>}
    </div>
  );
}
