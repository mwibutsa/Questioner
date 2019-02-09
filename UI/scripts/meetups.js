/* eslint-disable no-undef */
const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-type', 'application/json');
myHeaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('user-data'))).token}`);
const getAllMeetups = async () => {
  const meetupContainer = (document.getElementsByClassName('main-content'));
  fetch('../../api/v1/meetups', { method: 'GET', headers: myHeaders })
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
<div class="tags text-center"><span>Bootcamp</span><span>Talent</span><span>Programming</span></div>
<hr>
<div class="rsvp-form">
<form onsubmit="return rsvps(this);" method="post">
<br>
<label>Will you attend this meetup? </label>
<br>
<input type = "hidden" value = "${meetup.id}" name="meetupId">
<input type ="radio" name="answer" value = "Yes" required>Yes
<input type ="radio" name="answer" value = "Maybe" required>Maybe
<input type ="radio" name="answer" value = "No"> No
<input class="button" type="submit" value="RSVP">
</form>
<br>
</div>
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

const rsvps = async (form) => {
  const meetupId = form.meetupId.value;
  const answer = form.answer.value;
  const rsvpOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ answer }),
  };
  fetch(`../../api/v1/meetups/${meetupId}/rsvps`, rsvpOptions)
    .then(rsvpResult => rsvpResult.json()).then((rsvp) => {
      alert(JSON.stringify(rsvp));
    }).catch(error => alert(`Error => ${error.message}`));
};
