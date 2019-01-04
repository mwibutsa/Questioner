import fs from 'fs';
import meetup from '../models/meetup';
const getUpcommingMeetups = (req, res) => {
  let now = new Date();
  now = now.getTime();
  const upComming = meetups.filter(meetup =>{
    let intDate = meetup.happeningOn.split('-');
    let date = new Date(parseInt(intDate[2]),parseInt(intDate[1]),parseInt(intDate[0]));
    if(date.getTime() > (new Date()).getTime()){
      return meetup;
    }

  });
  
  if (upComming) {
    res.json({status:200,data:upComming});
  } else {
    res.json({
      status: 404,
      error: 'No upcomming meetups',
    });
  }
};
export default getUpcommingMeetups;