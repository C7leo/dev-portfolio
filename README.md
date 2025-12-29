## Dev Portfolio

Personal portfolio built with React + Vite, EN/ES i18n, scroll-triggered animations, iridescence effect, and a Formspree-powered contact form.

### Requirements
- Node 18+
- npm or pnpm

### Installation
```bash
npm install
```

### Environment variables
Create a `.env.development` (or `.env`) at the repo root:
```
VITE_FORMSPREE_ID=your_formspree_id

```

### Scripts
- `npm run dev` – development server
- `npm run build` – production build
- `npm run preview` – serve the build locally

### Features
- **i18n EN/ES**: language toggle in Hero; all texts translated.
- **Scroll animations**: About, Projects, Experience, and Contact use `useScrollReveal` + CSS (subtle fade/translate/scale, one-time).
- **Experience timeline**: clean central line, no floating nodes.
- **Projects**: fetches specific GitHub repos; partial errors don’t break the section.
- **Contact form**: Formspree, live validation, loading/success/error states, entry animation, vibrant CTA.
- **Visual effects**: iridescence and TextPressure (credits to @davidhdev).

### Relevant structure
- `src/i18n.jsx` and `src/locales/*` – internationalization.
- `src/ui/hooks/useScrollReveal.js` – scroll animation hook.
- `src/ui/components/*` – UI (Hero, About, Projects, Experience, Contact, Footer, etc.).

