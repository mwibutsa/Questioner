# Questioner API End points <img src="https://travis-ci.org/mwibutsa/Questioner.svg?branch=develop"> <a href="https://codeclimate.com/github/mwibutsa/Questioner/maintainability"><img src="https://api.codeclimate.com/v1/badges/0c62f5ba1972945dbe6f/maintainability" /></a> <a href='https://coveralls.io/github/mwibutsa/Questioner?branch=feature_fileuload'><img src='https://coveralls.io/repos/github/mwibutsa/Questioner/badge.svg?branch=feature_fileuload' alt='Coverage Status' /></a>


Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

<strong>Questioner</strong> have UI templates which can be viewed from <a href="https://mwibutsa.github.io/Questioner/UI/index.html">Questioner UI</a>

Questioner have UI templates which can be viewed from

### Lists of API End points
- GET/api/v1/meetups Fetch all metups
- GET/api/v1/meetups/upcoming fetch all upcomming meetups
- GET/api/v1/meetups/:id  fetch a specific meetup with the given id
- GET/api/v1/questions/:id/comments
- POST/api/v1/questions/:id/comment
- POST/api/v1/users/new-account
- POST/api/v1/users/login



### Technology tools used
- Server-side Framework: Node/Express JS
- Linting Library: ESlint
- Style Guide: Airbnb
- Testing Framework: Mocha with Chai

### Additional Tools
- JavaScript Es6 with Babel transpiler
- TravisCI for Continous Integration
- Istanbul and nyc for test coverage
- CodeClimate and Coveralls for badges
- Heroku for Deployment

The url of the app on heroku is this one

*This is the list of all routes as on the heroku deployment*:
- Fetch all metups http://equestioner.herokuapp.com/api/v1/meetups
- fetch all upcomming meetups http://equestioner.herokuapp.com/api/v1/meetups/upcoming
- fetch a specific meetup with the given id http://equestioner.herokuapp.com/api/v1/meetups/<id>
- fetch all questions http://equestioner.herokuapp.com/api/v1/meetups/<id>/questions
- create new meetup http://equestioner.herokuapp.com/api/v1/meetups
- up vote a question with give id parameter http://equestioner.herokuapp.com/api/v1/questions/<id>/upvote
- down vote a question with give id parameter http://equestioner.herokuapp.com/api/v1/questions/<id>/dowvote
- reserves a place to attend meetup with the given id http://equestioner.herokuapp.com/api/v1/meetups/<id>/rsvps
- comments http://equestioner.herokuapp.com/api/v1/questions/<id>/commets
- creating new-account http://equestioner.herokuapp.com/api/v1/users/new-account
- making login http://equestioner.herokuapp.com/api/v1/users/login


### Setup Instruction
Install git 
Install Node js
For getting the files into your local machine open git bash and do git clone with repository url
```
$ git clone https://github.com/mwibutsa/questioner
```
Navigate to the folder containing all code files by typing cd folder_name
```
$ cd questioner
```
Install dependincies as they appear in package.json file by
```
$ npm install
```
To start the server do
 ```
 $ npm start
 ```
To run the test do
```
$ npm test
```
For eslint test do eslint file_name. For example this will test app.js
```
$ eslint app.js
```




