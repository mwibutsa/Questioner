/* eslint-disable no-undef */
const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-type', 'application/json');
myHeaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('user-data'))).token}`);

const getAllMeetups = () => {
  const meetupContainer = (document.getElementsByClassName('main-content'));
  fetch('../../api/v1/meetups/', { method: 'GET', headers: myHeaders })
    .then(result => result.json())
    .then((meetups) => {
      let meetupCard = '';
      if (meetups.data.length > 0) {
        // display all meetups
        const { data } = meetups;
        data.forEach((meetup) => {
          meetupCard += `
  <div class="meetup">
  <div class="topic">${meetup.topic}</div>
  <br>
  <div class="location"><b>Location: </b>${meetup.location}</div>
  <br>
  <p class="extra">${meetup.happening_on}</p>
  <hr>
  <button onclick = "deleteMeetup(this); getAllMeetups();" name="${meetup.id}">Delete</button>
  <button onclick = "editMeetup(this);" name="${meetup.id}">Edit</button>
  </div>
  `;
        });
      } else {
        meetupCard = 'No meetups are available';
      }
      meetupContainer[0].innerHTML = meetupCard;
    })
    .catch((error) => {
      meetupContainer[0].innerHTML = error.message();
    });
};
const deleteMeetup = (button) => {
  fetch(`../api/v1/meetups/${button.name}`, {
    method: 'DELETE',
    headers: myHeaders,
  })
    .then(deletedMeetup => deletedMeetup.json())
    .then((deleted) => {
      getAllMeetups();
    });
};
const editMeetup = () => {

};
