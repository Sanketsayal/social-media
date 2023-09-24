import React from 'react'

import styles from '../styles/home.module.css'
import Aside from '../components/Aside'
import Posts from '../components/Posts'

function Home() {

  return (
    <div className={styles.home}>
      <Aside />
      <Posts />
    </div>
  )
}

export default Home