const jwt = require('jsonwebtoken');

const jwtAuthMidddleware = async(req,res,next)=>{
    const authorize = req.headers.authorization;
    if(!authorize){
        return res.status(401).json({error:'Token not found'})
    }

    const token = authorize.split(' ')[1];

    try{
        const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);

        req.jwtDecode = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'})
    }
}


const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}



module.exports = {jwtAuthMidddleware, generateToken};



