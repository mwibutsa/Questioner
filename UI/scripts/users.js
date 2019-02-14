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

const signUp = (event) => {
  event.preventDefault();
  alert('hello');
};