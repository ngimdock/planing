import React, { useContext, useState } from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { Box } from '@mui/material'
import styles from "../css/facultyStyle.module.css"
import FacultyAPI from '../../../api/faculty'
import ToastContext from '../../../datamanager/contexts/toastContext'
import FacultyContext from '../../../datamanager/contexts/facultyContext'
import ModalContext from '../../../datamanager/contexts/modalContext'


const FacultyItem = ({ id, name ,color }) => {

  // get global 
    const { removeFaculty, setFaculty } = useContext(FacultyContext)
    const { showToast } = useContext(ToastContext)
    const { openModal } = useContext(ModalContext)

  // set local 
    const [error, setError] = useState("")

    const handleFacultyUpdate = async (id, name) => {
      setFaculty({ id, name })
      openModal("Modifier la filière", "UPDATE_FACULTY")
    }

    const handleFacultyDelete = async (id) => {
      const { data, error: err } = await FacultyAPI.deleteFaculty(id)
      if(data) {
        removeFaculty(data)
        showToast("Filière supprimé", "success")
      } else {
        setError(err)
        console.log(error)
        showToast("Filière non supprimé", "error")
      }
    }
   
    return (
        <div className={styles.facultyItem}
            style={{
            backgroundColor: color
          }}  >
              <span> { name }  </span>
              <div className={styles.levelIcon}>
                
              <Box
                  onClick={() => {handleFacultyUpdate(id, name)}}
                >  
                <FiEdit2
                  size="18"
                  color="#3b3e41"
                />
              </Box>  
                <Box
                  onClick={() => {handleFacultyDelete(id)}}
                >
                  < RiDeleteBin6Line
                    size="18"
                    color="#ff0000"
                 />
                </Box>
              </div>
        </div>
  )
}

export default FacultyItem;