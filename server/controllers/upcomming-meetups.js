import meetups from '../models/meetup';

// get all meetups upcomming meetups

const getUpcommingMeetups = async (req, res) => {
  // get al meetups from the database
  const allMettups = await meetups();
  // filter meeups with happening date greater than todya
  const upComming = allMettups.filter(meetup =>{
    let happeningOn = (new Date(meetup.happening_on)).getTime();
    if(happeningOn > (new Date()).getTime()){
      return meetup;
    }

  });
  
  // if there are upcomming meetups

  if (upComming) {
    res.json({status:200,data:upComming});
  } else { // if there is no upcomming meetup
    res.json({
      status: 404,
      error: 'No upcomming meetups',
    });
  }
};
export default getUpcommingMeetups;