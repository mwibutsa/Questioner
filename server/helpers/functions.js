import jsonWebToken from 'jsonwebtoken';
const getToken = (req) => {
    if(req.headers['authorization']){
       const token =  req.headers['authorization'].split(' ')[1];
       const tokenData = jsonWebToken.verify(token,process.env.SECRETKEY);
       if(tokenData) {
           return tokenData;  
       }
       else{
           return false;
       }
    }
    else{
        return false;
    }
    }

export default getToken;