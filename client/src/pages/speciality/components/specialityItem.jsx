import React from 'react'
import styles from "../css/specialityStyle.module.css"
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const LevelItem = ({ name ,color}) => {
   
    return (
        <div className={styles.specialityItem}
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

export default LevelItem;