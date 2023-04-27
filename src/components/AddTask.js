import React, { useRef } from 'react'
import styles from './AddTask.module.css'
import { format } from 'date-fns'
import ReactDOM from 'react-dom'
import { addTodo } from '../store/todo_slice'
import { useDispatch } from 'react-redux'

export default function AddTask({ onCancel }) {
  const dispatch = useDispatch()

  const curDate = format(new Date(), 'yyyy-MM-dd')
  const curTime = format(new Date(), 'hh:mm')

  const taskNameRef = useRef(null)
  const taskDateRef = useRef(null)
  const taskTimeRef = useRef(null)

  function onTaskAddHandler(evnt) {
    evnt.preventDefault()
    const name = taskNameRef.current.value
    const td = taskDateRef.current.value
    const tt = taskTimeRef.current.value
    const dt = new Date(`${td} ${tt}`)
    dispatch(addTodo({ name, date: dt }))
  }
  return ReactDOM.createPortal(<div className={styles['container']}>
    <form className={styles['addtask-container']}>
      <span onClick={onCancel} className={styles['close-modal']}>X</span>
      <div className={styles['controls']}>
        <label htmlFor='name'>Task</label>
        <input ref={taskNameRef} id='name' type='text' />
      </div>
      <div className={styles['task--info']}>
        <div className={styles['controls']}>
          <label htmlFor='date'>Date</label>
          <input ref={taskDateRef} min={curDate} id='date' type='date' />
        </div>
        <div className={styles['controls']}>
          <label htmlFor='time'>Time</label>
          <input ref={taskTimeRef} min={curTime} id='time' type='time' />
        </div>
      </div>
      <div className={styles['task--actions']}>
        <button onClick={onTaskAddHandler}>Add</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </form>
  </div>, document.querySelector('body'))
}
