/* eslint-disable no-undef */
const myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-type', 'application/json');
myHeaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('user-data'))).token}`);

const getMeetupById = async () => {
  const meetupId = window.localStorage.getItem('current-meetup');
  if (meetupId) {
    fetch(`../../api/v1/meetups/${meetupId}`, { method: 'GET', headers: myHeaders })
      .then(result => result.json())
      .then((meetupResult) => {
        if (meetupResult.data) {
          if (meetupResult.data.length) {
            // load meetup and it's questions as well as comments on each and every question
            document.getElementById('meetup-topic').innerHTML = meetupResult.data[0].topic;
            document.getElementById('meetupId').value = meetupResult.data[0].id;
            // check if there are some questions
            let questionHTML = '';
            const commentHTML = { html: '' };
            fetch(`../../api/v1/meetups/${meetupResult.data[0].id}/questions`,
              { method: 'GET', headers: myHeaders }).then(result => result.json())
              .then((questions) => {
                if (questions.data.length) {
                  questions.data.forEach(async (question) => {
                    commentHTML.html = 'No comments';
                    questionHTML += `
            <div class="text-container">
              <span class="votes">User</span>
              <h3 class="question-title">${question.title}</h3>
              <p class="question-body">     
                ${question.body}
              </p>
              <div class="voting-form" >
                  <form class="inline-form" method="PATCH" onsubmit="processVote(this);">
                      <input type="hidden" name="vote" value="upvote">
                      <input type="hidden" name="questionId" value="${question.id}">
         <i class="fa fa-thumbs-o-up" style="font-size:24px">${question.upvotes}</i>
                  </form>
                  <form  class="inline-form" method="PATCH" onsubmit="processVote(this);">
                      <input type="hidden" name="vote" value="downvote">
                      <input type="hidden" name="questionId" value="${question.id}">
                      <i class="fa fa-thumbs-o-down" style="font-size:24px">${question.downvotes}</i>
                  </form>
              </div>
              <i class="fas fa-comment-dots" onclick="toggleCommentForm()"></i>
              <div class="form-container comment">
                  <div id="commentHere">${commentHTML.html}</div>
                  <div class="meetup-form">
                      <form action="#" method="POST">
                          <div class="form-input">
                              <label for="question">Your Comment</label><br>
                              <textarea name="topic" rows="4" id="topic" class="textarea" required></textarea>
                          </div>
                      </form>
                  </div>
              </div>
            </div>`;
                  });
                  document.getElementById('asked-questions').innerHTML = questionHTML;
                } else {
                  document.getElementById('asked-questions').innerHTML = 'Be the first one to ask a question';
                }
              }).catch(error => alert(`Erro ${error}`));
          } else {
            // message 'No meetup with this id is found'
            document.getElementById('meetup-topic').innerHTML = 'Reflesh the page';
          }
        } else {
          // there was an error
        }
      }).catch(error => alert(JSON.stringify(error)));
  }
};
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
<div class="tags text-center"><span>Bootcamp</span><span>Talent</span><span>Programming</span></div>
<hr>
<div class="rsvp-form">
<form id="${meetup.id}" method="post">
<br>
<label>Will you attend this meetup? </label>
<br>
<input type = "hidden" value = "${meetup.id}" name="meetupId">
<input type ="radio" name="answer" value = "Yes" required>Yes
<input type ="radio" name="answer" value = "Maybe" required>Maybe
<input type ="radio" name="answer" value = "No"> No
<button onclick="rsvp(this)" name ="${meetup.id}">Rsvp</button>
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

const rsvp = (button) => {
  const form = document.getElementById(button.name);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const meetupId = form.meetupId.value;
    const answer = form.answer.value;
    const rsvpOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ answer }),
    };
    fetch(`../../api/v1/meetups/${meetupId}/rsvps`, rsvpOptions)
      .then(rsvpResult => rsvpResult.json()).then((rsvps) => {
        if (rsvps.data) {
          window.localStorage.setItem('current-meetup', meetupId);
          window.location.replace('meetup.html');
        } else {
          alert(JSON.stringify(rsvps));
        }
      }).catch(error => alert(`Error => ${error.message}`));
  });
};
function toggleCommentForm() {
  const commentForm = document.getElementsByClassName('comment');
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < commentForm.length; i++) {
    ((index) => {
      commentForm[index].classList.toggle('show-comment');
    })(i);
  }
}
const createMeetup = async () => {
  const form = document.getElementById('meetupForm');
  const {
    topic, location, tag, happeningOn, meetupImage
  } = form;
  const newMeetup = {
    topic: topic.value,
    location: location.value,
    happeningOn: happeningOn.value,
  };
  fetch('../api/v1/meetups', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(newMeetup),
  })
    .then(result => result.json()).then((createdMeetup) => {
      if (createdMeetup.data) {
        window.location.reload();
      } else if (typeof createdMeetup.error !== 'string') {
        const erros = [...createdMeetup.error];
        erros.forEach((err) => {
          document.getElementById(err.path).innerHTML = err.message;
        });
      } else {
        document.getElementById('meetup-error').innerHTML = `${createdMeetup.error}`;
      }
    })
    .catch(error => alert(error));
};
const askQuestion = () => {
  const form = document.getElementById('question-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const meetupId = form.meetupId.value;
    const { title, body } = form;
    const question = { title: title.value, body: body.value };
    fetch(`../../api/v1/meetups/${meetupId}/questions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(question),
    }).then(result => result.json())
      .then((postedQuestion) => {
        title.value = '';
        body.value = '';
        getMeetupById();
      }).catch(error => alert(error));
  });
};
