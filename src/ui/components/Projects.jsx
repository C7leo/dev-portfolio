import { useEffect, useState } from "react";
import TextPressure from "./textpressure/TextPressure";
import { useI18n } from "../../i18n.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const allowedRepos = [
  {
    org: "1ASI0730-2520-7432-G1-Harmonix",
    label: "1ASI0730-2520-7432-G1-Harmonix",
    repos: [
      { name: "BackEnd" },
      { name: "FrontEnd" },
    ],
  },
  {
    org: "Emergentes-Trackmind",
    label: "Emergentes-Trackmind",
    repos: [
      { name: "BackEnd-SpotFinder" },
      { name: "FrontEnd-Web-SpotFinder" },
    ],
  },
];

export function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useI18n();
  const { ref, visible } = useScrollReveal();

  const token = import.meta?.env?.VITE_GITHUB_TOKEN;

const fetchRepo = async (org, name) => {
  const url = `https://api.github.com/repos/${org}/${name}`;
  const headers = {
    Accept: "application/vnd.github+json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
};


  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const errors = [];
        const groups = [];

        for (const group of allowedRepos) {
          const fetchedRepos = [];
          for (const repo of group.repos) {
            try {
              const json = await fetchRepo(group.org, repo.name);
              fetchedRepos.push(json);
            } catch (err) {
              errors.push(`${group.org}/${repo.name}: ${err.message}`);
            }
          }
          if (fetchedRepos.length > 0) {
            groups.push({ ...group, repos: fetchedRepos });
          }
        }

        setData(groups);
        if (errors.length) {
          setError(`${t("projects.errorSome")}: ${errors.join("; ")}`);
        }
      } catch (err) {
        setError(err.message || "Error fetching repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section
      className={`section reveal ${visible ? "reveal--visible" : ""}`}
      id="projects"
      ref={ref}
    >
      <div className="section__header">
        <p className="section__eyebrow">Projects</p>
         <div className="section__title">
          <TextPressure
            text={t("projects.title")}
            strength={0.25}
            duration={0.8}
            ease="power3.out"
            textColor="var(--text-strong)"
          />
        </div>
      </div>

      {loading && <p className="projects__status">{t("projects.loading")}</p>}
      {error && <p className="projects__status projects__status--error">{error}</p>}

      {data.map((group) => (
        <div key={group.org} className="projects__group reveal-items">
          <h3 className="projects__group-title">{group.label}</h3>
          <div className="projects">
            {group.repos.map((repo) => (
              <article key={repo.id} className="project-card reveal-item">
                <header className="project-card__header">
                  <h3>{repo.name}</h3>
                  <span className="pill pill--accent">{t("projects.github")}</span>
                </header>
                <p className="project-card__description">
              {repo.description || t("projects.noDescription")}
            </p>
            <div className="project-card__stack">
              {repo.language && <span className="pill">{repo.language}</span>}
            </div>
            <div className="project-card__links">
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    Repo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
