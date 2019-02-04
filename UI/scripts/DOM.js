const allMeetups = fetch('');
allMeetups.then(result => result.json()).then((meetups) => {
  console.log(meetups);
}).catch(error => console.log(error));
