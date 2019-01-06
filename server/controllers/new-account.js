import joi from 'joi';
import uuid from 'uuid';
import users from '../models/user';
import fs from 'fs';
export default registerUser = (req,res) => {
    let newUser = {
        id:uuid.v4(),
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        othername:req.body.lastname,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        username:req.body.username,
        registered: new Date(),
        isAdmin:false
    }
users.push(newUser);
fs.writeFileSync(path.resolve(__dirname,'../data/users.json'),JSON.stringify(users,null,2));
res.json({
    status:200,
    data:users
});

}