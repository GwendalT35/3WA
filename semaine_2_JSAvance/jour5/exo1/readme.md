# Mise en pratique async et await

## Ojectifs

Refactoriser le TP du jour 3 en utilisant async et await et en découpant en plusieurs fichiers.

## Instructions

* Reprendre le code du TP du jour 3 (vous pouvez le reprendre depuis l'IDE)
* Créer un fichier *geoapi.js*
* Dans ce fichier, créer les 3 fonctions *getRegions*, *getDepartmentsFromRegion* et *getCitiesFromDepartment*
* Ces fonctions ne renvoient que les résultats de la requête (pas d'affichage dedans)
* Dans le fichier *main.js*, utiliser les fonctions créées en utilisant *await* et *async*