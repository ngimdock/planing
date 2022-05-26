import React, { useContext, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs'
import ModalContext from "../../../datamanager/contexts/modalContext"
import TeacherAPI from '../../../api/teacher'
import ToastContext from '../../../datamanager/contexts/toastContext'
import TeacherContext from '../../../datamanager/contexts/teacherContext'
import { MdOutlineFileUpload } from 'react-icons/md'
import { ExportContext } from '../../../datamanager/contexts/exportContext'
import ExportBaseLayout from '../../exports/base'

const TeacherItem = ({ matricule, sexe, name, color }) => {
  //  get global state
  const { openModal } = useContext(ModalContext)
  const { showToast } = useContext(ToastContext)
  const { removeTeacher, setTeacher } = useContext(TeacherContext)
  const { exportRef , handlePrintByTeacher } = useContext(ExportContext)

  // set local state
  const [error, setError] = useState("")

  const handleDeleteTeacher = async (matricule) => {
    const { data, error: err } = await TeacherAPI.deleteTeacher(matricule)
    if(data) {
        removeTeacher(data)
        showToast("Enseignant supprimé","success")
    } else {
        setError(err)
        console.log(error)
        showToast("Enseignant non Supprimé", "error")
    }
  }

  const handleUpdateTeacher = async (data) => {
    setTeacher({matricule : data.matricule, name: data.name, sexe: data.sexe})
    openModal('Modifier Enseignant', 'UPDATE_TEACHER')
  }
    
  return (

    <Box
        sx ={{
          width: "200px",
          display: "flex",
          marginLeft: "5px",
          marginBottom: "20px",
          flexDirection: "column",
          borderRadius: "10px 10px 0 0"
        }}
    >
        <Box
            sx={{
                width: "auto",
                p: 1,
                backgroundColor: `${color}`,
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px 10px 0 0"
            }}
        >
            <Box
            sx={{
                width: "auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontFamily: "Nunito-Bold",
                            color: "#fff"
                        }}
                        >{matricule}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontFamily: "Nunito-Bold",
                            color: "#f8f8f8"
                        }}
                        >{sexe}
                    </Typography> 
                </Box>
            

                <Box
                    sx={{
                    width: 80,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                    }}
                >
                    <Box 
                        sx={{
                            "&:hover": {
                                cursor: 'pointer'
                            }
                        }}
                        onClick={handlePrintByTeacher}
                    >
                        <div style={{ display: "none" }}><ExportBaseLayout ref={exportRef} /></div>
                        <MdOutlineFileUpload 
                        color="#f8f8f8"
                        size={28}
                        />
                    </Box>

                    <Box
                        sx={{
                            "&:hover" : {
                                cursor: "pointer"
                            }
                        }}
                        onClick={() => handleUpdateTeacher({ matricule, name, sexe })}
                    >
                        <BsPencilFill 
                            size={20}
                            color="#fff"
                        />
                    </Box>

                    <Box
                        sx={{
                            "&:hover" : {
                                cursor: "pointer"
                            }
                        }}
                        onClick={() => handleDeleteTeacher(matricule)}
                    >
                        <BsFillTrashFill 
                            size={20}
                            color="#fff"
                        />
                    </Box>

                </Box>

            </Box>

        </Box>
        
        <Box
            sx={{
                width: "auto",
                p: 1.5,
                textAlign: "center",
                border: "1px solid #e0dddd",
                borderRadius: "0 0 10px 10px"
            }}
        >
            <Typography
            sx={{
                fontSize: 20,
                fontFamily: "Nunito-Bold",
                color: "#000"
            }}
            >{name}</Typography>
        </Box>
    </Box>
  )
}

export default TeacherItem