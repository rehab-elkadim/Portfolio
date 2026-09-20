import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import { ChevronIcon } from "./Decorations";
import BrowserFrame from "./BrowserFrame";
import Reveal from "./Reveal";
import ProjectPreview from "./ProjectPreview";

const AUTO_ADVANCE_MS = 2400; // 2.5x the original 6000ms pace

export default function ProjectShowcase() {
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 1199px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1199px)");
    const update = () => setCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [overview, setOverview] = useState(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (direction) => { setOverview(null); setIndex((current) => (current + direction + projects.length) % projects.length); };

  // Auto-advance to the right, but hand control back the moment someone
  // hovers, focuses, or navigates manually — and skip it entirely for
  // reduced-motion, same as the rest of the site's motion.
  useEffect(() => {
    if (projects.length <= 1 || paused || compact || overview !== null) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, paused, compact, overview]);

  return (
    <section id="work" className="page-shell section-space" aria-label="Work Experience Top Picks">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">Work Experience Top Picks / {String(projects.length).padStart(2, "0")}</p><h2 className="section-heading mt-4">Don’t take my word for it,<br /><span className="text-[#3976b8]">See what I build.</span></h2></div>
        </div>
      </Reveal>
      <Reveal className="mt-6 sm:mt-8">
        {/* Overlapping grid cells reserve the tallest slide's height on every breakpoint. */}
        <div
          className="relative grid"
          aria-roledescription="carousel"
          aria-label="Projects"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault(); go(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {projects.map((project, i) => (
            <article key={project.id} className={`project-slide sm:mx-16 lg:mx-20 col-start-1 row-start-1 grid min-w-0 items-center gap-9 lg:grid-cols-[1.25fr_1fr] lg:gap-10 ${index === i ? "is-active" : ""}`} aria-hidden={index !== i} inert={index !== i} aria-roledescription="slide" aria-label={`${i + 1} of ${projects.length}: ${project.name}`}>
              <BrowserFrame image={project.image} imageAlt={project.imageAlt} imageFit={project.imageFit} imageBackground={project.imageBackground} label={project.name} href={project.demoUrl} />
              <div className="py-2">
                <p className="eyebrow text-[#3976b8]">{project.category}</p>
                <div className="project-title-row">
                <h3 className="font-heading text-3xl font-semibold tracking-tight sm:text-[34px]">{project.demoUrl ? <a className="project-title-link" href={project.demoUrl} target="_blank" rel="noreferrer">{project.name}</a> : project.name}</h3>
                <button id={"explore-" + project.id} type="button" className="text-link project-more" aria-expanded={overview?.id === project.id} aria-controls={"preview-" + project.id} onClick={() => setOverview(project)}>Explore project <span aria-hidden="true">↗</span></button>
                </div>
                <p className="mt-4 leading-relaxed text-ink-soft">{project.summary}</p>
                {project.description && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.description}</p>}
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest">{project.role}</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-soft">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />{highlight}</li>)}</ul>
                <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-ink/10 bg-[#f7f8f6] px-3 py-1.5 text-xs text-ink-soft">{technology}</span>)}</div>
                {project.repositoryUrl && <div className="mt-7"><a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="text-link text-sm">View code <span aria-hidden="true">↗</span></a></div>}
              </div>
            </article>
          ))}
          <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="carousel-button carousel-previous"><ChevronIcon direction="left" className="h-7 w-7 sm:h-8 sm:w-8" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next project" className="carousel-button carousel-next"><ChevronIcon className="h-7 w-7 sm:h-8 sm:w-8" /></button>
          <div className="col-start-1 row-start-2 mt-6 flex justify-center gap-0">
            {projects.map((project, i) => <button key={project.id} type="button" onClick={() => { setOverview(null); setIndex(i); }} aria-label={`Show ${project.name}`} aria-current={i === index ? "true" : undefined} className="group flex h-11 w-8 items-center justify-center rounded-full"><span className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${i === index ? "bg-blue" : "bg-gray-300 group-hover:bg-gray-400"}`} /></button>)}
            <span aria-live="polite" aria-atomic="true" className="sr-only">Project {index + 1} of {projects.length}: {projects[index].name}</span>
          </div>
        </div>
      </Reveal>
      {overview && <ProjectPreview key={overview.id} project={overview} onClose={() => { const id = overview.id; setOverview(null); requestAnimationFrame(() => document.getElementById("explore-" + id)?.focus({ preventScroll: true })); }} />}
    </section>
  );
}






