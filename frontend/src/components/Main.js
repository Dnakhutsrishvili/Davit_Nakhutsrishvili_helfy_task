import { useState ,useEffect} from 'react'
import TaskPopup from './TaskPopup';

const options=['All','Complated','Pending']

function Main() {
   const [tasks,setTasks] = useState([]);
   const [selectedValue,setSelectedValue]= useState('');
   const [popupOpen, setPopupOpen] = useState(false);
   const [mode, setMode] = useState('create');
   const [selectedTask,setSelectedTask]=useState(null);
   const [formdata,setFormdata]= useState({
        title:'',
        description:'',
        priority:'high',
    });


useEffect(() => {
    fetch("http://localhost:4000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);
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
    
} catch (error) {
    console.log(error)
}
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const handleChange=(e)=>{
        setSelectedValue(e.target.value)
    }

  const handleAddTask = () => {
    setMode('create');
    setSelectedTask(null);
    setPopupOpen(true);
  };
  return (
    <main>
     <button onClick={handleAddTask}>
       + add new task
     </button>
     <div className='filter'>
<form onSubmit={handleSubmit}>
<label htmlFor='select-option'>choose option</label>
<select id='select-option' value={selectedValue} onChange={handleChange}>
    <option value=''>choose option</option>
    {options.map((opt)=>(
<option key={opt} value={opt}>
    {opt}
</option>
    ) )}
</select>
<button type='submit'>filter</button>
        </form>
     </div>
<TaskPopup
 isOpen={popupOpen}
 mode={mode}
 taskData={formdata}
 onClose={()=>setPopupOpen(false)}
 onSave={handleSaveTask}
/>
    </main>
  )
}

export default Main