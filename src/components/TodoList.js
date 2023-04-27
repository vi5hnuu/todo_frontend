import React, { useEffect, useState } from 'react'
import Todo from '../components/Todo'
import styles from './TodoList.module.css'
import ReactPaginate from 'react-paginate';
import { getTodos, getPageCount } from '../store/todo_slice';
import { useDispatch, useSelector } from 'react-redux';

export default function TodoList() {
  const taskState = useSelector(state => state.task)
  const dispatch = useDispatch()
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    setTotalPages(+taskState.pages)
  }, [taskState.pages])

  useEffect(() => {
    dispatch(getPageCount())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTodos(1))
  }, [dispatch])

  function onPageChangeHandler({ selected }) {
    const pageNo = selected + 1;
    dispatch(getTodos(pageNo))
  }
  return <div className={styles['todo_container']}>
    <div className={styles['todo--actions']}>
      <div className={styles['action']}>
        <select>
          <option value='date'>Date</option>
          <option value='date'>Time</option>
          <option value='date'>Status</option>
        </select>
      </div>
      <div className={styles['action']}>
        <select>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
    </div>
    <ul className={styles['todo_list']}>
      {taskState.todos.map(todo => <Todo key={todo._id} id={todo._id} title={todo.name} isCompleted={todo.isCompleted} dateTime={todo.date} />)}
    </ul>
    <ReactPaginate
      className={styles['paginate']}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChangeHandler}
      pageRangeDisplayed={10}
      pageCount={totalPages}
      previousLabel="<"
      activeClassName={styles['active--page']}
      renderOnZeroPageCount={null}
    />
  </div>
}
