// Umbrage Studio — mobile nav toggle, FAQ accordion, payment-plan deep link.

// Mobile nav: toggle the drop panel and morph the hamburger into an X.
const nav = document.querySelector('.site-nav');
const burger = document.querySelector('.nav-burger');
if (burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
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
