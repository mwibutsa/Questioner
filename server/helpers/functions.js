const getToken = (req) => {
    if(req.headers['authorization']){
        return  req.headers['authorization'].split(' ')[1];
    }
    else{
        return false;
    }
    }

export default getToken;