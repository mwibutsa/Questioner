import jsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const verifyToken = (req,res,next) => {
    let verified = false;
    if(req.headers['authorization']){
        const tokenData = req.headers['authorization'].split(' ');
        const token = tokenData[1];
        verified = jsonWebToken.verify(token,process.env.SECRETKEY);
    }
    else{
        return res.status(403).json({
            status: 403,
            error: 'Please log into your account first',
        });
    }
    if(verified){
        console.log(verified);
        next();
    }
    else{
        return res.sendStatus(403);
    }
}
export default verifyToken;