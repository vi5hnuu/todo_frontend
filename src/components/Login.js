import React, { useEffect, useRef, useState } from 'react'
import styles from './Login.module.css'
import authImage from './../assets/login_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginuser } from './../store/authSlice'
import { BeatLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
  const authState = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailRef = useRef(null)
  const passRef = useRef(null)

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/home')
    }
  }, [navigate, authState.isAuthenticated])

  function loginHandler(evnt) {
    evnt.preventDefault()
    setLoading(true)
    const email = emailRef.current.value;
    const password = passRef.current.value
    dispatch(loginuser({ email, password }))
    setLoading(false)
  }
  return <div className={styles['login_container']}>
    <div className={styles['header_image']}>
      <img src={authImage} alt='auth illustrations' />
    </div>
    <form className={styles['login_form']}>
      <div className={styles['controls']}>
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} id='email' type='email' placeholder='kumarvishnu1619@gmail.com' />
      </div>
      <div className={styles['controls']}>
        <label htmlFor='password'>Password</label>
        <input ref={passRef} id='password' type='password' placeholder='***********' />
      </div>
      <div className={styles['actions']}>
        {!loading && <button onClick={loginHandler} className={styles['action_link']}>Sign-In</button>}
        <BeatLoader loading={loading} />
        <Link className={styles['action_link']} to='/register'>Sign-Up</Link>
      </div>
    </form>
  </div>
}
