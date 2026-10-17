# rfdigitaltx.com

The RF Digital website: plain HTML, CSS, and JavaScript, with no build step.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

- `index.html`: the whole site (English copy lives here)
- `assets/js/i18n.js`: Spanish copy, keyed by each element's `data-i18n` value
- `assets/js/main.js`: mobile menu, scroll effects, contact form
- `assets/css/styles.css`: brand tokens at the top (colors match the logo files)
- `assets/img/`: logos, favicons, social preview image (`og-image.png`)

To change text, edit it in `index.html` and its matching key in `i18n.js`.
`?lang=es` opens the site in Spanish.

## Before launch

- [ ] Have a native speaker review the Spanish in `i18n.js`
- [ ] Hook the contact form to a form service (Formspree, Netlify Forms, etc.). For now it opens the visitor's email app.
- [ ] Swap the demo/sample cards in "Recent work" for real client work (with each client's OK)
- [ ] Add reviews once you have them
- [ ] Add a Google Business Profile link

## Deploy

Any static host works: Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Point it at this folder, with no build command and the output set to the root.
