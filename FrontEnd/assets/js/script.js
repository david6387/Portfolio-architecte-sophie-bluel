let works = [];

const sectionPortfolio = document.querySelector("#portfolio");
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
  // console.log(categories);
  for (let category of categories) {
    // console.log(category);
    // debugger;
    let newLi = document.createElement("li");
    let buttonOfCategories = document.createElement("button");

    buttonOfCategories.innerText = category.name;

    newLi.appendChild(buttonOfCategories);
    sectionCategories.appendChild(newLi);

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

/------------------------------------------/;

let isConnected = sessionStorage.getItem("isConnected");
console.log(isConnected);
let token = sessionStorage.getItem("token");

async function displayAdminContent() {
  if (isConnected && token) {
    const connexionButton = document.querySelector("#btn-login");
    connexionButton.innerText = "logout";
    connexionButton.addEventListener("click", function (event) {
      sessionStorage.clear();
    });

    // gerer affichage
    const editionBanner = document.querySelector(".edition");
    editionBanner.classList.replace("hidden", "display-flex");
    const editionButton = document.querySelector(".modal-trigger");
    editionButton.classList.replace("hidden", "display-inlineBlock");
    const buttonsCategories = document.querySelector(".categories");
    console.log(buttonsCategories);
    buttonsCategories.classList.replace("display-flex", "hidden");

    const sectionIntroduction = document.querySelector("#introduction");
    const modifButtons = sectionIntroduction.querySelectorAll(".modify-btn");
    modifButtons.forEach(function (button) {
      button.classList.replace("hidden", "display-block");
    });
  }
}

displayAdminContent();
