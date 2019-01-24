import Database from '../db/db-connection';

const selectCommon = (tableName, id = false) => {
  let sql = '';
  if (!id) {
    sql = `SELECT * FROM ${tableName}`;
  } else {
    sql = `SELECT * FROM ${tableName} WHERE id =`;
  }
  Database.executeQuery(sql).then((result) => {
    if (result.rows.length) {
      return result;
    }

    return false;
  }).catch(error => error.message);
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
export { selectCommon, selectDependent };
