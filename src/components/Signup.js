import React, { useEffect, useRef, useState } from 'react'
import styles from './Signup.module.css'
import authImage from './../assets/login_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from './../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Signup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/home')
    }
  }, [navigate, authState.isAuthenticated])

  function registerHandler(evnt) {
    evnt.preventDefault()
    const email = emailRef.current.value
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    setLoading(true);
    dispatch(registerUser({ email, username, password }))
    setLoading(false)
  }

  return <div className={styles['login_container']}>
    <div className={styles['header_image']}>
      <img src={authImage} alt='auth illustrations' />
    </div>
    <form className={styles['login_form']}>
      <div className={styles['controls']}>
        <label htmlFor='username'>Username</label>
        <input ref={usernameRef} id='username' type='text' placeholder='vi5hnu' />
      </div>
      <div className={styles['controls']}>
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} id='email' type='email' placeholder='kumarvishnu1619@gmail.com' />
      </div>
      <div className={styles['controls']}>
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef} id='password' type='password' placeholder='***********' />
      </div>
      <div className={styles['actions']}>
        <Link className={styles['action_btn']} to='/'>Sign-In</Link>
        <button disabled={loading} onClick={registerHandler} className={styles['action_btn']} >Register</button>
      </div>
    </form>
  </div>
}
