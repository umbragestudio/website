// Umbrage Studio — mobile nav toggle, FAQ accordion, payment-plan deep link.

// Mobile nav: toggle the drop panel and morph the hamburger into an X.
const nav = document.querySelector('.site-nav');
const burger = document.querySelector('.nav-burger');
const NAV_CLOSE_MS = 240; // must match the max-height transition in site.css

function closeNav() {
  if (!nav) return;
  nav.classList.remove('nav-open');
  if (burger) burger.setAttribute('aria-expanded', 'false');
}

if (burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Tapping a link closes the panel, so it stops covering whatever you just
// jumped to. The panel lives inside the sticky nav, so while it is open it
// adds its own height to everything below it — for same-page anchors we wait
// for the close to finish and scroll afterwards, otherwise the jump is
// computed against the taller layout and overshoots.
document.querySelectorAll('.nav-panel-inner a').forEach((link) => {
  link.addEventListener('click', (event) => {
    closeNav();

    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return; // other pages navigate anyway

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setTimeout(() => {
      target.scrollIntoView(); // respects the section's scroll-margin-top
      history.replaceState(null, '', href);
    }, NAV_CLOSE_MS + 20);
  });
});

// Booking calendar: NeetoCal posts its content height whenever the step
// changes, so the frame grows with it instead of scrolling inside a fixed box.
const bookingFrame = document.getElementById('booking-frame');
if (bookingFrame) {
  const BOOKING_ORIGIN = 'https://meeting.umbrage.studio';
  window.addEventListener('message', (event) => {
    if (event.origin !== BOOKING_ORIGIN) return;
    const data = event.data;
    if (!data || data.type !== 'neeto-cal-height-change-event') return;
    const height = parseInt(data.height, 10);
    if (height > 0) bookingFrame.style.height = height + 'px';
  });
}

// FAQ accordion: single-open; clicking the open item closes it.
const faqItems = Array.from(document.querySelectorAll('.faq-item'));
function setOpen(target) {
  faqItems.forEach((item) => {
    const open = item === target;
    item.classList.toggle('open', open);
    item.querySelector('.faq-q').setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
faqItems.forEach((item) => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    setOpen(item.classList.contains('open') ? null : item);
  });
});

// "payment plan available" deep link: open that FAQ item; scroll position is
// handled by the #payment-plan anchor + scroll-margin-top (no scrollIntoView).
function openPaymentPlan() {
  const item = document.getElementById('payment-plan');
  if (item) setOpen(item);
}
if (window.location.hash === '#payment-plan') openPaymentPlan();
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#payment-plan') openPaymentPlan();
});
