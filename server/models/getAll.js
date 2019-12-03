import Database from '../db/db-connection';

const selectFrom = async (tableName, id = false) => {
  // let sql = '';
  // if (!id) {
  //   sql = `SELECT * FROM ${tableName}`;
  // } else {
  //   sql = `SELECT * FROM ${tableName} WHERE id =`;
  // }
  const sql = `select meetup_table.id, meetup_table.topic, meetup_table.location, meetup_table.happening_on, meetup_table.created_on, meetup_images_table.url as image_url from meetup_table left join meetup_images_table on meetup_table.id = meetup_images_table.meetup;`
  return Database.executeQuery(sql);
};
const selectDependent = (tableName, dependentColumnName, value) => {
  const sql = `SELECT * FROM ${tableName} WHERE ${dependentColumnName} = '${value}'`;
  Database.executeQuery(sql).then((result) => {
    if (result.rows.length) {
      return result;
    }

    return false;
  }).catch(error => error.message);
};
export { selectFrom, selectDependent };
