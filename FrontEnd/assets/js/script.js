// Récupération des travaux depuis le fichier JSON / API

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    console.log(works);
  });

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// création des balises avec createElement

const article = works[0];
const imageElement = document.createElement("img");
imageElement.src = article.imageUrl;
const titleElement = document.createElement("h2");
titleElement.innerText = article.title;
const nameElement = document.createElement("p");
nameElement.innerText = article.name;

// rattachement des balises au DOM

const sectionPortfolio = document.querySelector(".portfolio");

sectionPortfolio.appendChild(imageElement);
