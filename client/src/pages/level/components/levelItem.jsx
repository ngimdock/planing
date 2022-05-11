import React from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/levelStyle.module.css"
import LevelAPI from '../../../api/level/index';

const LevelItem = ({ id, name ,color}) => {

   //delet a level
  const handleDeleteClass = async ()=>{

    const { data, error } = await LevelAPI.delete(id)
    console.log(data)
    if(error){
        console.log(error)
  }
}

   
    return (
        <div className={styles.levelItem}
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
                  onClick={ handleDeleteClass }
                />
              </div>
        </div>
  )
}

export default LevelItem;