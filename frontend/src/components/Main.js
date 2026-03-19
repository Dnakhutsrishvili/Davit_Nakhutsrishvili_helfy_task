import { useState ,useEffect} from 'react'
import TaskPopup from './TaskPopup';
import TaskRender from './TaskRender';

const options=['All','Complated','Pending']

function Main() {
   const [tasks,setTasks] = useState([]);
   const [filteredTasks, setFilteredTasks] = useState([]);
   const [selectedValue,setSelectedValue]= useState('');
   const [popupOpen, setPopupOpen] = useState(false);
   const [mode, setMode] = useState('create');
   const [selectedTask,setSelectedTask]=useState(null);

useEffect(() => {
    fetchTasks()
  }, []);
const fetchTasks=async()=>{
    try {
     const response=await fetch("http://localhost:4000/api/tasks");
     if(!response.ok) throw new Error('failed fetch tasks')
     const data= await response.json()
     setTasks(data.tasks || []);
     setFilteredTasks(data.tasks || []);
    } catch (error) {
    console.error(error);
    }
}

const handleSaveTask=async(task)=>{
try {
    const url=mode==='create'
        ? 'http://localhost:4000/api/tasks'
        : `http://localhost:4000/api/tasks/${selectedTask.id}`;
    const method=mode==='create'?'POST':'PUT';

    const response=await fetch(url,{
        method,
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(task)
    })
    
    if(!response.ok) throw new Error('failed to save task')
    await fetchTasks()
} catch (error) {
    console.log(error)
}
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const handleChange=(e)=>{
        if(e.target.value==='Complated'){
        setSelectedValue(true)
        }
        if(e.target.value==='Pending'){
        setSelectedValue(false)
        }
        if(e.target.value==='All'){
        setSelectedValue(null)
        }
    }

  const handleAddTask = () => {
    setMode('create');
    setSelectedTask(null);
    setPopupOpen(true);
  };
  const handleViewTask = (task) => {
    setMode('view');
    setSelectedTask(task);
    setPopupOpen(true);
  };

  const handleToggle=async(taskId)=>{
    try {
        const response=await fetch(`http://localhost:4000/api/tasks/${taskId}/toggle`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
        })
    
    if (!response.ok) throw new Error('Failed to toggle task')
    await fetchTasks();

    } catch (error) {
    console.error(error);
    }
  }
  const getSelectedTask=(task)=>{
    setMode('edit');
    setSelectedTask(task)
    setPopupOpen(true);
  }
  const handleDelete=async(taskId)=>{
 try {
     const response=await fetch(`http://localhost:4000/api/tasks/${taskId}`,{
            method:'DELETE',
            headers:{'Content-Type': 'application/json'},
        })
    
    if (!response.ok) throw new Error('Failed to delete task')
    await fetchTasks();

    } catch (error) {
    console.error(error);
    }
  }
  const handleFilter = () => {
  if (selectedValue === null) {
    setFilteredTasks(tasks);
  } else {
    setFilteredTasks(
      tasks.filter((task) => task.completed === selectedValue)
    );
  }
}
  return (
    <main>
     <button onClick={handleAddTask}>
       + add new task
     </button>
     <div className='filter'>
<form onSubmit={handleSubmit}>
<label htmlFor='select-option'>choose option</label>
<select id='select-option' onChange={handleChange}>
    <option value=''>choose option</option>
    {options.map((opt)=>(
<option key={opt} value={opt}>
    {opt}
</option>
    ) )}
</select>
<button onClick={handleFilter} type='submit'>filter</button>
        </form>
<TaskRender 
tasks={filteredTasks}
onToggleChange={handleToggle}
getSelectedTask={getSelectedTask}
getId={handleDelete}
handleViewTask={handleViewTask}
        />
     </div>
<TaskPopup
 isOpen={popupOpen}
 mode={mode}
 task={selectedTask}
 onClose={()=>setPopupOpen(false)}
 onSave={handleSaveTask}
/>
    </main>
  )
}

export default Main