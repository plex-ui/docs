const stats = [
  { value: '22,000+', label: 'Figma variants' },
  { value: '35', label: 'Components' },
  { value: '6,600+', label: 'Icons' },
  { value: '9', label: 'Sizes per control' },
  { value: '3', label: 'Token layers' },
];

export function StatsBar() {
  return (
    <div
      data-reveal
      className="border-y border-fd-border bg-fd-muted/30 px-6 py-10 sm:py-12"
    >
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
              {stat.value}
            </span>
            <span className="mt-1 text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
