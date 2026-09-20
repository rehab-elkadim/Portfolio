import { useEffect, useRef } from "react";

// Keep content visible by default; motion is progressive enhancement.
export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !window.IntersectionObserver || !element.animate) return;
    let animation;
    let lineAnimation;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = element.animate(
        [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 600, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      );
      const line = element.querySelector(".process-line");
      lineAnimation = line?.animate(
        [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
        { duration: 800, delay: delay + 150, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      );
      observer.disconnect();
    }, { threshold: 0.12 });
    const stop = () => { if (motion.matches) { animation?.cancel(); lineAnimation?.cancel(); observer.disconnect(); } };
    observer.observe(element);
    motion.addEventListener("change", stop);
    return () => { observer.disconnect(); animation?.cancel(); lineAnimation?.cancel(); motion.removeEventListener("change", stop); };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
