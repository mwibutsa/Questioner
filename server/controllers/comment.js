import Database from '../db/db-connection';
import Validator from '../helpers/validation';
import token
const getComment = (req,res,next) => {
    const sql = `SELECT * FROM comment_table  WHERE meetup = ${req.params.id}`;
    const comments = Database.executeQuery(sql);
    comments.then((result) => {
        if(result.rows.length) {
            return res.status(200).json({
                status: 200,
                data: result.rows,
            });
        }
        else{
            return res.status(404).json({
                status: 404,
                error: 'No comments are available for this question',
            });
        }
    }).catch((error) => {
        return res.status(500).json({
            status: 500,
            error: `Internal server error: ${error}`
        });
    });
}

const postComment = (req,res,next) => {
    const sql = `INSERT INTO comment_table`
}