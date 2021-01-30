#Client VueJS Poly'Movies

###Ewald Janin & Félix Martelin - WebServices 2020/2021

Ce repository est un client [VueJS](https://vuejs.org) réalisé dans le cadre de notre cours de WebServices à Polytech Lyon.

Ce client est utilisé pour consommer les données d'une base de données de films, d'acteurs, de personnages, et de réalisateurs, mises à disposition à l'aide d'un webserver Spring Boot disponible sur [ce repository](https://github.com/felixMartelin/WebService) 

Trois vues principales servent à afficher les trois principaux types de données (films, acteurs et personnages), et deux autres vues secondaires sont utilisées pour modifier/ajouter des données.

Nous avons utilisé et adapté un composant de tableau disponible en ligne, de même pour un formulaire.

Ce serveur peut être installé avec la commande `npm install`, à effectuer dans le dossier dans lequel se situe le projet. Il pourra ensuite être lancé APRES le webserver avec `npm run serve`. Le client sera ainsi accessible à [cette adresse](http://localhost:8081/). 