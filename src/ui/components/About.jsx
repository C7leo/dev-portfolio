import TextPressure from "./textpressure/TextPressure";
import { useI18n, messages } from "../../i18n.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import profilePhoto from "../../assets/me.jpg";

export function About({ profile }) {
  const { t, locale } = useI18n();
  const { ref, visible } = useScrollReveal();
  if (!profile) return null;
  const desc =
    (messages[locale]?.about?.description) || messages.en.about.description;

  return (
    <section
      className={`section reveal ${visible ? "reveal--visible" : ""}`}
      id="about"
      ref={ref}
    >
      <div className="section__header">
        <p className="section__eyebrow">About</p>
        <div className="section__title">
          <TextPressure
            text={t("about.title")}
            strength={0.25}
            duration={0.8}
            ease="power3.out"
            textColor="var(--text-strong)"
          />
        </div>
      </div>

      <div className="about">
        <div className="about__info">
          <p className="about__name">{profile.fullName}</p>
          <p className="about__title">{profile.title}</p>
          <p className="about__meta">
            {profile.location} · {profile.pronouns}
          </p>
          <p className="about__desc">{desc}</p>
        </div>

        <div className="about__photo" aria-hidden={!profilePhoto}>
          <img src={profilePhoto} alt={`${profile.fullName} portrait`} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
