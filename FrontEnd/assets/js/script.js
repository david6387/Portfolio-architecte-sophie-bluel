// Récupération des travaux depuis le fichier JSON / API

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    console.log(works);
  });

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// création des balises avec createElement

// rattachement des balises au DOM
