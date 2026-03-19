import { useState ,useEffect} from 'react'

const options=['All','Complated','Pending']

function Main() {
   const [tasks,setTasks] = useState([]);
 
   const [selectedValue,setSelectedValue]= useState('');


useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const handleChange=(e)=>{
        setSelectedValue(e.target.value)
    }
  return (
    <header>
     <button>
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
    </header>
  )
}

export default Main