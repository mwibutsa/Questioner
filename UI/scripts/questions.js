const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-type', 'application/json');
headers.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('user-data'))).token}`);


const askQuestion = (form) => {
  form.preventDefault();
  const meetupId = form.meetupId.value;
  const title = form.title.value;
  const body = form.body.value;
  const question = { title, body };
  fetch(`../../api/v1/meetups/${meetupId}/questions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(question),
  }).then(result => result.json())
    .then((postedQuestion) => {
        window.location.replace('meetup.html');
    }).catch(error => alert(error));
};
