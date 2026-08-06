# Umbrage Studio — marketing site

Static site, no build step. Everything in this folder gets uploaded to GitHub
Pages as-is.

## What's here

```
index.html            landing page
request.html          commission request — embedded Tally form
booking.html          $200 consultation — embedded NeetoCal calendar
faq.html              general FAQ — studio-wide questions
satin-sanctuary.html  piece page (finished)
cupids-arrow.html     piece page (STUB — needs copy)
primal-perch.html     piece page (STUB — needs copy)
pleasure-pew.html     piece page (STUB — needs copy)
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

## Links the site uses

| What | URL | Where it appears |
|---|---|---|
| Commission request (free) | `request.html` | nav CTA, most page CTAs, the "have an idea?" card |
| Design consultation ($200) | `booking.html` | the process CTA card, piece-page secondary button |
| Instagram | `https://www.instagram.com/umbragestudio` | landing footer |
| Email | `mailto:umbragestudio@gmail.com` | bottom of the FAQ pages |

To change any of them, find-and-replace the whole URL across the `.html` files.
The external ones open in a new tab — keep the `target="_blank" rel="noopener"`
attributes next to them. `request.html` is on-site, so it has neither.

### The embedded commission form

`request.html` embeds the Tally form (`3xEB49`) in an iframe rather than
sending people to tally.so, so visitors stay on umbrage.studio. Two rules if
you ever touch it:

- The iframe uses **`data-tally-src`, not `src`.** Tally's `embed.js` reads
  that attribute, sets the real `src`, and then resizes the frame to fit the
  form. Adding a plain `src` alongside it breaks the auto-resize and leaves
  the form in a fixed 500px box with its own scrollbar.
- Changing the form's **styling** in Tally (colours, alignment, hidden title)
  means re-copying the embed URL from Tally's Share tab. Changing the form's
  **questions** needs nothing — those sync automatically.

Under the form is a fallback line linking to `tally.so/r/3xEB49` directly, for
anyone whose browser blocks the iframe.

### The embedded booking calendar

`booking.html` embeds the NeetoCal consultation calendar. Two things about it
are deliberate and easy to undo by accident:

- **It points at `meeting.umbrage.studio`, not `umbrage.neetocal.com`.**
  NeetoCal's own "inline embed" snippet uses the neetocal.com address, which is
  a *different site* from umbrage.studio — so its `SameSite=Lax` session cookie
  gets blocked as a third-party cookie in Safari and increasingly elsewhere,
  and the booking session can break mid-flow. The custom domain is same-site,
  so cookies behave normally. If you ever paste NeetoCal's generated snippet in,
  check which host it loads.
- **Auto-height is ours, not theirs.** `?dynamicHeight=true` makes NeetoCal post
  `neeto-cal-height-change-event` messages; the listener in `js/site.js` reads
  them and resizes `#booking-frame`. Without that listener the calendar sits at
  the 700px starting height from `site.css` and scrolls internally.

Payment runs through NeetoCal's Stripe integration. Stripe Checkout cannot
render inside an iframe, so that step has to leave the frame — if a booking ever
fails to complete on this page, the fallback link under the calendar ("trouble
paying? open the booking page in a new tab") is the escape hatch, and pointing
the CTAs back at `https://meeting.umbrage.studio/design-consultation` is the
one-line rollback.

**The intended path is free first, paid second:** commission request → $200
design consultation. If you ever want to flip a button from one to the other,
it's just swapping the `href`.

## Finishing the stub pages

`cupids-arrow.html`, `primal-perch.html`, and `pleasure-pew.html` are complete
pages with the studio-wide facts already filled in (5–9 weeks, shipping,
payment plans, discreet box). What's missing is wrapped in
`class="placeholder"`, which renders as a dashed amber box so it can't ship by
accident.

For each page:
1. Write the tagline, the intro paragraph, and the two piece-specific
   "what's included" cards.
2. Delete the word `placeholder` from those elements' `class="..."`.
3. Optional: an add-ons section sits commented out in the middle of the file —
   uncomment and fill it in if that piece has upgrades.
4. Load the page once before publishing; if you see amber, you missed one.

## Where FAQ answers live

- **`faq.html`** holds everything studio-wide: process, the $200, refunds,
  payment plans, discretion, shipping, timelines. Add general questions here.
- **Piece pages** hold only questions specific to that piece, then link to
  `faq.html`. This keeps any single answer in exactly one place.
- The "payment plan available" links on piece pages point at
  `faq.html#payment-plan`, which opens that question automatically on arrival.

## A note on the nav

The nav is copied into each HTML file rather than shared, because the site has
no build step. If you add a nav link, add it in **every** `.html` file — twice
per file, once in the desktop row and once in the mobile panel.

## Adding a page for a new piece

1. Duplicate one of the stub pages and rename it, e.g. `new-piece.html`.
2. In the copy, update the `<title>`, the hero (name, tagline, intro, price,
   build time, image), the "what's included" and "add-ons" cards, and the FAQ.
   Delete any section that doesn't apply — each `<section>` block is
   self-contained and safe to remove.
3. In `index.html`, add a card to the "the pieces" grid (copy an existing one)
   pointing at `new-piece.html`.
4. Drop the new piece's photos into `assets/site/` and reference them with
   relative paths like `assets/site/your-photo.webp`.

## Changing links, colors, fonts

- **Links:** all navigation is plain `<a href>` in the HTML files — edit
  directly. Cross-page section links look like `index.html#pieces`.
- **Colors/spacing/type:** edit `css/tokens.css`; the pages only use the
  `var(--*)` token names, so changes apply everywhere.
- **Fonts:** Kollektif (body) is self-hosted from `assets/fonts/` as woff2 and
  preloaded in each page's `<head>`. Dosis (headings) and Cormorant Garamond
  (quotes) come from Google Fonts via `<link>` tags — *not* a CSS `@import`,
  which would delay text painting by a whole round-trip. If you add a page,
  copy the four `<link>` lines from an existing one.
