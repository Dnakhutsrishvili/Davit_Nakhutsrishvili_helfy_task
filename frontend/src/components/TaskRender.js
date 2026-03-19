import {  useRef ,useState,useEffect} from "react"
import Checkbox from "./Checkbox"
import styles from './taskRender.module.css'

function TaskRender({tasks ,onToggleChange,getSelectedTask,getId,handleViewTask}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerView, setItemsPerView] = useState(1)
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
    
useEffect(() => {
  const handleResize = () => {
    setItemsPerView(window.innerWidth > 768 ? 3 : 1)
  }
  handleResize()
  window.addEventListener('resize', handleResize)
  
  const interval = setInterval(() => {
    handleRightClick();
  }, 6000);

  return () => {
    window.removeEventListener('resize', handleResize)
    clearInterval(interval)
  }
})

 function handleRightClick() {
  let newIndex = currentIndex + itemsPerView
  if(newIndex >= tasks.length) {
    newIndex = 0
  }
  setCurrentIndex(newIndex)
  carouselRef.current.scrollLeft = newIndex * 300;
}

function handleLeftClick() {
  let newIndex = currentIndex - itemsPerView
  if(newIndex < 0) {
    newIndex = tasks.length - itemsPerView
  }
  setCurrentIndex(newIndex)
  carouselRef.current.scrollLeft = newIndex * 300;
}
  return (
    <>
    <div className={styles.carousel} ref={carouselRef}>
    <ul>
{tasks.map(task=>(
    <li onClick={()=>handleViewTask} key={task.id}>
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