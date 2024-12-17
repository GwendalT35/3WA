# TP2 : Pong

## Rendu

Ce projet sera à réaliser en solo. Le rendu peut se faire soit par un dépôt github, soit en le déposant sur l'ide de la 3wa, soit par une archive.

## Objectifs

Réaliser une base de jeu "pong" en JavaScript natif (sans framework).

## Instructions

### Mise en place

* Créer un fichier *index.html* avec un élément *canvas* de dimension 640x360
* Créer un fichier *main.js* dans un sous-dossier "js"
* Créer un dossier "classes" qui contiendra toutes les classes
* Le fichier *main.js* doit être chargé en **type module**

### Classe GameElement

Créer une classe qui servira de base aux différents éléments du jeu (balle, joueur...). Il faudra créer un constructeur et les getter/setter.

### Classe Ball

Créer une classe pour la balle avec le constructeur et les getter/setter. On doit y retrouver toutes les propriétés nécessaires pour faire se déplacer la balle et changer de direction. Une méthode *draw* permettra de dessiner la balle.

### Classe Player

Créer une classe Player qui aura une position sur le canvas et une certaine dimension. Il faudra créer les getter/setter et le constructeur. Une méthode *draw* permettra de dessiner le joueur.

### Instanciation des classes

Dans le fichier *main.js*, créer une instance de la classe *Ball* et deux instances de *Player*.

```javascript
const ball = new Ball(320, 240, 10, "red");
const player1 = new Player(10, 240, 5, 80, "blue");
const player2 = new Player(630, 240, 5, 80, "blue");
```

### Dessin des éléments

Une fois instanciées, appeler la méthode *draw* de chacune de ces instances de classe.

```javascript
ball.draw(context);
player1.draw(context);
player2.draw(context);
```

### Déplacement de la balle

Faire en sorte que la balle se déplace de la gauche vers la droite et du haut vers le bas.

### Rebond de la balle

Lorsque la balle touche les limites du canvas (haut, bas, droite ou gauche) la balle rebondit dans l'autre sens.

### [BONUS] Rebond sur le joueur

Si la balle rebondit sur le joueur elle repart dans l'autre sens. En revanche si elle dépasse le joueur, replacer la balle au centre du canvas puis mettre à jour le score au-dessus du canvas.

### [BONUS] Déplacement du joueur

Les joueurs suivent le déplacement de la souris (uniquement sur l'axe vertical, l'axe y).