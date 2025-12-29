import { useI18n } from "../../i18n.jsx";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>{t("footer.madeBy")}</p>
        <p className="footer__credits">
          {t("footer.credits").replace("@davidhdev", "")}
          <a href="https://x.com/davidhdev" target="_blank" rel="noreferrer">
            @davidhdev
          </a>
        </p>
        <div className="footer__links">
          <a href="#home">{t("footer.top")}</a>
          <a href="https://github.com/C7leo" target="_blank" rel="noreferrer">
            {t("footer.github")}
          </a>
        </div>
      </div>
    </footer>
  );
}
