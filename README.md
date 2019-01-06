# Questioner API End points <img src="https://travis-ci.org/mwibutsa/Questioner.svg?branch=develop"> | <a href='https://coveralls.io/github/mwibutsa/Questioner?branch=feature_fileuload'><img src='https://coveralls.io/repos/github/mwibutsa/Questioner/badge.svg?branch=feature_fileuload' alt='Coverage Status' /></a>
<hr>
Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

<strong>Questioner</strong> have UI templates which can be viewed from <a href="https://mwibutsa.github.io/Questioner/UI/index.html">Questioner UI</a>

<h3>&#8227; &nbsp; List of API End point</h3>

<ol>
  <li><b>GET/api/v1/meetups</b>&nbsp; fetch all meetups</li>
  <li><b>GET/api/v1/meetups/upcomming</b>&nbsp; fetch all upcomming meetups</li>
  <li><b>GET/api/v1/meetups/:id</b>&nbsp; fetch a specific meetup with the given id</li>
  <li><b>GET/api/v1/questions</b>&nbsp; fetch all questions</li>
  <li><b>POST/api/v1/meetups</b>&nbsp; create new meetup</li>
  <li><b>PUT/api/v1/questions/:id/upvote</b>&nbsp; upvote a question with give id parameter</li>
  <li><b>PUT/api/v1/questions/:id/upvote</b>&nbsp; down a question with give id parameter</li>
  <li><b>POST/api/v1/meetups/:id/rsvp</b> &nbsp; reserves a place to attend meetup with the given id</li>
</ol>


