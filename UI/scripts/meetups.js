/* eslint-disable no-undef */
const myHeaders = new Headers();
const user = (JSON.parse(localStorage.getItem('user-data'))).data[0];
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-type', 'application/json');
myHeaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('user-data'))).token}`);
const uploadHeaders = new Headers();
uploadHeaders.append('Accept', 'application/json')
uploadHeaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('user-data'))).token}`);

function getMeetupById () {
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
            <div class="text-container question-flex">
              <div class="user-icon">${user.firstname}</div>
              <div class="question-container">
              <h3 class="question-title">${question.title}</h3>
              <p class="question-body">     
                ${question.body}
              </p><br>
              <hr>
              <div class="voting-form" >
              <i class="far fa-comments"  style="font-size:24px" onclick="toggleCommentForm('${question.id}')"></i>
                  <form class="inline-form" method="PATCH" onsubmit="processVote(this);">
                      <input type="hidden" name="vote" value="upvote">
                      <input type="hidden" name="questionId" value="${question.id}">
                      <i class="fa fa-thumbs-o-up" style="font-size:24px" onclick="processVotes('upvote','${question.id}')">${question.upvotes}</i>
                  </form>
                  <form  class="inline-form" method="PATCH" onsubmit="processVotes(this);">
                      <input type="hidden" name="vote" value="downvote">
                      <input type="hidden" name="questionId" value="${question.id}">
                      <i class="fa fa-thumbs-o-down" style="font-size:24px" onclick="processVotes('downvote','${question.id}')">${question.downvotes}</i>
                  </form>
              </div>
              <hr>
              <div class="comment comment-form" id="${question.id}">
                    <h5 class="text-center">Comments</h5>
                  <div id="comments-${question.id}" class="comment-area">${commentHTML.html}</div>
                  <div class="meetup-form">
                      <form id="form-${question.id}" method="POST">
                          <div class="form-input">
                              <label for="question">Your Comment</label><br>
                              <textarea name="comment" rows="2" id="topic" class="textarea" required></textarea>
                          </div>
                          <button name ="${question.id}" onclick="addComment(this)">Comment</button>
                      </form>
                  </div>
              </div>
            </div></div>`;
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
}
function getAllMeetups () {
  const meetupContainer = (document.getElementsByClassName('main-content'));
  fetch('../../api/v1/meetups/upcoming', { method: 'GET', headers: myHeaders })
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
<p class="extra"><span>Happening on : </span>${meetup.happening_on}</p>
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
}

function rsvp (button) {
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
}
function createMeetup(){
  const form = document.getElementById('meetupForm');
  const {
    topic, location, tag, happeningOn, meetupImage,
  } = form;

  const data = new FormData();
  const myFile = meetupImage.files[0];
  if(myFile) {
    data.append('meetupImage', myFile, myFile.name);
  }

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
      fetch(`../../api/v1/meetups/${createdMeetup.data[0].id}/images/add`, {
        method: 'POST',
        headers: uploadHeaders,
        body: data
      }).then((result) => result.json()).then((image) => {
        if (image.data) {
          document.getElementById('info').innerHTML = `<b>The Image Was Uploaded as ${image.data[0].url} </b>`;
        } else {
          alert (`Error : ${JSON.stringify(image)}`);
        }
      }).catch(error => alert(error));
      } else if (typeof createdMeetup.error !== 'string') {
        const erros = [...createdMeetup.error];
        erros.forEach((err) => {
          document.getElementById(err.path).innerHTML = err.message;
        });
      } else {
        document.getElementById('meetup-error').innerHTML = `${createdMeetup.error}`;
      }
      topic.value = '';
      location.value = '';
      happeningOn.value = '';
      meetupImage.value = '';
    })
    .catch(error => alert(`Server Error ${error}`));
}
function askQuestion() {
  const form = document.getElementById('question-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const meetupId = form.meetupId.value;
    const { title, body } = form;
    const question = { title: title.value, body: body.value };
    title.value = '';
    body.value = '';
    fetch(`../../api/v1/meetups/${meetupId}/questions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(question),
    }).then(result => result.json())
      .then((postedQuestion) => {
        getMeetupById();
      }).catch(error => alert(error));
  });
};
function toggleCommentForm(questionId) {
  displayComments(questionId);
  const commentForm = document.getElementById(questionId);
  commentForm.classList.toggle('comment');
}
function addComment(button) {
  const form = document.getElementById(`form-${button.name}`);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { comment } = form;
    const data = { comment: comment.value };
    comment.value = '';
    fetch(`../api/v1/questions/${button.name}/comment`,
      {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
      })
      .then(result => result.json())
      .then((commentResult) => {
        if (commentResult.data) {
          getMeetupById();
        } else {
          alert(JSON.stringify(commentResult));
        }
      }).catch(error => alert(error));
  });
}

function displayComments (questionId) {
  const commenteArea = document.getElementById(`comments-${questionId}`);
  fetch(`../api/v1/questions/${questionId}/comments`, { method: 'GET', headers: myHeaders })
    .then(result => result.json())
    .then((commentResult) => {
      if (commentResult.data) {
        if (commentResult.data.length) {
          let commentHTML = '';
          commentResult.data.forEach((comment) => {
            commentHTML += `<div class="one-comment">${comment.body}</div><br>`;
          });
          commenteArea.innerHTML = commentHTML;
        } else {
          commenteArea.innerHTML = 'Be the first one to comment on this Question';
        }
      }
    }).catch(error => alert(error));
}
function processVotes(voteMethod, questionId) {
  fetch(`../../api/v1/questions/${questionId}/${voteMethod}`, { method: 'PATCH', headers: myHeaders })
  .then((result) => result.json()).then((voted) => {
    if(voted.data) {
      getMeetupById();
    } else {
      alert(JSON.stringify(voted));
    }
  })
}
