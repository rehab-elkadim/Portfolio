import ganoubiaImg from "../assets/images/project-ganoubia.jpg";
import iyadImg from "../assets/images/project-iyad-arusi.jpg";
import bariqImg from "../assets/images/project-bariq-ai.webp";
import ecoleImg from "../assets/images/project-ecole-universelle.webp";

export const projects = [
  {
    id: "bariq-ai",
    name: "Bariq AI",
    category: "Full-Stack SaaS Development",
    role: "Full-stack development · SaaS architecture",
    stack: "React · Vite · Node.js",
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "REST APIs", "Google APIs", "AI Integration"],
    image: bariqImg,
    imageFit: "contain",
    imageBackground: "#f3faf7",
    imageAlt: "Bariq AI Arabic-language landing page for automated Google review replies",
    summary: "Turning customer reviews into a system businesses can actually act on.",
    description: "Built a production SaaS platform for managing Google Business reviews, generating AI-assisted responses, tracking review analytics, and managing subscriptions — from the customer-facing interface to backend APIs and production deployment.",
    highlights: [
      "60+ REST API endpoints, Google OAuth, and AI-assisted responses",
      "Authentication, review analytics, payments, and subscriptions",
      "Customer and admin dashboards, responsive UI, and production deployment",
    ],
    // Supply the public mock-site URL to make the preview and title clickable.
    demoUrl: "https://bariqai.io/",
    backupUrl: "",
    repositoryUrl: "",
  },
  {
    id: "ecole-universelle",
    name: "École Universelle",
    category: "Educational Website Development",
    role: "Frontend development",
    stack: "React · TypeScript",
    technologies: ["React", "TypeScript", "Responsive UI"],
    image: ecoleImg,
    imageFit: "contain",
    imageBackground: "#e7ebf3",
    imageAlt: "École Universelle school website with students holding a Lebanese flag",
    summary: "A welcoming digital home for a trilingual school, helping families explore, connect, and apply.",
    highlights: ["Responsive admissions, academics, news, and faculty pages", "Multi-slide hero and clear pathways for prospective families", "Component-driven layouts designed around school content"],
    demoUrl: "https://ecoleuniverselle.edu.lb/",
    backupUrl: "",
    repositoryUrl: "",
  },
  {
    id: "iyad-arusi",
    name: "Iyad Arusi",
    category: "React Portfolio Website Development",
    role: "Figma to code · Development & deployment",
    stack: "React · JavaScript · CSS",
    technologies: ["React", "Vite", "JavaScript", "CSS", "Vercel"],
    image: iyadImg,
    imageFit: "contain",
    imageAlt: "Iyad Arusi project manager portfolio with a dark interface, orange accents, and a portrait",
    summary: "Turning a polished Figma design into a fast, responsive portfolio for project manager Iyad Arusi.",
    highlights: [
      "Faithful Figma-to-code implementation of typography, spacing, and interactions",
      "Responsive layouts built with reusable React components",
      "Production deployment on Vercel",
    ],
    demoUrl: "https://arusi.me/",
    previewUnavailable: true,
    backupUrl: "",
    repositoryUrl: "",
  },
  {
    id: "ganoubia",
    name: "Ganoubia",
    category: "Full-Stack Case Management Platform",
    role: "Full-stack development",
    stack: "React · TypeScript · Node.js",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "REST APIs", "JWT"],
    image: ganoubiaImg,
    imageFit: "contain",
    imageBackground: "#faf9f6",
    imageAlt: "Ganoubia Hourra Arabic case-management dashboard with case summaries, a records table, and workflow navigation",
    summary: "Bringing complex organizational workflows into one structured case-management platform for Ganoubia Hourra, a women’s-rights organization.",
    highlights: [
      "Case records, legal actions, consultations, and event histories in one system",
      "Role-based permissions and JWT authentication for controlled access to sensitive data",
      "Responsive dashboards, multi-step forms, file uploads, and CRUD APIs",
    ],
    demoUrl: "https://ganoubia.org/",
    backupUrl: "",
    repositoryUrl: "",
  },
];



