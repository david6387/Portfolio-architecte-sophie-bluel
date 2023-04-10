let works = [];

const sectionPortfolio = document.querySelector("#portfolio");
// const gallery = document.querySelector("#portfolio .gallery");
const gallery = document.getElementsByClassName("gallery")[0];
// Récupération des travaux depuis le fichier JSON / API
const apiWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((worksResponse) => {
      // console.log(worksResponse);
      works = worksResponse;
    });
};
// const response = await fetch("http://localhost:5678/api/works");
// const works = await response.json();

// création des balises avec createElement
const displayWorks = async () => {
  await apiWorks();
  // console.log(works);
  for (let work of works) {
    // console.log(work);
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);
    // figcaption.setAttribute("figcpation", work.title);
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
};
displayWorks();

// Affichage des catégories
let categories = [];

const sectionCategories = document.getElementsByClassName("categories")[0];
// console.log("categories");
const apiCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categoriesResponse) => {
      // console.log(categoriesResponse);
      categories = categoriesResponse;
    });
};

const displayCategories = async () => {
  await apiWorks();
  await apiCategories();
  // console.log(categories);
  for (let category of categories) {
    console.log(category);
    // debugger;
    let newLi = document.createElement("li");
    let buttonsOfCategories = document.createElement("button");
    let buttonForAll = document.createElement("button");

    buttonsOfCategories.innerText = category.name;
    buttonForAll.innerText = "Tous";

    newLi.appendChild(buttonsOfCategories);
    sectionCategories.appendChild(newLi);

    buttonsOfCategories.addEventListener("mouseover", () => {
      buttonsOfCategories.style.background = "#1D6154";
      buttonsOfCategories.style.color = "white";
    });
    buttonsOfCategories.addEventListener("mouseout", () => {
      buttonsOfCategories.style.background = "white";
      buttonsOfCategories.style.color = "#1D6154";
    });
  }
};
displayCategories();

// Il faudra aussi gérer quand l'utilisateur clique sur un des boutons
// avec un addEventListener pour trier en fonction de la catégorie.

// Bien penser en amont à mettre un attribut custom qui contiendra
// l'identifiant de la catégorie sur chaque élément figure.

// Pour ensuite boucler sur toutes les figures et switcher entre
// deux classes (une pour faire apparaître et une pour faire disparaitre)
//  si l'identifiant correspond à la catégorie.
