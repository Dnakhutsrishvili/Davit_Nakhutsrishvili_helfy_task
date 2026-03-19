import Checkbox from "./Checkbox"

function TaskRender({tasks ,onToggleChange,getSelectedTask,getId}) {
    const handleToggle=(taskId)=>{
        onToggleChange(taskId)
    }
    const handleSelectedTask=(task)=>{
        getSelectedTask(task)
    }
    const handleDelete=(taskId)=>{
        getId(taskId)
    }
  return (
    <ul>
{tasks.map(task=>(
    <li key={task.id}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>{task.priority}</p>
        <Checkbox label={'done'} value={task.completed} onChange={()=>handleToggle(task.id)}/>
        <button onClick={()=>handleSelectedTask(task)}>edit</button>
        <button onClick={()=>handleDelete(task.id)}>delete</button>
    </li>
)
)}
    </ul>
  )
}

export default TaskRender