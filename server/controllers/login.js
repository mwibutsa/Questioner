import joi from 'joi';
import users from '../models/user';
import Helper from '../helpers/helper';
import validate from '../helpers/validation';
import Validator from '../helpers/validation';
import Database from '../database/db_connection';

const authenticateUser = (req,res) => {
    let userAccount = {
        email:req.body.email,
        password:req.body.password
    };
    joi.validate(userAccount,Validator.loginSchema,async (error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            let getUser = `SELECT * FROM user_table WHERE email = '${userAccount.email}'`;
            const { rows } = await Database.executeQuery(getUser);
            console.log(rows[0].id)
            if(Helper.comparePassword(userAccount.password,rows[0].password)){
                req.session.user_id = rows[0].id;
                req.session.username = rows[0].username;
                req.session.user_email = rows[0].email;
                console.log(req.session)
                res.json({
                    status:200,
                    data:rows[0]
                });
            }
            else{
                res.json({
                    status:401,
                    error:"Invalid username or password"
                });
            }
        }
    });
}
export default authenticateUser;