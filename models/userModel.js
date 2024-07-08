
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(user.password, salt);
        user.password = hashPass;
        next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassT = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

module.exports = mongoose.model('usersInfo', userSchema);



