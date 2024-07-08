
const projectModel = require('../models/prodataModel');

module.exports.createProject = async(req,res)=>{
    try{
        const newProject = new projectModel(req.body);

        // unique project name
        const {pname} = newProject;
        const dublicateProject = await projectModel.findOne({pname});
        if(dublicateProject){
            return res.status(404).json({message:'Project already exist'})
        }

        // valid priority
        const priority = ['High', 'Medium', 'Low'];
        if(!priority.includes(newProject.priority)){
            return res.status(400).json({error: 'Invalid project priority'})
        }

        // valid status
        const status = ['Register', 'Start','Running','Close','Cancelled'];
        if(!status.includes(newProject.status)){
            return res.status(401).json({error:'Invalid project Status'})
        }

        const saveProject = await newProject.save();
        res.status(201).json(saveProject);
        console.log(`${saveProject} add successfully`);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error',details: err.message})
    }
}



module.exports.allProjects = async(req,res)=>{
    try{
        const allPro = await projectModel.find();
        res.status(201).json(allPro)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
}


module.exports.updateProject = async(req,res)=>{
    try{
        const proId = req.params.id;
        const updProject = req.body;

        const updatedProject = await projectModel.findByIdAndUpdate(proId, updProject, {new:true});
        if(!updatedProject){
            res.status(404).json({message:'project not found'})
        }
        res.status(201).json(updatedProject);
        console.log('Project updated successfully');
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
}




