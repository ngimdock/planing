import React from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/subjetStyle.module.css"

const SubjectItem = ({ title, value, color }) => {
   
    return (
        <div className={styles.subjectItem}
            style={{
            backgroundColor: color
          }}  >
            <span className={styles.Description}> { title } </span>
            <span className={styles.number}> { value } </span>
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

export default SubjectItem;