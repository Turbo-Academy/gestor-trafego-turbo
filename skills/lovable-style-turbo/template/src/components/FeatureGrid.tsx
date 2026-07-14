import { Zap, Shield, Layers, Rocket } from 'lucide-react'
import { useRef } from 'react'

const features = [
  { icon: Zap,     title: 'Rápido por padrão', body: 'Vite + ESM. HMR instantâneo, build em segundos.' },
  { icon: Shield,  title: 'Tipado de ponta a ponta', body: 'TypeScript strict pega bug antes de PR.' },
  { icon: Layers,  title: 'Tokens coerentes', body: 'Toda peça importa do design-tokens-emb.' },
  { icon: Rocket,  title: 'Deploy em 1 clique', body: 'Vercel, Netlify, Cloudflare. Você escolhe.' },
]

export function FeatureGrid() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-container-xl">
        <div className="mx-auto max-w-prose text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Tudo que você precisa.<br />
            <span className="text-fg-muted">Nada que você não precise.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, body }: typeof features[number]) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--y', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="glow-hover group relative rounded-2xl border border-border bg-bg-elevated p-6 transition-transform duration-base hover:-translate-y-1"
    >
      <div className="relative">
        <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-fg-muted">{body}</p>
      </div>
    </div>
  )
}
