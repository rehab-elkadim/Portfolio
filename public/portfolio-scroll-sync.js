/* Add to each demo site: <script src="/portfolio-scroll-sync.js" data-portfolio-origin="https://YOUR-PORTFOLIO-DOMAIN" defer></script>
   Use http://localhost:5173 for local testing. Comma-separated exact origins are supported.
   For an app scrolling inside a container, mark it data-showcase-scroll. */
(() => {
  const allowed = (document.currentScript?.dataset.portfolioOrigin || "").split(",").map(x => x.trim()).filter(Boolean);
  if (window.parent === window || !allowed.length) return;
  let hostOrigin, session, queued, suppressUntil = 0;
  const scroller = () => document.querySelector("[data-showcase-scroll]") || document.scrollingElement;
  const send = (type, extra = {}) => {
    if (session) window.parent.postMessage({ type, session, ...extra }, hostOrigin);
  };
  const report = () => {
    queued = false;
    if (performance.now() < suppressUntil) return;
    const el = scroller();
    const range = el.scrollHeight - el.clientHeight;
    send("portfolio:scroll", { progress: range > 0 ? el.scrollTop / range : 0 });
  };
  document.addEventListener("scroll", (event) => {
    const el = scroller();
    if (event.target !== document && event.target !== el) return;
    if (!queued) { queued = true; requestAnimationFrame(report); }
  }, true);
  ["wheel", "touchstart", "pointerdown", "keydown"].forEach(type =>
    document.addEventListener(type, () => { suppressUntil = 0; }, { passive: true }));
  window.addEventListener("message", (event) => {
    if (event.source !== window.parent || !allowed.includes(event.origin)) return;
    const data = event.data;
    if (data?.type === "portfolio:init" && typeof data.session === "string") {
      session = data.session;
      hostOrigin = event.origin;
      send("portfolio:ready");
    } else if (data?.type === "portfolio:set-scroll" && data.session === session && Number.isFinite(data.progress)) {
      const el = scroller();
      suppressUntil = performance.now() + 250;
      el.scrollTo({ top: Math.max(0, Math.min(1, data.progress)) * Math.max(0, el.scrollHeight - el.clientHeight), behavior: "instant" });
    }
  });
})();
