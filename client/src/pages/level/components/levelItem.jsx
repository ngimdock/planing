import React,{useContext} from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/levelStyle.module.css"
import LevelAPI from '../../../api/level/index';
import LevelContext from "../../../datamanager/contexts/levelContext"
import ToastContext from '../../../datamanager/contexts/toastContext'
import ModalContext from '../../../datamanager/contexts/modalContext'

const LevelItem = ({ id, name ,color}) => {

  //get global state
  const { removeLevel, setLevel } = useContext(LevelContext)
  const { showToast } = useContext(ToastContext)
  const { openModal } = useContext(ModalContext)

  //delet a level
  const handleDeleteClass = async ()=>{

    const { data, error } = await LevelAPI.delete(id)
    console.log(data)
    if (data) {
      removeLevel(id)
      showToast("niveau supprimé", "success")
    } else {
      console.log(error)
      showToast("niveau non supprimé", "error")
    }
  }
  //update a level
  const handleUpdateLevel = (id, name) => {
    setLevel({id, name})
    openModal('Modifier Niveau', 'UPDATE_LEVEL')
  }  

  return (
    <div className={styles.levelItem}
      style={{
      backgroundColor: color
      }} 
    >
      <span> { name }  </span>
      <div className={styles.levelIcon}>
        <FiEdit2
          onClick={() => handleUpdateLevel(id, name) }
          ize="18"
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