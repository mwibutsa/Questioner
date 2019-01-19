import Database from '../db/db-connection';

const meetupImages = async () => {
  const sql = 'SELECT * FROM meetup_images_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default meetupImages;
