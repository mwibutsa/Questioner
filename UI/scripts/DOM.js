const allMeetups = fetch('http://localhost:3000/');
allMeetups.then(result => result.json()).then((meetups) => {
  console.log(meetups);
}).catch(error => console.log(error));
