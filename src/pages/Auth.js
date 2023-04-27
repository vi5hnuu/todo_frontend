import React from 'react'
import Login from '../components/Login'
import styles from './Auth.module.css'
import sideimage from './../assets/login_ills2.jpg'

export default function Auth() {
  return <div className={styles['container']}>
    <Login />
    <div className='image_box'>
      <img src={sideimage} alt='todo illustration' />
    </div>
  </div>
}
