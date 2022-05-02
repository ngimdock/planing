import React from 'react'
import styles from './css/loading.module.css'

// Logo
const logoImg = require("../../assets/images/logo/logo1.png")

const LoadingPage = () => {
  return (
    <section className={styles.container}>
      <img 
        src={logoImg}
        alt="logo"
        className={styles.logo}
      />
    </section>
  )
}

export default LoadingPage