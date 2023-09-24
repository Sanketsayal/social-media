import React from 'react'
import {GrChatOption} from 'react-icons/gr'

import styles from '../styles/navbar.module.css'

function Navbar() {
  return (
    <div className={styles.navbar}>
        <GrChatOption />
        Social
    </div>
  )
}

export default Navbar