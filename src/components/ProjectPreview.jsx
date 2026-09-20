import { useEffect, useRef, useState } from "react";
const devices = [
  { id: "laptop", label: "Laptop", width: 1440, height: 900 },
  { id: "tablet", label: "Tablet", width: 820, height: 1180 },
  { id: "phone", label: "Phone", width: 390, height: 844 },
];

function Device({ device, project, register, onLoad }) {
  const screen = useRef(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / device.width));
    observer.observe(screen.current);
    return () => observer.disconnect();
  }, [device.width]);
  return <div className={"preview-device preview-" + device.id}>
    <div className="preview-hardware">
      <span className="preview-camera" aria-hidden="true" />
      <div ref={screen} className="preview-screen" style={{ aspectRatio: device.width + " / " + device.height }}>
        {project.demoUrl ? <iframe ref={register} onLoad={onLoad}
          title={project.name + " — " + device.label + " live preview"}
          src={project.demoUrl}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="fullscreen" referrerPolicy="strict-origin-when-cross-origin"
          style={{ width: device.width, height: device.height, transform: "scale(" + scale + ")" }} />
          : <div className="preview-unavailable">
            {device.id === "laptop" && <img src={project.image} alt={project.imageAlt} />}
            <span>{device.id === "laptop" ? "Project screenshot" : device.label + " preview"}<small>{project.previewUnavailable ? "Live site temporarily unavailable" : "Live preview not connected yet"}</small></span>
          </div>}
      </div>
    </div>
    {device.id === "laptop" && <div className="preview-laptop-base" aria-hidden="true" />}
    <p className="preview-device-label">{device.label}<span>{device.width} × {device.height}</span></p>
  </div>;
}

export default function ProjectPreview({ project, onClose }) {
  const heading = useRef(null);
  const [useBackup, setUseBackup] = useState(false);
  const previewUrl = useBackup && project.backupUrl ? project.backupUrl : project.previewUnavailable ? "" : project.demoUrl;
  const frames = useRef({});
  const session = useRef(crypto.randomUUID());
  const [selected, setSelected] = useState("laptop");
  const [ready, setReady] = useState({});
  const [sync, setSync] = useState(true);
  const origin = previewUrl ? new URL(previewUrl).origin : null;
  const initialise = (id) => {
    setReady((current) => ({ ...current, [id]: false }));
    frames.current[id]?.contentWindow?.postMessage({ type: "portfolio:init", session: session.current }, origin);
  };
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest(".project-preview")?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);
  useEffect(() => {
    if (!origin) return;
    const receive = (event) => {
      if (event.origin !== origin || event.data?.session !== session.current) return;
      const sender = devices.find(({ id }) => frames.current[id]?.contentWindow === event.source);
      if (!sender) return;
      if (event.data.type === "portfolio:ready") {
        setReady((current) => ({ ...current, [sender.id]: true }));
      }
      if (event.data.type !== "portfolio:scroll" || !sync || !Number.isFinite(event.data.progress)) return;
      const progress = Math.max(0, Math.min(1, event.data.progress));
      devices.forEach(({ id }) => {
        if (id !== sender.id && ready[id]) frames.current[id]?.contentWindow?.postMessage(
          { type: "portfolio:set-scroll", session: session.current, progress }, origin);
      });
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [origin, sync, ready]);
  const connected = devices.every(({ id }) => ready[id]);
  return <section id={"preview-" + project.id} className="project-preview" aria-labelledby={"preview-title-" + project.id}>
    <header className="preview-heading">
      <div><p className="eyebrow">Project overview</p><h3 ref={heading} tabIndex={-1} id={"preview-title-" + project.id}>{project.name}</h3></div>
      <button type="button" className="text-link" onClick={onClose}>Close overview <span aria-hidden="true">×</span></button>
    </header>
    <p className="preview-summary">{project.description || project.summary}</p>
    <div className="preview-toolbar">
      <div className="preview-switcher" role="group" aria-label="Choose device preview">
        {devices.map(({ id, label }) => <button key={id} type="button" aria-pressed={selected === id} onClick={() => setSelected(id)}>{label}</button>)}
      </div>
      {project.backupUrl && <button className="text-link" type="button" onClick={() => { setReady({}); setUseBackup((value) => !value); }}>{useBackup ? "Use main site" : "Use backup site"}</button>}
      {previewUrl && <a className="text-link" href={previewUrl} target="_blank" rel="noreferrer">Open live site ↗</a>}
    </div>
    <div className={"preview-stage selected-" + selected}>
      {devices.map((device) => <Device key={device.id + previewUrl} device={device} project={{ ...project, demoUrl: previewUrl }}
        register={(node) => { frames.current[device.id] = node; }} onLoad={() => initialise(device.id)} />)}
    </div>
    <div className="preview-status">
      <p>{!previewUrl ? "Live device previews will be available here soon." : connected ? "Explore the live site in any screen." : "Explore each screen independently. If a preview stays blank, use Open live site."}</p>
      {connected && <button type="button" className="text-link" aria-pressed={sync} onClick={() => setSync((value) => !value)}>Scroll together: {sync ? "On" : "Off"}</button>}
    </div>
  </section>;
}
