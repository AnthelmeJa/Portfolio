



//Span helloMouv

const span = document.querySelector(".js-helloMouve");
const cas=["Anthelme Jarreau", "développeur full stack junior" ,"motivate","the man you want to work with" ]
let index = 0;

function Mouv() {
  setInterval(() => {
    // Étape 1 : grossit
    span.classList.add("js-mouv");

    // Étape 2 : rétrécit après 1s
    setTimeout(() => {
      span.classList.remove("js-mouv");
    }, 1000);

    // Étape 3 : fade-out → change texte → fade-in
    setTimeout(() => {
      span.classList.add("fade-out");

      setTimeout(() => {
        index = (index + 1) % cas.length;
        span.innerText = cas[index];
        span.classList.remove("fade-out");
      }, 280); // le texte change après que le fade-out soit visible
    }, 1000); // début du changement après rétrécissement
  }, 4000);
}

Mouv();








//Cards git with fetch
const username = "AnthelmeJa";
const cardsSection = document.querySelector(".cards");

const previews = {
  "booki-starter-code-master": "https://anthelmeja.github.io/booki-starter-code-master/",
  "bre03-projet-paint": "https://anthelmeja.github.io/bre03-projet-paint/"
};

const screenshots = {
  "booki-starter-code-master": "img/booki.png",
  "bre03-projet-paint": "img/paint.png"
  // il y'en aura d'autre
};
// Fonction pour récupérer et décoder le README
async function getReadmeSnippet(repoName) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`);
  if (!res.ok) return "README non disponible.";
  const data = await res.json();
  const decoded = atob(data.content);
  const lines = decoded.split('\n').slice(0, 5).join(' ');
  return lines || "README vide.";
}

fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(async repos => {
    for (const repo of repos) {
      const description = await getReadmeSnippet(repo.name);

      // Vérifie si une preview personnalisée existe
      const projectUrl = previews[repo.name] || repo.html_url;
      const projectUrl1 = repo.html_url;
      const imageSrc = screenshots[repo.name] || `https://opengraph.githubassets.com/1/${username}/${repo.name}`;

      const article = document.createElement("article");
      article.classList.add("card");

      article.innerHTML = `
        <img src="${imageSrc}" alt="aperçu ${repo.name}">
        <a href="${projectUrl1}"><h3>${repo.name}</h3><a/>
        <p>${description}</p>
        <button><a href="${projectUrl}" target="_blank">Voir plus</a></button>
      `;

      cardsSection.appendChild(article);
    }
  })
  .catch(err => {
    console.error("Erreur lors du chargement des projets GitHub :", err);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Impossible de charger les projets.";
    cardsSection.appendChild(errorMsg);
  });