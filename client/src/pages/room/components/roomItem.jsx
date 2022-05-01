import React from 'react'
import styles from "../css/roomStyle.module.css"

const RoomItem = ({ title, value, color }) => {
   
    return (
        <div className={styles.roomItem}
            style={{
            backgroundColor: color
          }}  >
            <span className={styles.Description}> { title } </span>
            <span className={styles.number}> { value } </span>
        </div>
  )
}

export default RoomItem;