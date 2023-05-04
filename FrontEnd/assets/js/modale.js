const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
function toggleModal() {
  modalContainer.classList.toggle("active");
}

//--------------------------------------/

let works = [];

const galleryModal = document.querySelector(".gallery-modal");

const apiWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((worksResponse) => {
      works = worksResponse;
    });
};

const displayWorks = async () => {
  await apiWorks();

  for (let work of works) {
    let figure = document.createElement("figure");
    figure.setAttribute("data-categoryid", work.categoryId);
    figure.setAttribute("class", "display");
    let img = document.createElement("img");

    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);

    figure.appendChild(img);
    galleryModal.appendChild(figure);
  }
};
displayWorks();
