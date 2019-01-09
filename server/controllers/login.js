import joi from 'joi';
import users from '../models/user';
import Helper from '../helpers/helper';
import validate from '../helpers/validation';

const authenticateUser = (req,res) => {
    let userAccount = {
        username:req.body.username,
        password:req.body.password
    };
    joi.validate(userAccount,)
    const user = users.find(user => user.username === userAccount.username && user.password === userAccount.password);
    if(user){
        res.json({
            status:200,
            data:user
        });
    }
    else{
        res.json({
            status:404,
            error:"Invalid username and or password"
        });
    }
}
export default authenticateUser;