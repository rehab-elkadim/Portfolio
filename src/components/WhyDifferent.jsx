import { useEffect, useRef, useState } from "react";
import { differentiators } from "../data/differentiators";
import Reveal from "./Reveal";

const layerColors = ["255 74 216", "90 152 222", "66 211 146"];

export default function WhyDifferent() {
  const stage = useRef(null);
  useEffect(() => {
    const element = stage.current;
    const layers = [...element.querySelectorAll(".product-layer")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    const update = () => {
      frame = null;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.92 - rect.top) / (window.innerHeight * 0.6)));
      layers.forEach((layer, index) => {
        const phase = Math.max(0, Math.min(1, (progress - index * 0.07) / 0.86));
        const eased = phase * phase * (3 - 2 * phase);
        layer.style.setProperty("--layer-fold", reduced.matches ? "0" : (1 - eased).toFixed(4));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, []);
  const [selected, setSelected] = useState(null);
  const toggle = (index) => setSelected((current) => current === index ? null : index);
  return (
    <section className="layer-section border-y border-ink/5" aria-labelledby="layers-heading">
      <div className="page-shell section-space">
        <Reveal><p className="eyebrow">Not just a good looking site</p><h2 id="layers-heading" className="section-heading mt-4">Thoughtful on the surface.<br />Solid underneath.</h2></Reveal>
        <div ref={stage} className={`layer-stage ${selected !== null ? "has-selection" : ""}`} onKeyDown={(event) => { if (event.key === "Escape") setSelected(null); }}>
          <div className="layer-intro" aria-hidden={selected !== null}><p className="font-heading text-2xl font-medium tracking-tight">I don’t think in pages. I think in outcomes.</p><p className="mt-4 max-w-xs leading-relaxed text-ink-soft">A website can be beautiful and still fail its job. I think beyond the interface — about the user, the business goal, the technical decisions, and what happens after launch.</p></div>
          <div className="layer-floor" aria-hidden="true" />
          {differentiators.map(({ title, body }, i) => (
            <button key={title} id={`product-layer-${i}`} type="button" onClick={() => toggle(i)} aria-expanded={selected === i} aria-label={`${selected === i ? "Close" : "Explore"} ${title}`} className={`product-layer ${selected === i ? "is-open" : ""}`} style={{ "--layer-color": layerColors[i], "--layer-offset": `${(i - 1) * 64}px`, "--layer-order": 3 - i, "--fold-shift": (138 - i * 54) + "px" }}>
              <span className="layer-grid" aria-hidden="true" />
              <span className="layer-toggle" aria-hidden="true">{selected === i ? "×" : "+"}</span>
              <span className="layer-title">{title}</span>
              <span className="layer-body" aria-hidden={selected !== i}>{body}</span>
              <span className="layer-footnote" aria-hidden="true">{selected === i ? "Click to return to the layers ↗" : "Explore this layer ↗"}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}






