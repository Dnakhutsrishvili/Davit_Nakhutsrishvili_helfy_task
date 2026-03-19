import express from 'express';

const router = express.Router();
const tasks=[{
id: 1,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 2,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 3,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 4,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 5,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 6,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 7,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
{
id: 8,
title: 'complate task',
description: 'in 4 hours',
completed: false,
createdAt: new Date(),
priority: 'high'
},
];

router.get('/', (req,res) => {
  res.status(200).json({tasks:tasks});
});

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

router.put('/:id', (req, res) => {
if(!req.body){
    res.status(400);
    throw new Error('provide correct task!')
}
 const taskId = parseInt(req.params.id);
 const index = tasks.findIndex(task => task.id === taskId)
const newTask = {
  id: taskId,          
  title: req.body.title|| tasks[index].title,
  description: req.body.description||tasks[index].description,
  priority:req.body.priority || tasks[index].priority,
  completed: req.body.completed||tasks[index].completed,
  createdAt: new Date()
};
if (index !== -1) {

  tasks[index]= newTask;
}
res.status(200).json({task: newTask, message: 'task updated'});
});

router.delete('/:id', (req, res) => {
 const taskId = parseInt(req.params.id);
 const index = tasks.findIndex(task => task.id === taskId)
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found!' });
  }
 const deletedTask = tasks.splice(index, 1);
 res.status(200).json({ message: 'Task deleted', task: deletedTask[0] });
});

router.patch('/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId)
if (index !== -1) {
  tasks[index].completed =!tasks[index].completed ; 
}
 res.status(200).json({message: 'task updated'});
});

export default router;