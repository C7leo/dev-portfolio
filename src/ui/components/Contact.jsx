import { useEffect, useRef, useState } from "react";
import TextPressure from "./textpressure/TextPressure";
import { useI18n } from "../../i18n.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const initialForm = { name: "", email: "", message: "" };

const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

export function Contact({ profile }) {
  const { t } = useI18n();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState("");
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  const reveal = useScrollReveal();

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID; // set in .env

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (next) => {
    const nextErrors = {};
    if (!next.name.trim()) nextErrors.name = t("contact.errors.required");
    if (!next.email.trim()) nextErrors.email = t("contact.errors.required");
    else if (!validateEmail(next.email)) nextErrors.email = t("contact.errors.invalidEmail");
    if (!next.message.trim()) nextErrors.message = t("contact.errors.required");
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
    validate(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length) return;
    if (!formspreeId) {
      setStatus("error");
      setStatusMessage(t("contact.status.missingId"));
      return;
    }

    try {
      setStatus("loading");
      setStatusMessage(t("contact.status.sending"));
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`.trim());
      }
      setStatus("success");
      setStatusMessage(t("contact.status.success"));
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setStatusMessage(err.message || t("contact.status.error"));
    }
  };

  return (
    <section
      className={`section reveal ${reveal.visible ? "reveal--visible" : ""}`}
      id="contact"
      ref={reveal.ref}
    >
      <div className="section__header">
        <p className="section__eyebrow">Contact</p>
        <div className="section__title">
          <TextPressure
            text={t("contact.sectionTitle")}
            strength={0.25}
            duration={0.8}
            ease="power3.out"
            textColor="var(--text-strong)"
          />
        </div>
      </div>

      <div
        ref={cardRef}
        className={`contact-form ${inView ? "contact-form--in" : ""}`}
        aria-live="polite"
      >
        <div className="contact-form__header">
          <div>
            <p className="section__eyebrow">Let’s build together</p>
            <h3 className="contact-form__title">{t("contact.formTitle")}</h3>
          </div>
          <p className="contact__text contact-form__subtitle">
            {t("contact.subtitle")}
          </p>
        </div>

        <form className="contact-form__body" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__grid">
            <label className="field">
              <span>{t("contact.labels.name")}</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <small id="name-error" className="field__error">
                  {errors.name}
                </small>
              )}
            </label>

            <label className="field">
              <span>{t("contact.labels.email")}</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <small id="email-error" className="field__error">
                  {errors.email}
                </small>
              )}
            </label>
          </div>

          <label className="field">
            <span>{t("contact.labels.message")}</span>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <small id="message-error" className="field__error">
                {errors.message}
              </small>
            )}
          </label>

          <div className="contact-form__footer">
            <button
              type="submit"
              className={`btn btn--primary ${
                status === "loading" ? "btn--loading" : ""
              } ${status === "success" ? "btn--success" : ""}`}
              disabled={status === "loading"}
            >
              {status === "loading"
                ? t("contact.button.sending")
                : status === "success"
                ? t("contact.button.sent")
                : t("contact.button.send")}
              {status === "loading" && <span className="spinner" aria-hidden="true" />}
            </button>
            {statusMessage && (
              <span
                className={`contact-form__status contact-form__status--${status}`}
              >
                {statusMessage}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
