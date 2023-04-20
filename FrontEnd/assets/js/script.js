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
    figure.setAttribute("data-categoryid", work.categoryId);
    figure.setAttribute("class", "display");
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
  // let buttonForAll = document.createElement("button");
  // buttonForAll.innerText = "Tous";
  // sectionCategories.appendChild(buttonForAll);
  categories.unshift({ name: "Tous" });
  console.log(categories);
  for (let category of categories) {
    console.log(category);
    // debugger;
    let newLi = document.createElement("li");
    let buttonOfCategories = document.createElement("button");

    buttonOfCategories.innerText = category.name;

    newLi.appendChild(buttonOfCategories);
    sectionCategories.appendChild(newLi);

    // buttonsOfCategories.addEventListener("mouseover", () => {
    //   buttonsOfCategories.style.background = "#1D6154";
    //   buttonsOfCategories.style.color = "white";
    // });
    // buttonsOfCategories.addEventListener("mouseout", () => {
    //   buttonsOfCategories.style.background = "white";
    //   buttonsOfCategories.style.color = "#1D6154";
    // });
    // buttonForAll.addEventListener("mouseover", () => {
    //   buttonForAll.style.background = "#1D6154";
    //   buttonForAll.style.color = "white";
    // });
    // buttonForAll.addEventListener("mouseout", () => {
    //   buttonForAll.style.background = "white";
    //   buttonForAll.style.color = "#1D6154";
    // });
    console.log(category.id);
    buttonOfCategories.addEventListener("click", () => {
      let figures = document.querySelectorAll("figure");
      for (let figure of figures) {
        if (category.id !== undefined) {
          if (
            parseInt(figure.getAttribute("data-categoryid")) === category.id
          ) {
            figure.classList.replace("display", "hidden");
          } else {
            figure.classList.replace("hidden", "display");
          }
        } else {
          figure.classList.replace("hidden", "display");
        }
      }
      // const worksAll = works.filter((work) => {
      //   return works;
      // });
      // console.log(worksAll);
    });
  }
};
displayCategories();

// const boutonDescription = document.querySelector(".btn-nodesc");

// Il faudra aussi gérer quand l'utilisateur clique sur un des boutons
// avec un addEventListener pour trier en fonction de la catégorie.

// Bien penser en amont à mettre un attribut custom qui contiendra
// l'identifiant de la catégorie sur chaque élément figure.

// Pour ensuite boucler sur toutes les figures et switcher entre
// deux classes (une pour faire apparaître et une pour faire disparaitre)
//  si l'identifiant correspond à la catégorie.
