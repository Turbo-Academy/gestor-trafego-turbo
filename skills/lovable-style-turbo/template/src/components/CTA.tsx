export function CTA() {
  return (
    <section id="cta" className="px-6 py-24">
      <div className="mx-auto max-w-container-lg overflow-hidden rounded-3xl bg-gradient-brand animate-shift p-12 text-center text-accent-fg shadow-glow md:p-20">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          Pronto pra construir?
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-lg opacity-90">
          Stack pronto, tokens calibrados, recipes na mão.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-bg px-8 py-4 font-medium text-fg shadow-xl transition-transform duration-base hover:scale-[1.02]"
        >
          Começar agora
        </a>
      </div>
    </section>
  )
}
