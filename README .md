# Lab 3 - Application de Prévision Météo

**Important :** veuillez lire attentivement ce document avant de commencer. Ces règles et consignes vous serviront tout au long du semestre.

<p align="center">
 <a href="https://gitlab.com/tw-ece-paris/naming-conventions" target="_blank">Politique de nommage</a>
</p>

## Objectif

Dans ce laboratoire, vous allez développer une application de prévision météo en utilisant HTML, CSS, JavaScript et l'API d'OpenWeatherMap. Ce TP vous aidera à apprendre à interagir avec une API REST et à manipuler le DOM pour afficher des informations dynamiques en fonction de la ville saisie par l'utilisateur.

---

## Pré-requis

1. **Génération de votre clé API personnelle :**

   - Pour éviter d'être limités par le nombre de requêtes d'une seule clé API, chaque étudiant doit générer sa propre clé API.
   - Rendez-vous sur [OpenWeatherMap](https://home.openweathermap.org/users/sign_up), inscrivez-vous et créez une nouvelle clé API.
   - Une fois votre clé obtenue, remplacez `API_KEY` dans le fichier `API_Weather.js` par votre clé personnelle :
     ```javascript
     const API_KEY = "VOTRE_CLE_API_ICI";
     ```

---

## Instructions

### Partie 1 : Compréhension du Code Existant

1. Lisez le code HTML et JavaScript pour comprendre comment l'application est structurée.
2. Identifiez les éléments du DOM ciblés par le code, en particulier ceux affichant les informations météo.

### Partie 2 : Adapter le Comportement de l'Application

1. **Exécution automatique de la fonction `start()` au chargement de la page :**
   - La fonction `start()` doit s'exécuter dès le chargement de la page, sans action utilisateur.
   - **Supprimez le bouton** "Quel temps fait-il aujourd'hui ?" dans `index.html`.
   - Utilisez un événement de chargement du DOM pour exécuter la fonction `start` sans intervention de l'utilisateur.
   - **Documentation suggérée :** [DOMContentLoaded](https://developer.mozilla.org/fr/docs/Web/API/Window/DOMContentLoaded_event)

2. **Recherche par ville saisie par l'utilisateur :**
   - La ville par défaut pour la météo est "Paris". Ajoutez la possibilité pour l'utilisateur de saisir une ville dans le champ de recherche.
   - Lors du clic sur "Actualiser", la météo doit se mettre à jour pour la ville saisie.
   - **Étapes :**
     - Récupérez la valeur de l'input utilisateur.
     - Modifiez dynamiquement la propriété `city` de `weatherAPI` pour correspondre à cette valeur.
     - Appelez la fonction `start()` pour mettre à jour les informations.
   - **Documentation suggérée :** [HTMLInputElement.value](https://developer.mozilla.org/fr/docs/Web/API/HTMLInputElement/value)

3. **Prévisions météo pour trois jours :**
   - Utilisez le nouvel [**endpoint `/forecast` de l'API**](https://openweathermap.org/forecast5) pour récupérer les prévisions météo sur les jours à venir.
   - **Rappel :** L'API fournit des données pour les 5 jours suivants avec une résolution de **3 heures**. Vous devrez extraire une seule prévision par jour.
   - Modifiez `API_Weather.js` pour inclure une méthode `getThreeDayForecast()` qui utilise cet endpoint.
   - **Étapes suggérées :**
     - Utilisez des méthodes de traitement de tableau comme `filter`, `map`, `includes` et `slice` pour obtenir et afficher une valeur par jour.
     - **Documentation suggérée :**
       - [Array.prototype.filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
       - [Array.prototype.map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
       - [Array.prototype.slice](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
       - [String.prototype.includes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

### Bonus

1. **Lancer automatiquement la recherche dès trois caractères saisis :**
   - Ajoutez un écouteur d'événements `input` au champ de texte `#city-input`.
   - Dès que l'utilisateur a tapé trois caractères ou plus, déclenchez automatiquement une recherche, sans attendre le clic sur "Actualiser".
   - **Documentation suggérée :** [Event.input](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/input_event)

---

## Partie 2 : Mise en Page Responsive

### Instructions :

1. Utilisez le **grid system de Bootstrap** pour organiser les sections météo de manière fluide et responsive. Cela permettra de garantir que l'interface s'adapte bien aux écrans de différentes tailles.  
   - Utilisez des classes comme **`col-*`**, **`container-*`**, etc., pour chaque jour de la météo afin d’améliorer la lisibilité des informations. Consultez la [documentation Bootstrap - Grid System](https://getbootstrap.com/docs/5.3/layout/grid/).

   ![](./assets/img1.png)

   ![](./assets/img2.png)  

   ![](./assets/img3.png)

2. **Affichage pour les écrans < 575px :**  
   - **Avec Bootstrap :**  
     - Utilisez les classes de visibilité responsive pour cacher les sections "Après demain" sur les écrans plus petits. Pour plus d'informations, consultez la section [Bootstrap Responsive Utilities](https://getbootstrap.com/docs/5.3/utilities/display/).  

   - **Avec Media Queries :**  
     - Vous pouvez également utiliser des **media queries** pour masquer certaines sections spécifiques sur les petits écrans.
     - Ajoutez un attribut id sur la section spécifique au jour "D+2" et faite en sorte de la rentre invisible via une media query pour les écran de taille très reduite. Vous pouvez apprendre à utiliser les media queries dans la [documentation MDN sur les Media Queries](https://developer.mozilla.org/fr/docs/Web/CSS/Media_Queries/Using_media_queries).

   ![](./assets/img.png)

### Documentation suggérée :

- [Bootstrap Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Bootstrap Responsive Utilities](https://getbootstrap.com/docs/5.3/utilities/display/)
- [CSS Media Queries](https://developer.mozilla.org/fr/docs/Web/CSS/Media_Queries/Using_media_queries)

En suivant ces instructions et en consultant les documentations proposées, vous devriez obtenir une application météo fonctionnelle et interactive. Bon courage !
