import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs'
import ModalContext from "../../../datamanager/contexts/modalContext"

const TeacherItem = ({ matricule, sexe, name, color }) => {
  const { openModal } = useContext(ModalContext)
  return (

    <Box
        sx ={{
          width: "200px",
          display: "flex",
          marginLeft: "5px",
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
                    width: 60,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            "&:hover" : {
                                cursor: "pointer"
                            }
                        }}
                        onClick={() => openModal('Modifier Enseignant', 'ADD_TEACHER')}
                    >
                        <BsPencilFill 
                            size={22}
                            color="#fff"
                        />
                    </Box>

                    <Box
                        sx={{
                            "&:hover" : {
                                cursor: "pointer"
                            }
                        }}
                    >
                        <BsFillTrashFill 
                            size={22}
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