import React, { useContext } from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/roomStyle.module.css"
import RoomContext from "../../../datamanager/contexts/roomContext"
import ToastContext from '../../../datamanager/contexts/toastContext'
import RoomAPI from '../../../api/room/index';
import ModalContext from '../../../datamanager/contexts/modalContext'

import { MdOutlineFileUpload } from 'react-icons/md'
import {Box} from '@mui/material';
import { ExportContext } from '../../../datamanager/contexts/exportContext'
import ExportBaseLayout from '../../exports/base'
  
  const RoomItem = ({ title, id, value, capacity, color }) => {
    //get global state
    const { removeRoom, setRoom} = useContext(RoomContext)
    const { showToast } = useContext(ToastContext)
    const { openModal } = useContext(ModalContext)
    const { exportRef, handlePrintByRoom } = useContext(ExportContext)

  //delet a level
  const handleDeleteRoom = async ()=>{

    const { data, error } = await RoomAPI.delete(id)
    console.log(data)
    if (data) {
      removeRoom(id)
      showToast("salle supprimé", "success")
    } else {
      console.log(error)
      showToast("salle non supprimé", "error")
    }
  }

   //update a level
   const handleUpdateRoom = (id, name, capacity) => {
    setRoom({id, name, capacity})
    openModal('Modifier Salle', 'UPDATE_ROOM')
  }  
    return (
        <div className={styles.roomItem}
            style={{
            backgroundColor: color
          }}  >
            <span className={styles.Description}> { title } </span>
            <span className={styles.number}> { value } </span>
            <div className={styles.levelIcon}>
              <Box 
                sx={{
                  display: "flex",
                  "&:hover": {
                    cursor: 'pointer'
                  }
                }}
                onClick={handlePrintByRoom}
              >

                <div style={{ display: "none" }}><ExportBaseLayout ref={exportRef} /></div>
                <MdOutlineFileUpload 
                  color="#3b3e41"
                  size={23}
                />
              </Box>
                <FiEdit2
                  size="18"
                  color="#3b3e41"
                  onClick={ () => handleUpdateRoom( id, title, capacity) }
                />
                < RiDeleteBin6Line
                  size="18"
                  color="#ff0000"
                  onClick={ handleDeleteRoom }
                />
            </div>
        </div>
  )
}

export default RoomItem;