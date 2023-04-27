import styles from './Register.module.css'
import sideimage from './../assets/login_ills2.jpg'
import Signup from './../components/Signup'

export default function Register() {
  return <div className={styles['container']}>
    <Signup />
    <div className='image_box'>
      <img src={sideimage} alt='todo illustration' />
    </div>
  </div>
}
