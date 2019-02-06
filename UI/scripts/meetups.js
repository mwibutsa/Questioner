const getAllMeetups = async () => {
	const allMeetups = fetch('https://equestioner.herokuapp.com/api/v1/meetups');
	allMeetups
	  .then(result => result.json())
	    .then((meetups) => {
	    	if(meetups.data.length > 0) {
	    		// display all meetups
	    		const { data } = meetups;
	    		data.forEach((meetup) => {
	    		const meetupCard = `
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
	    		`
	    		console.log(meetupCard);
	    		})

	    	} else {
	    		console.log('======No meetups are availale=====');
	    		// display a no meetup availale message
	    	}
	    }).catch((error) => {

	    });
}
getAllMeetups();