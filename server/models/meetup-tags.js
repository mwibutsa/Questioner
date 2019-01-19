import Database from '../db/db-connection';

const meetupTags = async () => {
  const sql = 'SELECT * FROM meetup_tags_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default meetupTags;
