# Umbrage Studio — marketing site

Static site, no build step. Everything in this folder gets uploaded to GitHub
Pages as-is.

## What's here

```
index.html            landing page
satin-sanctuary.html  Satin Sanctuary detail page
css/tokens.css        design tokens (colors, fonts, spacing) — edit here to restyle
css/site.css          page layout & components
js/site.js            mobile menu, FAQ accordion, payment-plan deep link
assets/, uploads/     images (logos, product photos, partner logos)
.nojekyll             tells GitHub Pages not to run Jekyll — keep it
```

All paths are relative, so the site works at `username.github.io/repo-name/`
or on a custom domain, no changes needed.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `umbrage-site`).
2. Upload the **contents** of this folder to the repository root (drag-and-drop
   on github.com works: "Add file → Upload files"). Make sure `.nojekyll` comes
   along — it's a hidden file.
3. In the repo: **Settings → Pages → Source: Deploy from a branch**, pick
   `main` and `/ (root)`, save.
4. The site appears at `https://<your-username>.github.io/<repo-name>/` after
   a minute or two.

To update the site later, just edit/re-upload files — Pages redeploys
automatically on every commit.

## Links

The footer Instagram link points at
`https://www.instagram.com/umbragestudio`.

The booking link is live: every call-to-action points at
`https://meeting.umbrage.studio/design-consultation`. To change it later,
find-and-replace that whole URL in both HTML files (12 occurrences). Booking
links open in a new tab — keep the `target="_blank" rel="noopener"`
attributes next to them.

The `mailto:umbragestudio@gmail.com` link in the FAQ is real — leave it.

## Adding a page for a new piece

1. Duplicate `satin-sanctuary.html` and rename it, e.g. `cupids-arrow.html`.
2. In the copy, update the `<title>`, the hero (name, tagline, intro, price,
   build time, image), the "what's included" and "add-ons" cards, and the FAQ.
   Delete any section that doesn't apply — each `<section>` block is
   self-contained and safe to remove.
3. In `index.html`, find the piece's card in the "the pieces" grid (each
   placeholder card has an HTML comment marking it) and change its
   `href="https://buy.stripe.com/..."` to `href="cupids-arrow.html"`, and
   remove the `target="_blank" rel="noopener"` from that card.
4. Drop the new piece's photos into `assets/site/` and reference them with
   relative paths like `assets/site/your-photo.webp`.

## Changing links, colors, fonts

- **Links:** all navigation is plain `<a href>` in the two HTML files — edit
  directly. Cross-page section links look like `index.html#pieces`.
- **Colors/spacing/type:** edit `css/tokens.css`; the pages only use the
  `var(--*)` token names, so changes apply everywhere.
- **Body font:** ships with Poppins (Google Fonts). If you obtain the
  Kollektif WOFF files, put them in `assets/fonts/` and uncomment the
  `@font-face` block at the top of `css/tokens.css` — the font stack already
  prefers Kollektif.
