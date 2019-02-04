import Database from '../db/db-connection';

const selectFrom = async (tableName, id = false) => {
  let sql = '';
  if (!id) {
    sql = `SELECT * FROM ${tableName}`;
  } else {
    sql = `SELECT * FROM ${tableName} WHERE id =`;
  }
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
