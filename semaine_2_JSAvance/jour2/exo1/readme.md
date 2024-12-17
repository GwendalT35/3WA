# Mise en pratique

## Divers

Attention lorsque vous chargez un fichier en type module, vous devez lancer un serveur pour que cela fonctionne bien.

## Instructions

### Mise en place

* Créer un fichier *index.html* avec un élément *canvas* de dimension 640x480
* Créer un fichier *main.js* dans un sous-dossier "js"
* Créer un dossier "classes" qui contiendra toutes les classes
* Le fichier *main.js* doit être chargé en **type module**

### Création des classes

* Créer une classe *Shape* qui sera la classe de base pour les formes
* Créer une classe *Rectangle* qui permettra de dessiner des rectangles
* Créer une classe *Circle* qui permettra de dessiner des cercles

Il faudra à chaque fois des propriétés privées pour les classes, des constructeurs et des getter/setter.

### Méthode draw

Créer une méthode *draw* dans les classes *Rectangle* et *Circle* qui va permettre de dessiner la forme dans le canvas.

### Code principal

Dans le fichier *main.js*, dessiner plusieurs rectangles et plusieurs cercles de couleurs différentes.