import { useEffect, useRef } from "react";
import portrait from "../assets/images/rehab-portrait.jpg";
import { StarBurst, Triangle, Blob, ArrowDown } from "./Decorations";


export default function Hero() {
  const portraitFrame = useRef(null);
  const portraitImage = useRef(null);
  useEffect(() => {
    const frame = portraitFrame.current;
    const image = portraitImage.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation;
    let played = false;
    let armed = true;
    let visible = false;
    let previousScroll = window.scrollY;
    const adjustLens = () => {
      if (!visible || reduced.matches || !armed) return;
      armed = false;
      played = true;
      animation?.cancel();
      animation = image.animate([
        { transform: "rotate(0deg) scale(1)", filter: "blur(0px)", offset: 0 },
        { transform: "rotate(15deg) scale(1.015)", filter: "blur(0.3px)", offset: 0.24 },
        { transform: "rotate(11deg) scale(1.14)", filter: "blur(2.2px)", offset: 0.52 },
        { transform: "rotate(2deg) scale(1.08)", filter: "blur(0.8px)", offset: 0.76 },
        { transform: "rotate(0deg) scale(1)", filter: "blur(0px)", offset: 1 },
      ], { duration: 3200, easing: "cubic-bezier(0.45, 0, 0.25, 1)" });
    };
    const observer = new IntersectionObserver(([entry]) => {
      const returningUp = window.scrollY < previousScroll;
      previousScroll = window.scrollY;
      visible = entry.intersectionRatio >= 0.5;
      if (entry.intersectionRatio < 0.1) armed = true;
      if (visible && (!played || returningUp) && image.complete) adjustLens();
    }, { threshold: [0, 0.1, 0.5] });
    const loaded = () => { if (!played) adjustLens(); };
    const motionChanged = () => { if (reduced.matches) animation?.cancel(); };
    observer.observe(frame);
    image.addEventListener("load", loaded);
    reduced.addEventListener("change", motionChanged);
    return () => {
      observer.disconnect();
      animation?.cancel();
      image.removeEventListener("load", loaded);
      reduced.removeEventListener("change", motionChanged);
    };
  }, []);
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="page-shell grid items-center gap-14 pb-6 pt-12 sm:pb-8 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="relative z-10 order-2 min-w-0 lg:order-1">
          <p className="eyebrow hero-enter">Rehab Elkadim / Full-Stack Web Developer</p>
          <h1 className="mt-6 font-heading text-[clamp(1.9rem,8.6vw,3.125rem)] sm:text-[clamp(3.125rem,6.375vw,5.5rem)] font-semibold leading-[1.1] tracking-[-0.055em]">
            <span className="hero-line whitespace-nowrap">Where Great Design</span>
            <span className="hero-line whitespace-nowrap" style={{ animationDelay: "100ms" }}>Meets Business</span>
            <span className="hero-line" style={{ animationDelay: "200ms" }}><span className="relative inline-block whitespace-nowrap">Goals.<span className="hero-underline" /></span></span>
          </h1>
          <p className="hero-enter mt-[23px] max-w-[440px] text-[1.2375rem] leading-relaxed text-ink-soft" style={{ animationDelay: "300ms" }}>
            I’m Rehab, a full-stack web developer building fast, polished, production-ready websites and web applications — from conversion-focused business websites to complete SaaS products.
          </p>
          <div className="hero-enter mt-7 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: "400ms" }}>
            <a href="#work" className="hero-work-button">Explore my work <ArrowDown className="button-arrow h-4 w-4" /></a>
            <a href="https://github.com/rehab-elkadim" className="text-link text-sm font-medium">GitHub <span aria-hidden="true">↗</span></a>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-soft">React · TypeScript · Node.js · Express · MongoDB</p>
        </div>
        <div className="hero-art relative order-1 mx-auto w-full max-w-[560px] py-10 lg:order-2">
          <div className="relative mx-auto aspect-square w-[95%] bg-transparent">
            <div ref={portraitFrame} className="absolute inset-[0.625%] overflow-hidden rounded-full">
              <img ref={portraitImage} src={portrait} alt="Rehab E." width={768} height={952} fetchPriority="high" className="h-full w-full object-cover object-[50%_25%]" />
            </div>
                        <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className="lens-lines pointer-events-none absolute -inset-[5%] h-[110%] w-[110%]">
              <circle cx="200" cy="200" r="181" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.8" />
              <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
                <path d="M 18 165 A 185 185 0 0 1 140 25" opacity="0.65" />
                <path d="M 8 145 A 200 200 0 0 1 104 24" opacity="0.3" />
                <path d="M 49 116 A 173 173 0 0 1 135 40" opacity="0.4" />
                <path d="M 379 244 A 185 185 0 0 1 266 373" opacity="0.5" />
                <path d="M 389 264 A 200 200 0 0 1 306 369" opacity="0.25" />
              </g>
            </svg>
          </div>
          <StarBurst className="float-star absolute -left-5 top-0 h-20 w-20" />
          <Triangle className="float-triangle absolute -right-2 -top-3 h-20 w-20 sm:h-24 sm:w-24" />
          <Blob className="float-blob absolute -bottom-2 -left-4 h-20 w-20" />
          <div className="absolute bottom-2 right-2 rotate-3 rounded-full border border-ink/10 bg-white px-5 py-3 text-xs font-medium shadow-sm">Good design. Solid engineering.</div>
        </div>
      </div>
    </section>
  );
}














