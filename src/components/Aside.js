import React from 'react'
import { GrChatOption, } from 'react-icons/gr'
import { ImProfile } from 'react-icons/im'
import {  AiOutlineLogout } from 'react-icons/ai'
import { Link } from 'react-router-dom'


import styles from '../styles/sidebar.module.css'
import { useAuthContext } from '../context/AuthContext'

function Aside() {
  const {user,setToken,setUser}=useAuthContext()
  
  const handleLogout=()=>{
    setToken(null)
    setUser(null)
  }

  return (
    <div className={styles.sidebar}>
        <div className={styles.head}>
            <GrChatOption />
            Social
        </div>
        <div className={styles.details}>
          <div className={styles.background}>

          </div>
          <div className={styles.userDetails}>
            <img 
              src={`data:image/svg+xml;base64,${user.avatar}`}
              alt=''
            />
            <div className={styles.username}>
              {user.name}
            </div>
          </div>
            
        </div>
        <Link to='/profile'>
          <div className={styles.navOptions}>
            <ImProfile />
            <p>Profile</p>
          </div>
        </Link>
        <Link to='/' onClick={handleLogout}>
          <div className={styles.navOptions}>
            <AiOutlineLogout />
            <p>Logout</p>
          </div>
        </Link>
        
        
    </div>
  )
}

export default Aside