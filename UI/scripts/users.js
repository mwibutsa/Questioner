const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-type', 'application/json');
const login = (form) => {
  const email = (form.username.value).trim();
  const password = (form.password.value).trim();
  const loginOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ email, password }),
  };
  fetch('../../api/v1/users/login', loginOptions)
    .then(userResult => userResult.json()).then((user) => {
      if (user.status === 202) {
        window.localStorage.setItem('user-data', JSON.stringify(user));
        window.location.replace('meetups.html');
      } else {
        alert(JSON.stringify(user));
      }
    }).catch(error => alert(JSON.parse(error)));
};

const signUp = () => {
  const form = document.getElementById('signup-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const {
      firstname, lastname, othername, email, username, password, cpassword, phoneNumber,
    } = form;
    const newUser = {
      firstname: firstname.value,
      lastname: lastname.value,
      othername: othername.value,
      email: email.value,
      username: username.value,
      password: password.value,
      cpassword: cpassword.value,
      phoneNumber: phoneNumber.value,
    };
    fetch('../api/v1/users/new-account', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newUser),
    }).then(userResponse => userResponse.json()).then((user) => {
      if (user.data) {
        window.location.replace('login.html');
      } else if (typeof user.error !== 'string') {
        const erros = [...user.error];
        erros.forEach((err) => {
          document.getElementById(err.path).innerHTML = err.message;
        });
      } else {
        document.getElementById('account-error').innerHTML = `${user.error}`;
      }
    }).catch(error => alert(error));
  });
};
