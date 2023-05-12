const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const btnCloseModal = document.querySelector(".close-modal");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
btnCloseModal.addEventListener("click", function (event) {
  modalContainer.classList.remove("active");
  modalContainer.classList.add("hidden");
  console.log(event);
});
function toggleModal() {
  modalContainer.classList.add("active");
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

    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);

    figure.appendChild(img);
    galleryModal.appendChild(figure);
  }
};
displayWorksOnModal();

// <i class="fa-solid fa-trash-can"></i>
//  <i class="fa-solid fa-arrows-up-down-left-right"></i>
