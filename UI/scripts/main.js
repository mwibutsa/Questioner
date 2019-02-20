function onReady() {
}
function showNavigation() {
  const menu = document.getElementById('mainNav');
  menu.classList.toggle('change');
}
function sowUserNavigation() {
  const menu = document.getElementById('sideNav');
  menu.classList.toggle('change');
}


class User {
  constructor(firstname, lastname, otheName, email, username, phoneNumber, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.otheName = otheName;
    this.email = email;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}
const users = [];

function registerUser(form) {
  console.log(document.getElementById('signup-form'));
  const firstname = form.firstname.value;
  const lastname = form.lastname.value;
  const otheName = form.otherName.value;
  const email = form.email.value;
  const username = form.username.value;
  const phoneNumber = form.phoneNumber.value;
  const password = form.password.value;
  const cpassword = form.cpassword.value;
  users.push(new User(firstname, lastname, otheName, email, username, phoneNumber, password));
}
