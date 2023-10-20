
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



//for login form password view
var togglePassword = document.getElementById("togglePassword");
var password = document.getElementById("password");

togglePassword.addEventListener('click', function() {
  // Toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
});


//for residtration form password view

var togglePassword2 = document.getElementById("togglePassword2");
var password2 = document.getElementById("password2");

togglePassword2.addEventListener('click', function() {
  // Toggle the type attribute
  const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type);
});
