export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-white/90 backdrop-blur-md">
      <nav aria-label="Main navigation" className="page-shell flex h-20 items-center justify-between gap-4">
        <a href="#top" className="font-heading text-xl font-semibold tracking-tight">Rehab <span className="text-blue">Elkadim</span></a>
        <div className="flex items-center gap-7">
          <a href="#work" className="text-link hidden text-sm md:inline-flex">Work</a>
          <a href="#process" className="text-link hidden text-sm md:inline-flex">Approach</a>
          <a href="#content" className="text-link hidden text-sm md:inline-flex">Beyond the code</a>
          <a href="https://wa.me/201275949633" target="_blank" rel="noreferrer" className="header-contact text-link min-h-8 rounded-full border border-ink/50 px-3 text-sm font-medium">Get in touch</a>
        </div>
      </nav>
    </header>
  );
}




