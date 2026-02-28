import clsx from 'clsx';

/**
 * Shared wrapper for every landing-page section.
 * Ensures consistent vertical rhythm, horizontal padding, and container width.
 */
export function LandingSection({
  children,
  id,
  className,
  as: Tag = 'section',
  maxWidth = '4xl',
  'data-reveal': dataReveal,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: 'section' | 'div';
  maxWidth?: '2xl' | '4xl' | '5xl';
  'data-reveal'?: boolean;
}) {
  const widthClass =
    maxWidth === '2xl' ? 'max-w-2xl' : maxWidth === '5xl' ? 'max-w-5xl' : 'max-w-4xl';

  return (
    <Tag
      id={id}
      data-reveal={dataReveal ? '' : undefined}
      className={clsx('bg-fd-background px-6 py-16 md:py-20', className)}
    >
      <div className={clsx('mx-auto', widthClass)}>
        {children}
      </div>
    </Tag>
  );
}

/** Centered section heading (h2) + optional description (p). */
export function SectionHeading({
  children,
  description,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
        {children}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-fd-muted-foreground text-balance">
          {description}
        </p>
      )}
    </div>
  );
}

/** Centered CTA block below section content. */
export function SectionCta({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex justify-center">
      {children}
    </div>
  );
}
