import { useEffect, useState } from 'react'

function Main() {
 const [tasks,setTasks] = useState([]);
     useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);
  console.log(tasks)
  return (
    <div>

    </div>
  )
}

export default Main