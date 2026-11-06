# Anu | UI/UX and Product Designer Portfolio

A single-page portfolio for Anu, a UI/UX and Product Designer focused on games, products and XR. It has an interactive WebGL fluid background that reacts to the mouse or a finger, glass content panels so text stays readable, and sections for Hero, Selected Work, About, Contact and a footer.

## Tech

- Plain HTML, CSS and vanilla JavaScript. No framework, no build step.
- A custom WebGL fluid simulation (`public/js/fluid.js`). It drops to a lower resolution on small screens and switches to a calm static gradient when the visitor has "reduce motion" turned on or WebGL isn't available.
- Google Fonts: Space Grotesk (headings) and Manrope (body).
- Hosted on Netlify (`netlify.toml` publishes `public/`).

## Editing content

| What | Where |
| --- | --- |
| Project cards, Behance profile, email, phone, LinkedIn | `public/js/content.js` |
| Cover images | `public/img/` (replace `cover-1.svg` etc. or point `cover` at new files) |
| Hero, About, Journey, Toolkit copy | `public/index.html` (each section is marked with a comment) |
| Colors, fonts, spacing | Top of `public/css/styles.css` (`:root` tokens) |
| Fluid colors and feel | `CONFIG` and `PALETTE` at the top of `public/js/fluid.js` |

Copy guideline: do not use em dashes anywhere in the copy.

## Run locally

Any static server works, for example:

```bash
npx serve public
# or, with Netlify features emulated
netlify dev
```
