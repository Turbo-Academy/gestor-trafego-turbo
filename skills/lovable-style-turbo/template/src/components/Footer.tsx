export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-container-xl flex-col items-center justify-between gap-4 text-sm text-fg-subtle md:flex-row">
        <p>© {new Date().getFullYear()} Turbo Academy. Todos os direitos reservados.</p>
        <ul className="flex gap-6">
          <li><a href="#" className="transition-colors hover:text-fg">Termos</a></li>
          <li><a href="#" className="transition-colors hover:text-fg">Privacidade</a></li>
          <li><a href="#" className="transition-colors hover:text-fg">Contato</a></li>
        </ul>
      </div>
    </footer>
  )
}
