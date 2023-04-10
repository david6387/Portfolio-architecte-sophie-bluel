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
    let newUl = document.createElement("ul");
    let listOfCategories = document.createElement("li");

    listOfCategories.innerText = category.name;

    newUl.appendChild(listOfCategories);
    sectionCategories.appendChild(newUl);
  }
};
displayCategories();
// const article = works[0];
// const imageElement = document.createElement("img");
// imageElement.src = article.imageUrl;
// const titleElement = document.createElement("h2");
// titleElement.innerText = article.title;
// const categoryElement = document.createElement("p");
// categoryElement.innerText = article.categoryId;
// if (categoryId == 1) {
//   console.log("Objets");
// } else if (categoryId == 2) {
//   console.log("Appartements");
// } else if (categoryId == 2) {
//   console.log("Hotels & restaurants");
// }

// rattachement des balises au DOM

// sectionPortfolio.appendChild(imageElement);
// sectionPortfolio.appendChild(titleElement);
// sectionPortfolio.appendChild(categoryElement);
// sectionPortfolio.appendChild();
// sectionPortfolio.appendChild();
