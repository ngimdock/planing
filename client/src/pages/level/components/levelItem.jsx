import React from 'react'
import styles from "../css/levelStyle.module.css"

const LevelItem = ({ name ,color}) => {
   
    return (
        <div className={styles.levelItem}
            style={{
            backgroundColor: color
          }}  >
              <span> { name }  </span>
        </div>
  )
}

export default LevelItem;