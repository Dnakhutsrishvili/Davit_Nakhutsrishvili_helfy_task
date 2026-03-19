import  { useEffect, useState } from 'react'
import styles from './taskPopup.module.css'

function TaskPopup({ mode, task, isOpen, onClose, onSave }) {
   const [formdata,setFormdata]= useState({
        title:'',
        description:'',
        priority:'high',
    });

    useEffect(()=>{
        if(mode==='edit'||mode==='view'){
            setFormdata({
        title:task?.title||'',
        description:task?.description||'',
        priority:task?.priority||'high',
            })
        }
        if(mode==='create'){
               setFormdata({
        title:'',
        description:'',
        priority:'high',
            })
        }

    },[mode,task,isOpen])

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormdata((prev)=>({
            ...prev,
             [name]: value,
        }))
    }
    const handleSave=()=>{
        onSave(formdata)
        onClose()
    }
    if(!isOpen)return null
  return (
    <div className='overlay'>
        <div className='modal'>
    <h2 className={styles.title}>{mode+' Task'}</h2>
    <div>
        <div className={styles.container}>
    <label>Title</label>
        <input
        name='title'
        type='text'
        value={formdata.title}
        onChange={handleChange}
        disabled={mode==='view'}></input>
        </div>
        <div  className={styles.container}>
    <label>Description</label>
        <input
        name='description'
        type='text'
        value={formdata.description}
        onChange={handleChange}
        disabled={mode==='view'}></input>
        </div>
          <div  className={styles.container}>
    <label>Priority</label>
        <select
        name='priority'
        value={formdata.priority}
        onChange={handleChange}
        disabled={mode==='view'}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>high</option>
        </select>
        </div>
    </div>
<div>
    <button onClick={onClose}>close</button>
    {(mode==='edit'||mode==='create')&&(
        <button onClick={handleSave}>
            {mode}
        </button>
    )}
</div>
        </div>
        
    </div>
  )
}

export default TaskPopup