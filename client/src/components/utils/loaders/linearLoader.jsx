import { LinearProgress } from '@mui/material'
import React from 'react'
import styles from './css/loader.module.css'

const LinearLoader = () => {
  return (
    <div className={styles.loadingContainer}>
      {/* <span className={styles.loadingContent} /> */}

      <LinearProgress />
    </div>
  )
}

export default LinearLoader