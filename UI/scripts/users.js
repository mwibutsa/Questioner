const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-type', 'application/json');
function login() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { username, password } = form;
    const account = { email: username.value, password: password.value };
    const loginOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(account),
    };
    fetch ('../../api/v1/users/login', loginOptions)
      .then(userResult => userResult.json())
      .then((user) => {
        if (user.data) {
          window.localStorage.setItem('user-data', JSON.stringify(user));
          window.location.replace('meetups.html');
        } else if (typeof user.error !== 'string') {
          const erros = [...user.error];
          erros.forEach((err) => {
            document.getElementById('login-error').innerHTML += `${err.message}<br>`;
          });
        } else {
          document.getElementById('login-error').innerHTML = `${user.error}`;
        }
      }).catch(error => alert(JSON.stringify(error)));
  });
}

function signUp (){
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
}
