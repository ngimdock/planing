import React from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/facultyStyle.module.css"

const FacultyItem = ({ name ,color}) => {
   
    return (
        <div className={styles.facultyItem}
            style={{
            backgroundColor: color
          }}  >
              <span> { name }  </span>
              <div className={styles.levelIcon}>
                <FiEdit2
                  size="18"
                  color="#3b3e41"
                />
                < RiDeleteBin6Line
                  size="18"
                  color="#ff0000"
                
                />
              </div>
        </div>
  )
}

export default FacultyItem;