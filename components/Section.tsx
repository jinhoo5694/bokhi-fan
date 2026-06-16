export default function Section({
  id,
  emoji,
  title,
  subtitle,
  children,
}: {
  id: string;
  emoji?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-6 px-5 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-cocoa sm:text-3xl">
            {emoji && <span className="mr-2">{emoji}</span>}
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-cocoa-soft">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
