const { createProject, allProjects, updateProject } = require('../controllers/projectController');
const { signUp, login, getUsers } = require('../controllers/userController');
const { jwtAuthMidddleware } = require('../jwt');

const router = require('express').Router();

// users
router.post('/signUp', signUp);
router.post('/login',login);
router.get('/allUsers', jwtAuthMidddleware ,getUsers)


// project
router.post('/createPro' ,createProject);
router.get('/allProjects',jwtAuthMidddleware ,allProjects);
router.put('/updateProject/:id' ,  updateProject)



module.exports = router;



