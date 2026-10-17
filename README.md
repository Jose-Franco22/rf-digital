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
- `assets/img/`: logos, favicons, social preview image (`og-image.png`), Jose's photo
- `privacy.html`: privacy policy (English and Spanish blocks, switched by the EN/ES toggle)
- `404.html`: "page not found" page
- `sitemap.xml`, `robots.txt`: for Google

To change text, edit it in `index.html` and its matching key in `i18n.js`.
`?lang=es` opens the site in Spanish.

## Before launch

- [ ] Have a native speaker review the Spanish in `i18n.js`
- [ ] Activate the contact form: send one test message from the live site, then click "Activate Form" in the
      FormSubmit email that arrives at rfdigitaltx@gmail.com. Until then, visitors see "call or text me instead".
- [ ] Confirm the promises on the page: free changes by text, ~1 week build, same-day replies, service area
- [ ] Add business hours to the contact section
- [ ] Submit `sitemap.xml` in Google Search Console
- [ ] Swap the demo/sample cards in "Recent work" for real client work (with each client's OK)
- [ ] Add reviews once you have them
- [ ] Add a Google Business Profile link

## Deploy

Any static host works: Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Point it at this folder, with no build command and the output set to the root.

## Switching to rfdigitaltx.com

The site currently uses the GitHub Pages address in a few places (link previews, the sitemap, and Google
settings). Once the domain is connected:

```bash
grep -rl "jose-franco22.github.io/rf-digital/" --include=*.html --include=*.xml --include=*.txt . \
  | xargs sed -i '' 's#https://jose-franco22.github.io/rf-digital/#https://rfdigitaltx.com/#g'
echo rfdigitaltx.com > CNAME
```
