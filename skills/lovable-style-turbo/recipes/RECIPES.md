# Recipes — lovable-style-emb

Padrões prontos. Componha primeiro com estes; só crie do zero se nenhum serve.

Todos assumem: `design-tokens-emb` importado, paleta `neon-dark` (ajuste classes para outras paletas — semântica é igual).

---

## 01 · Hero com gradient + glow

**Quando:** primeira dobra de landing.
**Anatomia:** chip eyebrow → headline com gradient animado → subtítulo → 2 CTAs → barra de stats.
**Implementação:** `template/src/components/Hero.tsx`
**Variações:**
- Sem stats → reduz altura
- Trocar `Sparkles` por ícone temático (Rocket/Zap/Star)
- Adicionar imagem/screenshot abaixo dos CTAs em `<div className="mt-16 rounded-2xl glass p-2 shadow-2xl"><img/></div>`

---

## 02 · Feature Grid com radial-glow hover

**Quando:** mostrar 3-6 benefícios principais.
**Truque:** mouse-follow via CSS vars `--x`/`--y` setadas em onMouseMove. Performático (sem JS framework).
**Implementação:** `template/src/components/FeatureGrid.tsx`
**Regra:** ícone Lucide `strokeWidth={1.5}` (não 2) — fica mais elegante.

---

## 03 · Pricing 3 tiers

**Quando:** SaaS, infoproduto com versões.
**Anatomia:**
```tsx
<div className="grid gap-6 md:grid-cols-3">
  {tiers.map((t, i) => (
    <div key={t.name} className={`rounded-2xl border p-8 ${i === 1 ? 'border-accent shadow-glow scale-[1.02]' : 'border-border'}`}>
      <h3>{t.name}</h3>
      <p className="mt-2 text-4xl font-bold">{t.price}</p>
      <ul className="mt-6 space-y-3 text-sm">
        {t.features.map(f => <li key={f}>✓ {f}</li>)}
      </ul>
      <button className="mt-8 w-full rounded-full bg-accent py-3 text-accent-fg">Escolher</button>
    </div>
  ))}
</div>
```
**Regra:** plano do meio sempre destacado (border accent + scale leve).

---

## 04 · CTA Final Block

**Quando:** última seção antes do footer.
**Truque:** gradiente brand animado + sombra glow grande.
**Implementação:** `template/src/components/CTA.tsx`

---

## 05 · Footer multi-coluna

**Quando:** site institucional / produto.
**Anatomia:** 4 colunas (logo+desc · produto · empresa · legal) + linha bottom com social.
**Versão simples já no template** (`Footer.tsx`).
**Versão completa:**
```tsx
<footer className="border-t border-border">
  <div className="mx-auto max-w-container-xl px-6 py-16 grid gap-12 md:grid-cols-4">
    <div>
      <span className="text-gradient font-semibold">TURBO</span>
      <p className="mt-3 text-sm text-fg-muted">Tagline curta.</p>
    </div>
    {colunas.map(c => (
      <div key={c.title}>
        <h4 className="text-sm font-semibold">{c.title}</h4>
        <ul className="mt-3 space-y-2 text-sm text-fg-muted">
          {c.links.map(l => <li key={l.href}><a href={l.href} className="hover:text-fg">{l.label}</a></li>)}
        </ul>
      </div>
    ))}
  </div>
</footer>
```

---

## 06 · Nav Sticky Glass

**Quando:** sempre que houver scroll longo.
**Truque:** detectar `window.scrollY > 8` e aplicar `glass` (backdrop-filter blur).
**Implementação:** `template/src/components/Nav.tsx`

---

## 07 · FAQ Accordion

**Quando:** vendas, low-ticket, evento.
**Sem dependência:** use `<details>` nativo.
```tsx
{faqs.map(f => (
  <details key={f.q} className="group border-b border-border py-4">
    <summary className="cursor-pointer list-none flex justify-between items-center font-medium">
      {f.q}
      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
    </summary>
    <p className="mt-3 text-fg-muted">{f.a}</p>
  </details>
))}
```

---

## 08 · Testimonials Marquee

**Quando:** prova social abundante.
**Truque:** duplicar lista + animar `translateX` com `@keyframes` infinito.
```css
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.marquee { animation: marquee 40s linear infinite; }
```
```tsx
<div className="overflow-hidden">
  <div className="marquee flex gap-6 w-max">
    {[...items, ...items].map((t, i) => <Card key={i} {...t} />)}
  </div>
</div>
```

---

## Princípios cross-recipe

1. **Spacing múltiplo de 4.** Sempre.
2. **Border radius coerente.** `rounded-2xl` em cards, `rounded-full` em pills/CTAs, `rounded-md` em inputs.
3. **Hover sutil.** `-translate-y-1` ou `scale-[1.02]`, nunca mais.
4. **Glow só em destaques.** Não use `shadow-glow` em tudo — perde efeito.
5. **Texto gradient só no headline principal.** Não em subtítulo, não em body.
6. **Glass = espacial.** Use em nav fixa, modais, overlays. Não em cards normais.
