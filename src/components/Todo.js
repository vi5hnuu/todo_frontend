import React from 'react'
import styles from './Todo.module.css'
import timegif from './../assets/icons8-time.gif'
import calgif from './../assets/icons8-calendar.gif'
import { format } from 'date-fns'
import { updateToDoStatus, deleteTodo } from '../store/todo_slice'
import { useDispatch } from 'react-redux'

function Todo({ id, title, isCompleted, dateTime }) {
  const dispatch = useDispatch()
  const dt = new Date(dateTime)
  const taskDate = format(dt, 'yyyy-MM-dd')
  const taskTIme = format(dt, 'hh:mm')

  function onTaskStatusChangeHandler(evnt) {
    const status = evnt.target.checked
    dispatch(updateToDoStatus({ status, id }))
  }
  function onTaskDeleteHandler() {
    dispatch(deleteTodo({ id }))
  }
  return <li className={styles['todo']}>
    <div className={styles['todo__head']}>
      <input onChange={onTaskStatusChangeHandler} type="checkbox" checked={isCompleted} />
      <h3>{title}</h3>
    </div>
    <div className={styles['todo__info']}>
      <div className={styles['info']}>
        <img src={timegif} alt='time' />
        <span>{taskTIme}</span>
      </div>
      <div className={styles['info']}>
        <img src={calgif} alt='date' />
        <span>{taskDate}</span>
      </div>
    </div>
    <button onClick={onTaskDeleteHandler} className={styles['btn--remove']}>X</button>
  </li>
}

export default Todo