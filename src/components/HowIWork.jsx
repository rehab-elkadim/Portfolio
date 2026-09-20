import { useEffect, useRef, useState } from "react";
import { processSteps } from "../data/process";
import Reveal from "./Reveal";

const accents = ["#ff4ad8", "#5a98de", "#42d392"];

function ProcessDrawing({ step }) {
  return (
    <svg viewBox="0 0 560 390" fill="none" className="process-drawing" aria-hidden="true">
      {step === 0 && <>
        <circle cx="290" cy="190" r="145" stroke="#ff4ad8" strokeOpacity=".25" strokeDasharray="3 8" />
        <path className="sketch-stroke" d="M110 110C80 235 155 302 280 304M363 71C463 95 485 170 448 265" stroke="#202020" strokeOpacity=".35" strokeLinecap="round" />
        <g transform="rotate(-7 280 194)">
          <rect x="171" y="66" width="238" height="269" rx="8" fill="#202020" fillOpacity=".04" transform="translate(5 8)" />
          <rect x="171" y="66" width="238" height="269" rx="8" fill="white" stroke="#202020" strokeOpacity=".18" />
          <rect x="249" y="53" width="82" height="27" rx="2" fill="#ff4ad8" fillOpacity=".3" />
          <text x="198" y="119" className="sketch-kicker">START WITH WHY</text>
          <text x="198" y="155" className="sketch-title">The brief.</text>
          <path d="M198 172H320" stroke="#ff4ad8" strokeWidth="6" strokeLinecap="round" />
          {["Who is it for?", "What needs to change?", "What does success mean?"].map((label, i) => <g key={label}><circle cx="202" cy={204 + i * 37} r="4" fill="#ff4ad8" /><text x="217" y={208 + i * 37} className="sketch-label">{label}</text></g>)}
        </g>
        <g transform="rotate(8 107 118)"><rect x="45" y="91" width="112" height="54" rx="13" fill="#ffe0f8" stroke="#ff4ad8" strokeOpacity=".35" /><text x="68" y="124" className="sketch-label">The people</text></g>
        <g transform="rotate(6 440 267)"><rect x="387" y="241" width="119" height="54" rx="13" fill="#ffe0f8" stroke="#ff4ad8" strokeOpacity=".35" /><text x="408" y="274" className="sketch-label">The purpose</text></g>
        <path d="m451 83 4 14 14 4-14 4-4 14-4-14-14-4 14-4Z" fill="#ff4ad8" />
      </>}
      {step === 1 && <>
        <path className="sketch-stroke" d="M110 262V316H430V259M279 101V50H429V118" stroke="#5a98de" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="rotate(-4 265 190)">
          <rect x="94" y="83" width="336" height="224" rx="15" fill="#202020" fillOpacity=".04" transform="translate(6 8)" />
          <rect x="94" y="83" width="336" height="224" rx="15" fill="white" stroke="#202020" strokeOpacity=".2" />
          <path d="M94 117H430" stroke="#202020" strokeOpacity=".13" />
          <circle cx="111" cy="100" r="3" fill="#ff4ad8" /><circle cx="123" cy="100" r="3" fill="#ffbb00" /><circle cx="135" cy="100" r="3" fill="#42d392" />
          <rect x="116" y="141" width="125" height="12" rx="3" fill="#5a98de" fillOpacity=".6" /><rect x="116" y="165" width="99" height="6" rx="3" fill="#202020" fillOpacity=".14" /><rect x="116" y="178" width="116" height="6" rx="3" fill="#202020" fillOpacity=".14" />
          <rect x="116" y="204" width="76" height="24" rx="12" stroke="#5a98de" /><rect x="269" y="140" width="137" height="91" rx="9" fill="#e5effc" /><circle cx="337" cy="183" r="24" stroke="#5a98de" /><path d="m322 198 31-31" stroke="#5a98de" />
          {[116, 215, 314].map((x) => <rect key={x} x={x} y="253" width="90" height="31" rx="6" fill="#5a98de" fillOpacity=".13" />)}
        </g>
        <g transform="rotate(7 438 154)"><rect x="383" y="117" width="114" height="76" rx="12" fill="#dceaff" stroke="#5a98de" strokeOpacity=".45" /><text x="408" y="150" className="sketch-title">&lt;/&gt;</text><text x="401" y="176" className="sketch-kicker">COMPONENTS</text></g>
        <rect x="221" y="294" width="116" height="46" rx="23" fill="white" stroke="#5a98de" /><text x="245" y="323" className="sketch-label">REST APIs</text>
        <text x="81" y="60" className="sketch-note">the details connect.</text>
      </>}
      {step === 2 && <>
        <circle cx="277" cy="191" r="122" fill="#42d392" fillOpacity=".08" />
        <circle cx="277" cy="191" r="93" stroke="#42d392" strokeOpacity=".3" />
        <circle cx="277" cy="191" r="64" fill="#d5f6e6" stroke="#42d392" />
        <path className="sketch-stroke" d="m248 190 20 21 40-45" stroke="#238653" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path className="sketch-stroke" d="M75 275C125 345 330 371 426 224C462 169 425 108 388 84" stroke="#202020" strokeOpacity=".4" strokeDasharray="5 7" />
        <g transform="rotate(-13 412 76)"><path d="m379 75 72-29-25 72-16-29-31-14Z" fill="#42d392" fillOpacity=".5" stroke="#238653" strokeLinejoin="round" /><path d="m410 89 41-43" stroke="#238653" /></g>
        <g transform="rotate(-8 129 135)"><rect x="59" y="109" width="121" height="51" rx="12" fill="white" stroke="#42d392" /><text x="78" y="140" className="sketch-label">✓ Tested</text></g>
        <g transform="rotate(6 418 254)"><rect x="372" y="229" width="124" height="51" rx="12" fill="#d5f6e6" stroke="#42d392" /><text x="390" y="260" className="sketch-label">↗ Deployed</text></g>
        <text x="204" y="349" className="sketch-note">launch. learn. improve.</text>
        <path d="m124 244 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" fill="#42d392" />
      </>}
    </svg>
  );
}

export default function HowIWork({ heading = "From the first idea to the final detail.", className = "" }) {
  const [active, setActive] = useState(0);
  const section = useRef(null);
  const hasStarted = useRef(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      if (!inView) hasStarted.current = false;
      setVisible(inView);
    }, { threshold: 0.1 });
    observer.observe(section.current);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { observer.disconnect(); preference.removeEventListener("change", updateMotion); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);
  const autoplay = visible && pageVisible && !reduced;
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => {
      hasStarted.current = true;
      setActive((current) => (current + 1) % processSteps.length);
    }, hasStarted.current ? 3000 : 500);
    return () => clearTimeout(timer);
  }, [autoplay, active]);
  return (
    <section ref={section} id="process" className={`page-shell section-space process-workbench ${className}`} aria-labelledby="process-heading">
      <Reveal><p className="eyebrow">How I work</p><h2 id="process-heading" className="section-heading mt-4 max-w-2xl">{heading}</h2></Reveal>
      <div className="process-layout">
        <div className="process-steps">
          {processSteps.map(({ step, title, body }, i) => <div key={step} className={`process-choice ${active === i ? "is-active" : ""}`} style={{ "--step-accent": accents[i] }}>
            <h3><button type="button" className="process-choice-button" aria-expanded={active === i} aria-controls={`process-detail-${step}`} onClick={() => setActive(i)}><span className="process-number">{step}</span><span>{title}</span><span className="process-choice-mark" aria-hidden="true">{active === i ? "−" : "+"}</span></button></h3>
            <div id={`process-detail-${step}`} className="process-choice-detail" aria-hidden={active !== i} inert={active !== i}><div><p>{body}</p></div></div>
          </div>)}
        </div>
        <div className="process-canvas" style={{ "--step-accent": accents[active] }}>
          <div className="process-canvas-grid" aria-hidden="true" />
          <div className="process-scene" key={active}><ProcessDrawing step={active} /></div>
        </div>
      </div>
    </section>
  );
}
