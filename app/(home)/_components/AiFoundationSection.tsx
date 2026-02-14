export function AiFoundationSection() {
  return (
    <section
      data-reveal
      className="bg-fd-background px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
          AI without a design system is just&nbsp;fancy&nbsp;copy‑paste
        </h2>
        <div className="mx-auto mt-6 space-y-4 text-center text-[15px] leading-relaxed text-fd-muted-foreground sm:text-base">
          <p>
            Everyone ships with AI now. Claude, Cursor, Codex, ChatGPT. You describe a page, the
            model writes the code, you deploy. Sounds great until you look at what it actually
            produced.
          </p>
          <p>
            A button is 36px tall on one page and 42px on the next. The spacing is different in every
            section. Colors are hardcoded hex values that nobody chose on purpose. Every prompt
            generates a fresh set of magic numbers, because the model has nothing to anchor to.
          </p>
          <p>
            Think of it this way. You wouldn't let an intern commit raw SQL strings into every
            endpoint. You'd give them an ORM, a shared schema, a set of rules. The same logic
            applies to AI-generated UI. Without a shared foundation, every output is a one-off.
          </p>
          <p className="text-fd-foreground font-medium">
            Plex UI is that foundation. Design tokens, a 9-step size scale, accessible components.
            One source of truth the model follows on every prompt. The result: every page it
            generates looks like it belongs to the same product.
          </p>
        </div>
      </div>
    </section>
  );
}
