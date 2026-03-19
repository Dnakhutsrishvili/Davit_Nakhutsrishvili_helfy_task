import {  useRef ,useState,useEffect} from "react"
import Checkbox from "./Checkbox"
import styles from './taskRender.module.css'

function TaskRender({tasks ,onToggleChange,getSelectedTask,getId}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemWidth = 300 
    let carouselRef=useRef(null)
    const handleToggle=(taskId)=>{
        onToggleChange(taskId)
    }
    const handleSelectedTask=(task)=>{
        getSelectedTask(task)
    }
    const handleDelete=(taskId)=>{
        getId(taskId)
    }
    
// useEffect(() => {
//   const interval = setInterval(() => {
//     handleRightClick();
//   }, 2000);

//   return () => clearInterval(interval);
// });

 function handleRightClick() {
    let newIndex = currentIndex + 1
  if(newIndex >= tasks.length) {
        newIndex = 0
    }
    setCurrentIndex(newIndex)
    carouselRef.current.scrollLeft = newIndex * itemWidth;
  }

function handleLeftClick() {
    let newIndex = currentIndex - 1
  if(newIndex < 0) {
        newIndex = tasks.length - 1
    }
    setCurrentIndex(newIndex)
    carouselRef.current.scrollLeft = newIndex * itemWidth;
  }

  return (
    <>
    <div className={styles.carousel} ref={carouselRef}>
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
    </div>
    <div>
    <button className="leftBtn" onClick={handleLeftClick}>
        left
    </button>
    <button className="rightBtn" onClick={handleRightClick}>
        right
    </button>
    </div>
    </>
  )
}

export default TaskRender