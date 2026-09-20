// A minimal browser window keeps project previews clean and familiar.
export default function BrowserFrame({ image, imageAlt, label, href, imageFit = "cover", imageBackground = "#111111", className = "" }) {
  const preview = <img src={image} alt={imageAlt} className={`aspect-[16/10] w-full ${imageFit === "contain" ? "object-contain" : "object-cover object-top"}`} style={imageFit === "contain" ? { backgroundColor: imageBackground } : undefined} width={1400} height={875} loading="lazy" />;
  return (
    <figure className={`browser-frame relative m-0 ${className}`}>
      <div className="browser-body overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <div className="flex h-11 items-center gap-3 border-b border-ink/10 bg-[#fafafa] px-4">
          <div aria-hidden="true" className="flex shrink-0 gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div>
          <span className="min-w-0 flex-1 truncate text-center text-[11px] text-ink-soft">{label}</span><span aria-hidden="true" className="w-3 text-sm text-ink-soft/60">＋</span>
        </div>
        {href ? <a href={href} target="_blank" rel="noreferrer" aria-label={`Explore ${label} mock site (opens in a new tab)`} className="group relative block overflow-hidden bg-white">{preview}<span className="absolute bottom-3 right-3 rounded-full bg-white px-4 py-2 text-xs font-semibold shadow-sm">Explore site ↗</span></a> : <div className="overflow-hidden bg-white">{preview}</div>}
      </div>
    </figure>
  );
}


