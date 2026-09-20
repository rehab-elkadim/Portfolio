import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import ShortCard from "./ShortCard";
import { ChevronIcon } from "./Decorations";
import { shorts } from "../data/shorts";
import { socialProfiles } from "../data/social";

const SWIPE_THRESHOLD = 40;

export default function ContentSection() {
  const n = shorts.length;
  const [visibleRadius, setVisibleRadius] = useState(1.35);
  useEffect(() => {
    const update = () => setVisibleRadius(1.35);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const [position, setPosition] = useState(Math.floor((n - 1) / 2));
  const [visualPosition, setVisualPosition] = useState(position);
  const visualRef = useRef(position);
  useEffect(() => {
    const from = visualRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame;
    let start;
    const animate = (now) => {
      start ??= now;
      const progress = reduced ? 1 : Math.min((now - start) / 700, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      visualRef.current = from + (position - from) * eased;
      setVisualPosition(visualRef.current);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [position]);
  const [playingId, setPlayingId] = useState(null);
  const dragX = useRef(null);
  const swiped = useRef(false);
  const activeIndex = ((position % n) + n) % n;
  const step = (direction) => { setPlayingId(null); setPosition((p) => p + direction); };

  const onPointerDown = (event) => { dragX.current = event.clientX; swiped.current = false; };
  const onPointerUp = (event) => {
    if (dragX.current === null) return;
    const delta = event.clientX - dragX.current; dragX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) { swiped.current = true; step(delta > 0 ? -1 : 1); }
  };
  return (
    <section id="content" className="reels-section pb-10 pt-8 sm:pb-12 sm:pt-10">
      <div className="page-shell">
        <Reveal>
          <h2 className="section-heading mt-4 text-center text-[clamp(2.1rem,4.6vw,3.25rem)]">Beyond the Code</h2>
          <p className="mx-auto mt-5 max-w-lg text-center leading-relaxed text-ink-soft">Meet Rehab The Content Creator, I have a simple mission : Make Coding easy for developers, job seekrs and create amazing products along the way!</p>
        </Reveal>

        <Reveal className="mt-8 flex justify-center gap-6 sm:gap-8" delay={100}>
          {socialProfiles.map(({ label, url, Icon, color }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} className="social-icon-link" style={{ "--brand-color": color }}>
              <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
            </a>
          ))}
        </Reveal>
      </div>

      <Reveal className="reel-carousel relative mt-10 sm:mt-12" delay={180}>


        <div className="reel-viewport" role="region" aria-roledescription="carousel" aria-label="Coding reels">
          <div
            className={"reel-track " + (playingId ? "has-playing" : "")}
            onClickCapture={(event) => { if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false; } }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { dragX.current = null; }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
            }}
          >
            {shorts.map((short, index) => {
              // Recycle each real reel only after it has passed the screen edge.
              const offset = ((index - visualPosition + n / 2) % n + n) % n - n / 2;
              const distance = ((index - activeIndex + n / 2) % n + n) % n - n / 2;
              const isCenter = index === activeIndex;
              return (
                <div key={short.id} className="reel-orbit"
                  style={{ "--reel-offset": offset, "--absolute-offset": Math.abs(offset), "--reel-drop": offset * offset * 22 + "px", "--reel-tilt": offset * 9 + "deg", zIndex: isCenter ? 10 : 1 }}
                  inert={Math.abs(offset) > visibleRadius} aria-hidden={Math.abs(offset) > visibleRadius ? true : undefined}>
                  <ShortCard title={short.title} videoId={short.videoId} isCenter={isCenter}
                    playing={playingId === short.id && isCenter} hasActivePlayback={Boolean(playingId)}
                    onActivate={() => (isCenter ? setPlayingId(short.id) : step(distance))} onStop={() => setPlayingId(null)} />
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" className="shorts-nav shorts-nav-previous" onClick={() => step(-1)} aria-label="Previous short">
          <ChevronIcon direction="left" className="h-6 w-6" />
        </button>
        <button type="button" className="shorts-nav shorts-nav-next" onClick={() => step(1)} aria-label="Next short">
          <ChevronIcon className="h-6 w-6" />
        </button>
        <p className="sr-only" aria-live="polite" aria-atomic="true">Reel {activeIndex + 1} of {n}: {shorts[activeIndex].title}</p>
      </Reveal>

    </section>
  );
}
