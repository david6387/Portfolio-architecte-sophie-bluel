// Gestion de la page de connexion ----------------------
const formLogin = document.querySelector("#login-form");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  const regexEmail = /^[a-z]+\.[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");
  let validationCompte = 0;
  if (email.value === "") {
    email.style.border = "2px solid red";
    emailError.innerText = "Ce champ ne doit pas être vide";
  } else if (regexEmail.test(email.value) === false) {
    email.style.border = "2px solid red";
    emailError.innerText = "Ce n'est pas un email valide";
  } else {
    email.style.border = "2px solid green";
    emailError.innerText = "";
    validationCompte++;
  }

  if (password.value === "") {
    password.style.border = "2px solid red";
    passwordError.innerText = "Vous devez renseigner ce champ";
  } else if (regexPassword.test(password.value) === false) {
    password.style.border = "2px solid red";
    passwordError.innerText = "Mot de passe incorrect";
  } else {
    password.style.border = "2px solid green";
    passwordError.innerText = "";
    validationCompte++;
  }

  if (validationCompte === 2) {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "user not found" || data.error) {
          alert("Erreur dans l’identifiant ou le mot de passe");
        } else {
          sessionStorage.setItem("isConnected", true);
          sessionStorage.setItem("token", data.token);
          location.assign("index.html");
        }
      })
      .catch((error) => console.log(error));
  }
});
