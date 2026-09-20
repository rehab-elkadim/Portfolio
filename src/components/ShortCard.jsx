import { useEffect, useRef } from "react";

// A single card in the reel. `isCenter` decides what a click does: bring a
// side card to the center, or play the one that's already centered.
export default function ShortCard({ title, videoId, isCenter, playing, hasActivePlayback, onActivate, onStop }) {
  const trigger = useRef(null);
  const close = useRef(null);
  const hasVideo = Boolean(videoId);
  const thumbnail = hasVideo ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined;
  useEffect(() => {
    if (playing) close.current?.focus({ preventScroll: true });
  }, [playing]);
  const stop = () => {
    onStop();
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  };
  return (
    <div
      className={`short-card ${isCenter ? "is-center" : ""} ${playing ? "is-playing" : ""}`}
      onKeyDown={(event) => { if (event.key === "Escape" && playing) stop(); }}
    >
      {playing && hasVideo ? (
        <>
          <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          <button ref={close} type="button" className="short-card-close" onClick={stop} aria-label={`Stop ${title}`}>×</button>
        </>
      ) : (
        <button
          ref={trigger}
          type="button"
          className="short-card-trigger"
          onClick={() => !hasActivePlayback && onActivate()}
          aria-label={hasVideo ? (isCenter ? `Play ${title}` : `Bring ${title} to the front`) : `${title} (coming soon)`}
          disabled={!hasVideo || hasActivePlayback}
          tabIndex={hasActivePlayback && !isCenter ? -1 : 0}
        >
          {thumbnail ? <img src={thumbnail} alt="" className="short-card-thumb" loading="lazy" /> : <span className="short-card-thumb short-card-placeholder" aria-hidden="true" />}
          <span className="short-card-scrim" aria-hidden="true" />
          {hasVideo && isCenter && <span className="short-card-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>}
          <span className="short-card-label">{title}</span>
          <span className="short-card-wash" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
