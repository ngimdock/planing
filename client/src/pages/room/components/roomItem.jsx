import React, { useContext } from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/roomStyle.module.css"
import { MdOutlineFileUpload } from 'react-icons/md'
import {Box} from '@mui/material';
import { ExportContext } from '../../../datamanager/contexts/exportContext'
import ExportBaseLayout from '../../exports/base'

const RoomItem = ({ title, value, color }) => {
  // Get global state
  const { exportRef, handlePrintByRoom } = useContext(ExportContext)

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
                />
                < RiDeleteBin6Line
                  size="18"
                  color="#ff0000"
                />
            </div>
        </div>
  )
}

export default RoomItem;