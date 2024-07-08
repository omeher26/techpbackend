
const mongoose = require('mongoose');

const projectModel = mongoose.Schema({
    pname :{
        type: String,
        require : true
    },
    reason:{
        type : String,
        require: true
    },
    typeB:{
        type: String,
        require: true
    },
    division:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    priority:{
        type: String,
        enum:['High', 'Medium', 'Low'],
        require: true
    },
    department:{
        type: String,
        require: true
    },
    sDate:{
        type: Date,
        require: true
    },
    eDate:{
        type: Date,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    status:{
        type: String,
        enum:['Register', 'Start','Running', 'Close','Cancelled'],
        default: 'Register',
        require: true
    },
    lastUpd:{
        type: Date,
        default: Date.now,
    },
})

const updLastUpd = async function(next){
    const project = this.getUpdated();
    if(project.status){
        project.lastUpd = Date.now();
    }
    next();
}

projectModel.pre('updateOne', updLastUpd);
projectModel.pre('updateMany', updLastUpd);
// projectModel.pre('findOneAndUpdate', updLastUpd);
// projectModel.pre('update', updLastUpd);



// projectModel.pre('save', function(next){
//     if (this.isModified('status')) {
//         this.lastUpd = Date.now();
//     }
//     next();
// })


module.exports = mongoose.model('projectdata',projectModel);



