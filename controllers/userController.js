const { generateToken } = require('../jwt');
const userModel = require('../models/userModel');

module.exports.signUp = async (req,res)=>{
    try{
        const newUser = new userModel(req.body);

        const {email} = newUser;
        const dublicateUser = await userModel.findOne({email});
        if(dublicateUser){
            return res.status(404).json({message:'user email already exist'})
        }

        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
        console.log(`${saveUser} signUp successfully`)
    }catch(err){
        console.log(err)
    }
}



module.exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email:email});

        if(!user){
            return res.status(401).json({message:'Invalid Credential'});
        }else if( !(await user.comparePassT(password))){
            return res.status(401).json({message:'Invalid Credential'});
        }

        //paylaod for token
        const payload = {
            id:user.id,
            email: user.email
        }
        //generate token
        const token = generateToken(payload);

        res.status(201).json({token:token, user:user})

    }catch(err){
        console.log(err);
        res.status(501).json({error:'Internal server Error',details: err.message})
    }
}


module.exports.getUsers = async(req,res)=>{
    try{
        const allUsers = await userModel.find();
        res.status(201).json(allUsers);
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Internal server Error'})
    }
}

