'use strict';
// All interactions are local: no API, storage, booking or newsletter submission.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const form = document.querySelector('#travel-form');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const result = document.querySelector('#search-result');
let mode = 'Séjour';
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
form.elements.date.min = localDate();
function selectTab(tab, moveFocus = false) {
  mode = tab.dataset.mode;
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  document.querySelector('#search-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#origin-field').hidden = mode !== 'Vol';
  form.elements.origin.required = mode === 'Vol';
  form.elements.origin.disabled = mode !== 'Vol';
  document.querySelector('#destination-label').textContent = mode === 'Vol' ? 'ARRIVÉE' : 'DESTINATION';
  result.hidden = true;
  if (moveFocus) tab.focus();
}
selectTab(tabs[0]);
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); selectTab(next, true); }
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const destination = form.elements.destination.value.trim();
  const origin = form.elements.origin.value.trim();
  form.elements.destination.setCustomValidity(destination ? '' : 'Indiquez une destination.');
  form.elements.origin.setCustomValidity(mode !== 'Vol' || origin ? '' : 'Indiquez une ville de départ.');
  form.elements.date.min = localDate();
  if (!form.reportValidity()) return;
  const departure = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(`${form.elements.date.value}T12:00:00`));
  const count = Number(form.elements.travelers.value);
  const route = mode === 'Vol' ? `${origin} → ${destination}` : destination;
  result.textContent = `${mode} : ${route} · Départ le ${departure} · ${count} voyageur${count > 1 ? 's' : ''}. Démonstration uniquement : aucun inventaire interrogé, aucun prix calculé et aucune réservation effectuée.`;
  result.hidden = false;
});
['destination', 'origin'].forEach(name => form.elements[name].addEventListener('input', () => { form.elements[name].setCustomValidity(''); result.hidden = true; }));
['date', 'travelers'].forEach(name => form.elements[name].addEventListener('change', () => { result.hidden = true; }));
document.querySelectorAll('[data-destination]').forEach(card => card.addEventListener('click', () => {
  selectTab(tabs[0]); form.elements.destination.value = card.dataset.destination;
  form.elements.destination.setCustomValidity('');
  document.querySelector('#search').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  form.elements.destination.focus({ preventScroll: true });
}));

const dialog = document.querySelector('#detail-dialog');
const contents = {
  jet: ['Jet privé', 'Démonstration d’une demande de vol privé : itinéraire, date, nombre de passagers et préférences de cabine. Cette interface ne consulte aucun opérateur et ne réserve aucun appareil. La prestation et sa disponibilité restent à confirmer auprès de Diana Trip Fly.'],
  helicopter: ['Transferts héliportés', 'Présentation d’une option de transfert par hélicoptère entre deux lieux à définir. Faisabilité, opérateur, conditions et prix doivent être confirmés par l’agence. Aucune réservation n’est effectuée ici.'],
  lounge: ['Salons VIP', 'Présentation d’une option d’accès à un salon d’aéroport. L’accès dépend de l’aéroport, de la compagnie et des conditions du salon. Cette démonstration ne délivre aucun accès ni confirmation.'],
  legal: ['Mentions légales — état de la maquette', 'Cette page est une démonstration frontend de Diana Trip Fly. La raison sociale, l’adresse, les coordonnées de l’éditeur, le responsable de publication, les références d’immatriculation et les informations de l’hébergeur n’ont pas été fournis. Les mentions légales définitives doivent être renseignées et vérifiées avant une mise en ligne commerciale.'],
  privacy: ['Confidentialité', 'Cette version ne transmet et ne conserve aucune information saisie dans les formulaires. Elle ne dépose aucun cookie, ne charge aucun outil de suivi et utilise des ressources locales. La recherche et la newsletter fonctionnent uniquement en démonstration dans votre navigateur. Une politique adaptée devra être établie si des services connectés sont ajoutés.']
};
function openDetails(key) {
  const [title, copy] = contents[key];
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-copy').textContent = copy;
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.setAttribute('aria-describedby', 'dialog-copy');
  dialog.showModal();
}
document.querySelectorAll('[data-vip]').forEach(button => button.addEventListener('click', () => openDetails(button.dataset.vip)));
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => openDetails(button.dataset.legal)));
document.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#newsletter-status').textContent = 'Démonstration : inscription non effectuée. Votre adresse n’a été ni envoyée ni conservée.';
  event.target.reset();
});
document.querySelector('#year').textContent = new Date().getFullYear();
// CSS is the fallback: splash hides after 1.7 seconds even if JS fails.
const splash = document.querySelector('.splash');
splash.addEventListener('animationend', event => { if (event.animationName === 'splash-out') splash.remove(); });
