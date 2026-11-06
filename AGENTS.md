# AGENTS.md

## Architecture
Static single-page site with no build step. Netlify publishes `public/` (see `netlify.toml`).

- `public/index.html`: all markup, split into commented sections (Background, Nav, Hero, Work, About, Contact, Footer). SEO and Open Graph tags are in `<head>`.
- `public/js/content.js`: the single source of editable data (`window.SITE_CONTENT`): projects, Behance profile, email, phone, LinkedIn. Load order matters: content.js, then main.js, then fluid.js.
- `public/js/main.js`: renders the project cards into `#work-grid`, copies contact links from content.js onto the static contact anchors, handles nav scroll state, the active-section highlight and scroll reveals.
- `public/js/fluid.js`: self-contained WebGL1/2 stable-fluids sim drawn to `#fluid`. It adds `.no-fluid` to `<html>` to show the CSS static gradient when reduced motion is on, WebGL is missing, shaders fail, or the GPU context is lost.
- `public/css/styles.css`: mobile-first; design tokens live in `:root`.
- `public/img/`: SVG placeholder covers and the favicon.

## Conventions
- Vanilla ES5-style JS in IIFEs, no dependencies. Keep it that way so it stays light.
- Accent colors (violet `#8b7dff`, teal `#2ee6d6`, pink `#ff6aa8`) are duplicated in `styles.css` tokens and `PALETTE` in `fluid.js`; change both together.
- The canvas has `pointer-events: none`; input is read from `window` with passive listeners so touch scrolling never gets blocked.
- Contact and Behance links are hard-coded in HTML too (no-JS fallback), but content.js wins at runtime.
- Copy rule from the owner: never use em dashes (or en dashes) in copy.
- Keep text on glass panels (`.panel`) or with text-shadow so it stays readable over the fluid.
