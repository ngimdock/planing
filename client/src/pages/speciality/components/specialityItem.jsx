import React, { useContext, useState } from 'react'
import styles from "../css/specialityStyle.module.css"
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { Box } from '@mui/material'
import SpecialityAPI from '../../../api/speciality'
import SpecialityContext from '../../../datamanager/contexts/specialityContext'
import ToastContext from '../../../datamanager/contexts/toastContext'


const LevelItem = ({ name, id ,color}) => {

  // Get global state
  const { removeSpeciality } = useContext(SpecialityContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [error, setError] = useState("")

  const handleDeleteSpeciality = async (id) => {    
      const { data, error: err } = await SpecialityAPI.deleteSpeciality(id)
      if(data) {
        removeSpeciality(data.data)
        showToast("Speciality deleted", "success")
      } else {
        setError(err)
        console.log(error)
        showToast("Could not delete the speciality", "error")
      }
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
              onClick={()=>alert("update")}
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