const allMeetups = fetch('https://mwibutsa.github.io/Questioner/UI/meetups.html');
allMeetups.then(result => result.json()).then((meetups) => {
  console.log(meetups);
}).catch(error => console.log(error));
