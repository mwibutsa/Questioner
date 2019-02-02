import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';

const editMeetup = (req, res) => {
    joi.validate(req.body, Validation.meetupSchema,Validation.validationOption).then((result) => {
        const { topic, location, happeningOn } = result;
        const updatedMeetup = [topic,location,happeningOn];
        const sql = `UPDATE meetup_table SET topic = $1, location = $2, happening_on = $3
         WHERE id = '${req.params.id}' RETURNING *`;
         Database.executeQuery(sql, updatedMeetup).then((updateResult) => {
             if(updateResult.rows) {
                 if(updateResult.rows.length) {
                     return res.status(202).json({ status: 202, data: updateResult.rows});
                 }
             } else {
                 return res.status(500).json({ status: 500, erro: `Not updated: ${updateResult}`})
             }
         })
           .catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
    }).catch(error => res.status(400).json({ status: 400, error: error.details }))
};
export default editMeetup;
