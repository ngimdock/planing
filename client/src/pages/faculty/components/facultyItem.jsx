import React from 'react'
import styles from "../css/facultyStyle.module.css"

const FacultyItem = ({ name ,color}) => {
   
    return (
        <div className={styles.facultyItem}
            style={{
            backgroundColor: color
          }}  >
              <span> { name }  </span>
        </div>
  )
}

export default FacultyItem;