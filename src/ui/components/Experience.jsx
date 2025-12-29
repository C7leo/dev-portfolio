import TextPressure from "./textpressure/TextPressure";
import { useI18n, messages } from "../../i18n.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export function Experience() {
  const { t, locale } = useI18n();
  const items =
    messages[locale]?.experience?.items || messages.en.experience.items;
  const { ref, visible } = useScrollReveal();

  return (
    <section
      className={`section reveal ${visible ? "reveal--visible" : ""}`}
      id="experience"
      ref={ref}
    >
      <div className="section__header">
        <p className="section__eyebrow">Experience</p>
        <div className="section__title">
          <TextPressure
            text={t("experience.title")}
            strength={0.25}
            duration={0.8}
            ease="power3.out"
            textColor="var(--text-strong)"
          />
        </div>
      </div>

      <div className="timeline">
        <div className="timeline__line" />
        {items.map((item, idx) => {
          const side = idx % 2 === 0 ? "timeline__item--left" : "timeline__item--right";
          return (
            <div key={item.period} className={`timeline__item ${side} reveal-item`}>
              <div className="timeline__card">
                <p className="timeline__period">{item.period}</p>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__place">{item.place}</p>
                <ul className="timeline__summary">
                  {item.summary.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
