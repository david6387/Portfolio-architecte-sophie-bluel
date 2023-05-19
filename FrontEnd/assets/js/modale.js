const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const btnCloseModal = document.querySelector(".close-modal");
const secondModal = document.querySelector(".modal-two");
const btnCloseModalTwo = secondModal.querySelector(".close-modal");
const secondModalTrigger = document.querySelector(".add-photo-btn");
const overlay = document.querySelector(".overlay");
const previousModal = document.querySelector(".previous-modal");
const deleteGallery = document.querySelector(".supprimer");
const modalPrimary = document.querySelector(".modal");
const validationButton = document.querySelector(".validation-btn");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
btnCloseModal.addEventListener("click", function (event) {
  modalContainer.classList.remove("display-block");
  modalContainer.classList.add("hidden");
  console.log(event);
});
btnCloseModalTwo.addEventListener("click", function (event) {
  modalContainer.classList.remove("display-block");
  modalContainer.classList.add("hidden");
});
overlay.addEventListener("click", function (event) {
  modalContainer.classList.remove("display-block");
  modalContainer.classList.add("hidden");
  console.log(event);
});
previousModal.addEventListener("click", function (event) {
  modalPrimary.classList.toggle("hidden");
  secondModal.classList.toggle("hidden");
});
secondModalTrigger.addEventListener("click", function (event) {
  modalPrimary.classList.toggle("hidden");
  secondModal.classList.toggle("hidden");
});
function toggleModal() {
  modalContainer.classList.add("display-block");
  modalContainer.classList.remove("hidden");
}

//--------------------------------------/

// let works = [];

const galleryModal = document.querySelector(".gallery-modal");

// const apiWorks = async () => {
//   await fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((worksResponse) => {
//       works = worksResponse;
//     });
// };

const displayWorksOnModal = async () => {
  await apiWorks();

  for (let work of works) {
    let figure = document.createElement("figure");
    figure.setAttribute("data-categoryid", work.categoryId);
    figure.setAttribute("class", "figure-modale");
    let img = document.createElement("img");
    let iconeCroix = document.createElement("i");
    iconeCroix.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
    let icone = document.createElement("i");
    icone.setAttribute("class", "fa-solid fa-trash-can");
    icone.addEventListener("click", () => {
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.status);
        displayWorks();
        displayWorksOnModal();
      });
    });

    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);

    figure.appendChild(img);
    figure.appendChild(iconeCroix);
    figure.appendChild(icone);
    galleryModal.appendChild(figure);
  }
};
displayWorksOnModal();

// Formulaire ---------------------------------------

const selectCategory = document.querySelector("#select-category");

async function showCategory() {
  await apiCategories();
  for (let category of categories) {
    let option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    selectCategory.appendChild(option);
  }
}

showCategory();

validationButton.addEventListener("click", function (event) {
  console.log(document.querySelector("#project-title").value);
  console.log(document.querySelector("#img-input").value);
  console.log(document.querySelector("#select-category").value);
  event.preventDefault();
});
