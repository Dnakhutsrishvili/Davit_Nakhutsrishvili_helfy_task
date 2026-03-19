import express from 'express';

const router = express.Router();
const tasks=[];
// const task={
// id: number,
// title: string,
// description: string,
// completed: boolean,
// createdAt: Date,
// priority: 'low' | 'medium' | 'high'
// }


// GET /api/tasks - Get all tasks
router.get('/', (req, res) => {
  res.status(200).json({tasks:tasks});
});

// POST /api/tasks - Create a new task
router.post('/', (req, res) => {
if(!req.body){
    res.status(400);
    throw new Error('provide correct task!')
}
const newTask = {
  id: tasks.length+1,          
  title: req.body.title,
  description: req.body.description,
  priority: req.body.priority,
  completed: false,
  createdAt: new Date()
};
tasks.push(newTask)
 res.status(201).json({task: newTask, message: 'task created'});
});

// PUT /api/tasks/:id - Update a task


// DELETE /api/tasks/:id - Delete a task


// PATCH /api/tasks/:id/toggle - Toggle task completion status

router.patch('/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId)
if (index !== -1) {
  tasks[index].completed =!tasks[index].completed ; 
}
 res.status(200).json({message: 'task updated'});
});

export default router;