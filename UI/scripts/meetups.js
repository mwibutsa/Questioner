/* eslint-disable no-undef */
const getAllMeetups = async () => {
  const meetupContainer = (document.getElementsByClassName('main-content'));
  const allMeetups = fetch('https://equestioner.herokuapp.com/api/v1/meetups');
  allMeetups
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
<br>
<div class="rsvp-form">
<button class="toggle-reserve-form">Reserve Place</button>
</div>
<hr>
<div class="tags"><span>Bootcamp</span><span>Talent</span><span>Programming</span></div>
</div>
`;
        });
      } else {
        meetupCard = 'No meetups are available';
      }
      meetupContainer[0].innerHTML = meetupCard;
    })
    .catch((error) => {
          
    });
};
