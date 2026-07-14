import { Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(70%_0.20_38_/_0.15),transparent_50%)]" />
      <div className="mx-auto max-w-container-lg text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-fg-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Novo · v1.0
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Construa <span className="text-gradient animate-shift">interfaces</span><br />
          que parecem mágica.
        </h1>
        <p className="mx-auto mt-6 max-w-prose text-lg text-fg-muted md:text-xl">
          Stack opinado, tokens consistentes, componentes prontos.
          Da ideia ao deploy em uma tarde.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#cta" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-fg shadow-glow transition-transform duration-base hover:scale-[1.02]">
            Começar grátis
          </a>
          <a href="#features" className="rounded-full glass px-6 py-3 font-medium text-fg transition-colors hover:bg-bg-muted">
            Ver demo
          </a>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-border pt-8">
          {[['12k+', 'usuários'], ['99.9%', 'uptime'], ['<200ms', 'p95']].map(([n, l]) => (
            <div key={l}>
              <dt className="text-2xl font-bold tracking-tight md:text-3xl">{n}</dt>
              <dd className="mt-1 text-sm text-fg-subtle">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
