import { LinearProgress } from '@mui/material'
import React from 'react'
import styles from './css/loader.module.css'

const LinearLoader = ({ rounded }) => {
  // Default value
  const defaultRounded = rounded !== undefined ? rounded : true

  return (
    <div
      className={styles.loadingContainer}
      style={{
        borderBottomLeftRadius: defaultRounded && 10,
        borderBottomRightRadius: defaultRounded && 10
      }}
    >
      <LinearProgress />
    </div>
  )
}

export default LinearLoader