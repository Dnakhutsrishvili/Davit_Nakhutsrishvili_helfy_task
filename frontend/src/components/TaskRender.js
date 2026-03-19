// const task={
// id: number,
// title: string,
// description: string,
// completed: boolean,
// createdAt: Date,
// priority: 'low' | 'medium' | 'high'

import Checkbox from "./Checkbox"

function TaskRender({tasks ,onToggleChange}) {
    const handleToggle=(taskId)=>{
        onToggleChange(taskId)
    }
  return (
    <ul>
{tasks.map(task=>(
    <li key={task.id}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>{task.priority}</p>
        <Checkbox label={'done'} value={task.completed} onChange={()=>handleToggle(task.id)}/>
    </li>
)
)}
    </ul>
  )
}

export default TaskRender