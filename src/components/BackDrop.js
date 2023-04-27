import React from 'react'
import styles from './BackDrop.module.css'
import ReactDOM from 'react-dom'

export default function BackDrop() {
  return ReactDOM.createPortal(<div className={styles['backdrop']}></div>, document.querySelector('body'))
}
