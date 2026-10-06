# Diana Trip Fly — landing page

Frontend local autonome en HTML, CSS et JavaScript natifs. Aucune dépendance npm, aucune API, aucun backend et aucune donnée persistée. Aucun déploiement n’a été effectué.

## Lancement

Dans le dossier extrait, avec Python 3 :

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Ouvrir http://localhost:8080. Sous Windows, `py -m http.server 8080 --bind 127.0.0.1` fonctionne aussi. Arrêter avec Ctrl+C. L’ouverture directe de `index.html` est également possible, mais un serveur local est préférable.

## Structure

- `index.html` : sections, formulaires et boîte de dialogue native.
- `css/styles.css` : palette, responsive, splash et réduction des animations.
- `js/app.js` : navigation mobile, onglets accessibles, validation et récapitulatif de recherche, présentations VIP, newsletter de démonstration.
- `assets/diana-logo.jpg` : logo fourni par le client, intégré sans modification dans l’en-tête, le splash, le footer et le favicon. Les marges sont masquées en CSS.
- `assets/hero.webp` : visuel généré, compressé localement.
- `assets/dubai.svg`, `assets/zanzibar.svg` : illustrations graphiques originales, non photographiques.
- `scripts/check.py` : contrôle structurel des fichiers, ancres et assets.
- `WORKTREE.md` : commandes exécutées et instructions Git.

## Comportements et limites

Le splash est défini dans le HTML et stylé par CSS dès le chargement. Il reste 1,25 seconde, puis disparaît en fondu sur 0,45 seconde : 1,7 seconde au total. La disparition ne dépend pas de JavaScript. Le visuel hero est préchargé, avec fond bleu nuit en repli. La durée est bornée ; une connexion lente peut encore charger l’image après la disparition du splash. L’animation ne bloque pas l’accès clavier au contenu. `prefers-reduced-motion` supprime le splash et les mouvements.

Vols et séjours affichent seulement les critères saisis. Aucun prix, inventaire, résultat commercial ou réservation n’est inventé. Les cartes préremplissent le formulaire. Les options VIP ouvrent une présentation explicite de démonstration. La newsletter valide le format de l’e-mail mais ne réalise aucune inscription, aucun envoi ni stockage.

Les trois piliers sont les propositions du brief, à confirmer avant publication. Aucun témoignage fictif n’a été créé : la section présente un état vide explicite. Aucune certification, aucun partenaire ou badge de paiement n’est revendiqué. Les mentions légales indiquent les informations non fournies. Ce frontend est complet, mais les contenus réglementaires et commerciaux vérifiés sont nécessaires pour une publication officielle.

## Vérification

Contrôles effectués : syntaxe JavaScript avec `node --check js/app.js`, contrôles structurels avec `python scripts/check.py`, cohérence des assets et worktree Git. Aucun test visuel dans un navigateur automatisé n’a été effectué dans cet environnement.

Vérifications manuelles à effectuer dans votre navigateur :

1. Recharger : observer le splash et son fondu ; activer la réduction des animations pour vérifier son absence.
2. À 390 px, 768 px et 1440 px : vérifier le menu, les champs et l’absence de défilement horizontal.
3. Choisir un séjour, puis un vol : le départ est requis uniquement pour les vols. Tester champs vides, date passée et formulaire valide.
4. Cliquer sur une destination : vérifier le préremplissage et le focus sur le formulaire.
5. Naviguer au clavier : Tab, onglets avec flèches/Home/End, fenêtres VIP avec Échap, retour du focus.
6. Saisir un e-mail : vérifier le message de non-inscription. Dans l’onglet Réseau, constater l’absence d’appels externes.
7. Désactiver JavaScript : la présentation reste accessible et le splash disparaît. Les contrôles interactifs nécessitent JavaScript.

## Visuel généré

Asset : `assets/hero.webp`. Généré avec l’outil image intégré, puis compressé en WebP. Prompt utilisé : scène photographique de voyage haut de gamme, lagon tropical, villas sur pilotis et jetée à droite, mer et ciel dégagés à gauche pour la typographie, lumière de fin d’après-midi, sans personne, texte, logo ou hôtel nommé. Les visuels sont illustratifs et ne représentent pas une offre vérifiée.
