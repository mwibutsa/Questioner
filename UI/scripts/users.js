const myHeaders = new Headers();
// myHeaders.append('Accept', 'application/json, text/plain, */*');
myHeaders.append('Content-type', 'application/x-www-form-urlencoded');
const login = (form) => {
  const email = (form.username.value).trim();
  const password = (form.password.value).trim();
  const loginOptions = {
    method: 'POST',
    headers: myHeaders,
    body: { email, password },
  };
  const userPromise = fetch('http://localhost:3000/api/v1/users/login', loginOptions);
  userPromise.then(userResult => userResult.json()).then((user) => {
    alert(JSON.stringify(user));
  }).catch(error => alert(error));
};
