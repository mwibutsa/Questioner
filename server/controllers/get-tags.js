import Database from '../db/db-connection';

const getTags = (req, res) => {
  const sql =  'SELECT * FROM tag_table';
  Database.executeQuery(sql)
    .then(result => result.json())
    .then((tags) => {
      if(tags.rows) {
        return res.status(200).json({ status: 200, data: tags.rows });
      }
    }).catch(error => res.status(500).json({ status: 500,  error: `Internal server error: ${error}`}));
};

const getMeetupTags = (req, res) => {
  const sql =  `SELECT * FROM meetup_tags_table WHERE meetup_id = ${req.params.id}`;
  Database.executeQuery(sql).then((result.json())).then((tags) => {
    if (tags.rows) {
      return res.status(200).json({ status: 200, data: tags.rows });
    }
  }).catch(error => res.status(500).json({ status:  500,  error: `Internal server error: ${error}`}));
}