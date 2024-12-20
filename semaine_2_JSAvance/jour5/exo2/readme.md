# Mise en pratique API mediadevices

## Objectifs

* Utiliser l'API JS mediadevices pour récupérer la liste des périphériques vidéos de l'utilisateur et afficher le flux de la caméra.
* Manipuler les promesses grâce aux mot-clés *async* et *await*.

## Instructions

### Mise en place de l'interface utilisateur

* Créer un menu déroulant pour la liste des webcam
* Créer un bouton *Valider* pour sélectionner la webcam
* Créer un élément html `<video>` dans lequel on affichera le flux de la webcam
* Créer un bouton *Prendre une photo* pour effectuer de capture photo de la webcam
* Créer une image qui ne sera pas affichée par défaut (ce sera la capture photo de la webcam)
* Créer un bouton *Sauver l'image* pour enregistrer l'image

### Afficher la liste des périphériques

Lorsque l'on arrive sur la page, afficher la liste des webcam de l'utilisateur dans un menu déroulant.

[Documentation](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices)

### Choix de la caméra

Lorsque l'on clique sur le bouton *Valider*, on enregistre le flux de la caméra dans l'élément video (ne pas oublier de lancer la vidéo, cf la doc).

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/MediaDevices/getUserMedia)

### Prendre la photo

Lorsque l'on clique sur le bouton *Prendre une photo* on réalise une capture photo du flux de la caméra et on l'affiche dans l'élément image (ne pas oublier de ne plus la cacher).

[BONUS] Prendre une photo en noir et blanc

### Enregister la photo

Lorsque l'on clique sur le bouton *Sauver l'image*, cela nous fait télécharger l'image.