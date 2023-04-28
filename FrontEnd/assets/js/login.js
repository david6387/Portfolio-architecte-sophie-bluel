const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}*/g;
// /[a-zA-Z0-9._]*@[a-zA-Z0-9-]*\.[a-z]*/gm
// [a-z]+\.[a-z0-9]+@[a-z]+\.[a-z]{2,3}
const regexPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const formLogin = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailError = document.querySelector("#emailMsgErreur");
const pswError = document.querySelector("#pswMsgErreur");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
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
    passwordError.innerText = "Le mot de passe n'est pas assez sécurisé";
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
        console.log(data);
        // vérifier erreurs ds data... créer div
      })
      .catch((error) => console.log(error));
  }
});
