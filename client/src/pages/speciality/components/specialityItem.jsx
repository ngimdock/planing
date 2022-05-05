import React from 'react'
import styles from "../css/specialityStyle.module.css"

const LevelItem = ({ name ,color}) => {
   
    return (
        <div className={styles.specialityItem}
            style={{
            backgroundColor: color
          }}  >
              <span> { name }  </span>
        </div>
  )
}

export default LevelItem;