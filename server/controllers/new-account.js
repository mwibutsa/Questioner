import uuid from 'uuid';
import users from '../models/user';
import Database from '../database/db_connection';
import Helper from '../helpers/helper';
import Validator from '../helpers/validation';
import joi from 'joi';
const registerUser = async (req,res) => {
    let {firstname,lastname,othername,email,phoneNumber,username,password,cpassword} = req.body;
    
    let registerQuery = `INSERT INTO user_table (id,firstname,lastname,othername,email,phone_number,username,registered,is_admin,password,token,confirmed)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;
    let dataToValidate = {
        firstname:firstname,
        lastname:lastname,
        othername:othername,
        email:email,
        phoneNumber:phoneNumber,
        username:username,
        password:password,
        cpassword:cpassword
    };
    joi.validate(dataToValidate,Validator.userSchema,async (err,data) => {
        if(err){
            console.log(err);
        }
        else{
            let newUser = [
        uuid.v4(),
        firstname,lastname,othername,email,phoneNumber,username,new Date(),0,Helper.hashPassword(password),'',0
    ];       
    const { rows } = await Database.executeQuery(registerQuery,newUser);  
        }
    })



res.json({
    status:200,
    data: await users()
});

}
export default registerUser;