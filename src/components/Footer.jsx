import { socialLinks } from "../data/contact";
export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="page-shell flex flex-wrap items-center justify-between gap-5 py-7 text-xs text-ink-soft">
        <p>© {new Date().getFullYear()} Rehab E. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">{socialLinks.filter(({ url }) => url).map(({ label, url }) => <a key={label} href={url} target="_blank" rel="noreferrer" className="text-link">{label} ↗</a>)}<a href="#top" className="text-link">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
