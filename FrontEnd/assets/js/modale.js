const modalContainer = document.querySelector(".modal-container");
const modalTrigger = document.querySelector(".modal-trigger");
const galleryScreen = document.querySelector(".modal");
const uploadScreen = document.querySelector(".modal-two");
const btnCloseModal = document.querySelector(".close-modal");
const btnCloseModalTwo = uploadScreen.querySelector(".close-modal");
const secondModalTrigger = document.querySelector(".add-photo-btn");
const overlay = document.querySelector(".overlay");
const previousModalTrigger = document.querySelector(".previous-modal");
const deleteGallery = document.querySelector(".empty-gallery");
const validationButton = document.querySelector(".validation-btn");
const galleryModal = document.querySelector(".gallery-modal");

// Gestion ouverture & fermeture des écrans de la modale -----------

modalTrigger.addEventListener("click", toggleModal);

btnCloseModal.addEventListener("click", function (event) {
  modalContainer.classList.toggle("hidden");
});
btnCloseModalTwo.addEventListener("click", function (event) {
  modalContainer.classList.toggle("hidden");
});
overlay.addEventListener("click", function (event) {
  modalContainer.classList.toggle("hidden");
});
secondModalTrigger.addEventListener("click", function (event) {
  galleryScreen.classList.toggle("hidden");
  uploadScreen.classList.toggle("hidden");
});
previousModalTrigger.addEventListener("click", function (event) {
  galleryScreen.classList.toggle("hidden");
  uploadScreen.classList.toggle("hidden");
});

function toggleModal() {
  modalContainer.classList.toggle("hidden");
}

// Affichage de la galerie dans le 1er écran de la modale & suppression travaux -----------

const displayWorksOnModal = async () => {
  try {
    await apiWorks();
    for (let work of works) {
      let figure = document.createElement("figure");
      figure.setAttribute("data-categoryid", work.categoryId);
      figure.setAttribute("data-workid", work.id);
      figure.setAttribute("class", "figure-modale");
      let img = document.createElement("img");
      let txt = document.createElement("p");
      txt.innerText = "éditer";
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
        })
          .then(() => {
            document
              .querySelectorAll(`[data-workid='${work.id}']`)
              .forEach((work) => work.remove());
          })
          .catch((error) =>
            console.log("Erreur à la suppresion d'une image : " + error)
          );
      });

      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);
      figure.appendChild(img);
      figure.appendChild(txt);
      figure.appendChild(icone);
      galleryModal.appendChild(figure);
      addMoveCursorToImages(figure);
    }
  } catch (error) {
    console.log(
      "Erreur lors de l'affichage / la supression des travaux dans la galerie de la modale :",
      error
    );
  }
};
displayWorksOnModal().catch((error) => {
  console.log("Erreur lors de l'éxécution de displayWorksOnModal :", error);
});

// Fonction permettant de supprimmer tous les travaux ------------------

function deleteAllWorks() {
  deleteGallery.addEventListener("click", () => {
    // for (let work of works) {
    //   fetch(`http://localhost:5678/api/works/${work.id}`, {
    //       method: "DELETE",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         authorization: `Bearer ${token}`,
    //       },
    //     })
    // } Prévoir route pour supprimer tous les travaux
    galleryModal.innerHTML = "";
    gallery.innerHTML = "";
    toggleModal();
  });
}
deleteAllWorks();

// Ajout de l'icone de déplacement au survol des éléments de la galerie --------------------

function addMoveCursorToImages(figure) {
  if (!figure) {
    return;
  }

  let dragIcon = document.createElement("i");

  figure.addEventListener("mouseover", (e) => {
    dragIcon.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
    figure.appendChild(dragIcon);
  });
  figure.addEventListener("mouseout", (e) => {
    figure.removeChild(dragIcon);
  });
}

// <select> Liste d'options des catégories du Formulaire d'ajout d'une photo---------------------------------------

async function showCategory() {
  const selectCategory = document.querySelector("#project-category");
  try {
    await apiCategories();
    for (let category of categories) {
      let option = document.createElement("option");
      option.value = category.id;
      option.innerText = category.name;
      selectCategory.appendChild(option);
    }
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des catégories de la liste d'option :",
      error
    );
  }
}

showCategory();

// Prévisualisation / aperçu de la photo à l'ajout ---------------------------------------

function previewImage() {
  const file = document.getElementById("img-input");

  if (!file?.files) {
    return;
  }

  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const labelAddPhoto = document.querySelector(".add-picture");
    document.getElementById("preview").setAttribute("src", event.target.result);
    labelAddPhoto.classList.replace("display-flex", "hidden");
    preview.classList.remove("hidden");
  };
  fileReader.readAsDataURL(file?.files[0]);
}

//  Soumission du formulaire d'ajout d'une photo ---------------------------------------

const formToAddPicture = document.querySelector(".form-modal");
const projectImage = document.querySelector("#img-input");
const projectTitle = document.querySelector("#project-title");
const projectCategory = document.querySelector("#project-category");
const titleError = document.querySelector("#project-title-error");
const categoryError = document.querySelector("#project-category-error");
const imageError = document.querySelector("#image-error");

function checkFormFields() {
  if (
    projectImage.value !== "" &&
    projectTitle.value !== "" &&
    projectCategory.value !== ""
  ) {
    validationButton.style.backgroundColor = "#1D6154";
  } else {
    validationButton.style.backgroundColor = "";
  }
}

formToAddPicture.addEventListener("change", checkFormFields);

formToAddPicture.addEventListener("submit", function (event) {
  event.preventDefault();

  let countForFormValidation = 0;

  if (projectTitle.value === "") {
    projectTitle.style.border = "2px solid red";
    titleError.innerText = "Ce champ ne doit pas être vide";
  } else {
    projectTitle.style.border = "2px solid green";
    titleError.innerText = "";
    countForFormValidation++;
  }
  if (projectImage.value === "") {
    projectImage.style.border = "2px solid red";
    imageError.innerText = "Veuillez ajouter une image";
  } else {
    projectImage.style.border = "2px solid green";
    imageError.innerText = "";
    countForFormValidation++;
  }
  if (projectCategory.value === "") {
    projectCategory.style.border = "2px solid red";
    categoryError.innerText = "Veuillez sélectionner une catégorie";
  } else {
    projectCategory.style.border = "2px solid green";
    categoryError.innerText = "";
    countForFormValidation++;
  }

  if (countForFormValidation === 3) {
    let formData = new FormData();
    formData.append("title", projectTitle.value);
    formData.append("image", projectImage.files[0]);
    formData.append("category", projectCategory.value);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        displayWorks();
        displayWorksOnModal();
      })
      .catch((error) => console.log(error));
  }
});
