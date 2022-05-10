import React, { useContext, useState } from 'react'
import styles from "../css/specialityStyle.module.css"
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { Box } from '@mui/material'
import SpecialityAPI from '../../../api/speciality'
import SpecialityContext from '../../../datamanager/contexts/specialityContext'
import ToastContext from '../../../datamanager/contexts/toastContext'
import ModalContext from '../../../datamanager/contexts/modalContext'


const LevelItem = ({ name, id ,color}) => {

  // Get global state
  const { removeSpeciality, setSpeciality } = useContext(SpecialityContext)
  const { showToast } = useContext(ToastContext)
  const { openModal } = useContext(ModalContext)

  // Set local state
  const [error, setError] = useState("")

  const handleDeleteSpeciality = async (id) => {    
      const { data, error: err } = await SpecialityAPI.deleteSpeciality(id)
      if(data) {
        removeSpeciality(data.data)
        showToast("Spécialité supprimé", "success")
      } else {
        setError(err)
        console.log(error)
        showToast("Spécialité non supprimé", "error")
      }
    }

  const handleUpdateSpeciality = async (id, name) => {
    setSpeciality({id, name})
    openModal('Modifier Specialité', 'UPDATE_SPECIALITY')
  }  
   
    return (
        <div className={styles.specialityItem}
          style={{
            backgroundColor: color
          }}
        >
          <span> { name }  </span>
          <div className={styles.levelIcon}>
            <Box
              onClick={()=>handleUpdateSpeciality(id, name)}
            >
              <FiEdit2
                size="18"
                color="#3b3e41"
              />
            </Box>
            <Box
              onClick={()=>handleDeleteSpeciality(id)}
            >
              <RiDeleteBin6Line
                size="18"
                color="#ff0000"
              />
            </Box>
          </div>
        </div>
  )
}

export default LevelItem;