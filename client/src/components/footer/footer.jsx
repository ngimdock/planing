import React from "react"
import styles from './css/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <span className={styles.footerText}>
        <span className={styles.footerTextLogo}>Course Programs</span> &copy; Copyright 2022
      </span>
    </footer>
  )
}

export default Footer