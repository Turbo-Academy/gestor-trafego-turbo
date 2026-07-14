import { useEffect, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-sticky transition-all duration-base ${
        scrolled ? 'glass shadow-md' : ''
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-container-xl items-center justify-between px-6">
        <a href="#" className="font-semibold tracking-tight">
          <span className="text-gradient">TURBO</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-fg-muted md:flex">
          <li><a href="#features" className="transition-colors hover:text-fg">Features</a></li>
          <li><a href="#pricing" className="transition-colors hover:text-fg">Pricing</a></li>
          <li><a href="#faq" className="transition-colors hover:text-fg">FAQ</a></li>
        </ul>
        <a
          href="#cta"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-fg shadow-sm transition-all duration-base hover:shadow-glow"
        >
          Começar
        </a>
      </nav>
    </header>
  )
}
