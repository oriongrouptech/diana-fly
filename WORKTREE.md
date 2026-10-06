# Configuration Git exécutée

Le workspace était vide et hors de tout dépôt Git. Un dépôt local a donc été initialisé, puis un véritable worktree Git lié a été créé.

Commandes exactes exécutées depuis `/workspace/scratch/17b72395161e` :

```sh
mkdir -p diana-trip-fly-repo
git -C diana-trip-fly-repo init -b main
git -C diana-trip-fly-repo -c user.name='Codex' -c user.email='codex@local.invalid' commit --allow-empty -m 'chore: initialize Diana Trip Fly repository'
git -C diana-trip-fly-repo worktree add -b feature/landing-page-diana ../diana-trip-fly
```

Tous les travaux frontend ont ensuite utilisé comme répertoire de travail :

```text
/workspace/scratch/17b72395161e/diana-trip-fly
```

Branche : `feature/landing-page-diana`. Dépôt principal : `../diana-trip-fly-repo`. Aucun remote n’a été ajouté.

L’archive de livraison contient les sources portables et un bundle Git, pas le fichier `.git` du worktree lié : celui-ci référence un chemin propre à cet environnement.

Pour restaurer l’historique ailleurs, extraire l’archive, puis exécuter dans son dossier :

```sh
git clone -b feature/landing-page-diana diana-trip-fly.bundle diana-trip-fly-repo
git -C diana-trip-fly-repo switch main
git -C diana-trip-fly-repo worktree add ../diana-trip-fly feature/landing-page-diana
```

Ces commandes de restauration sont documentées, elles n’ont pas été exécutées ici.
