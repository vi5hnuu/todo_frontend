import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import TodoList from '../components/TodoList'
import BackDrop from './../components/BackDrop'
import AddTask from './../components/AddTask'
import leetcodeimg from './../assets/social/leetcode.png'
import gfgimg from './../assets/social/gfg.png'
import instaimg from './../assets/social/instagram.png'
import linkedinimg from './../assets/social/linkedin.png'
import githubimg from './../assets/social/github.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './../store/authSlice'

export default function Home() {
  const navigate = useNavigate()
  const authstate = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    if (!authstate.isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [navigate, authstate.isAuthenticated])

  function toggleShowModal(evnt) {
    evnt.preventDefault()
    setShowAddModal((pstate) => !pstate)
  }

  function logOutHandler() {
    dispatch(logoutUser())
  }

  return <React.Fragment>
    {showAddModal && [<BackDrop />, <AddTask onCancel={toggleShowModal} />]}
    <main className={styles['home']}>
      <header className={styles['header']}>
        <h1>ToDo</h1>
        <nav>
          <button onClick={toggleShowModal} className={styles['nav_btn']} >Add</button>
          <button onClick={logOutHandler} className={styles['nav_link']}>Log-Out</button>
        </nav>
      </header>
      <TodoList />
      <footer className={styles['footer']}>
        <h3>Todo</h3>
        <div className={styles['social-container']}>
          <a href='https://www.instagram.com/kvi5hnu/'><img src={instaimg} alt="instagram" /></a>
          <a href='https://www.linkedin.com/in/vi5hnukumar/'><img src={linkedinimg} alt="linkedin" /></a>
          <a href='https://github.com/vi5hnuu'><img src={githubimg} alt="github" /></a>
          <a href='https://leetcode.com/Vi5hnukumar/'><img src={leetcodeimg} alt="leetcode" /></a>
          <a href='https://auth.geeksforgeeks.org/user/vi5hnu/practice'><img src={gfgimg} alt="geeksforgeeks" /></a>
        </div>
      </footer>
    </main>
  </React.Fragment>
}
