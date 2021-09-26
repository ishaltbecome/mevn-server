const router = require('express').Router();

const TaskController = require('../controllers/TaskController.js');

router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getOneTask);
router.post('/create', TaskController.createTask);
router.delete('/delete/:id', TaskController.deleteTask);
router.patch('/update/:id', TaskController.updateteTask);

module.exports = router;
