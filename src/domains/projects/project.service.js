import { createProject } from "./project.model.js";

/**
 * Domain Service: ProjectService
 * - Mantiene la "lista de proyectos" como un dominio independiente.
 * - Luego puedes conectarlo a GitHub API si quieres.
 */

export function getProjects() {
  return [
    createProject({
      id: "p1",
      name: "Dev Portfolio",
      description:
        "My personal portfolio built with React + Vite, with a clean DDD-inspired structure.",
      stack: ["React", "Vite", "CSS"],
      repoUrl: "https://github.com/C7leo",
      liveUrl: "",
      featured: true,
    }),
    createProject({
      id: "p2",
      name: "Automation Playground",
      description:
        "Small scripts and tools for productivity: data cleaning, reports and helpers.",
      stack: ["Python", "SQL"],
      repoUrl: "https://github.com/C7leo",
      liveUrl: "",
      featured: false,
    }),
  ];
}
