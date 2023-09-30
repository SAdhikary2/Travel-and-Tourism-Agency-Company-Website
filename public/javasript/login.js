
const login = document.querySelector(".login-btn");
const register = document.querySelector(".register-btn");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const btnActiveBack = document.querySelector(".btn-active-back");

login.addEventListener("click", () => {
  btnActiveBack.style.left = "0px";
  registerForm.style.left = "115%";
  loginForm.style.left = "0px";
});

register.addEventListener("click", () => {
  btnActiveBack.style.left = "50%";
  registerForm.style.left = "0px";
  loginForm.style.left = "-115%";
});
