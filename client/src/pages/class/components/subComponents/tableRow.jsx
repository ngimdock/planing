import { Fragment, useContext } from "react"
import styles from '../../css/classStyle.module.css'
import { Box, Typography } from "@mui/material"
import { FaPen } from 'react-icons/fa'
import { BsTrashFill } from 'react-icons/bs'
import ModalContext from "../../../../datamanager/contexts/modalContext"
import ClassAPI from '../../../../api/class';

const TableRow = ({ color, number, data }) => {
    // Defaults values
    const defaultColor = color ? color:"#fff"

    // Get global state
    const { openModal } = useContext(ModalContext)

    //suppression de classe
    const handleDeleteClass = async ()=>{
        const {data:datadel, error} = await ClassAPI.delete(data.getCode)
        console.log(datadel)
        if(error){
            console.log(error)
        }
    }

    return (
        <Fragment>
        <tr className={styles.tableRow}>
            <td className={styles.tableCell} style={{ backgroundColor: defaultColor }}>
                <Box
                    sx={{
                        minHeight: 50,
                        height: "auto",
                        display: "flex",
                        placeContent: "center",
                        placeItems: "center"
                    }}>

                        <Typography
                            sx={{
                                fontSize: 18,
                                fontFamily: "Nunito-Bold"
                            }}
                        >
                            { number }
                        </Typography>

                </Box>
            </td>
            
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                {data.getCode}
            </td>  
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                {data.getFaculty.getName}
            </td>  
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                {data.getLevel.getName}
            </td>  
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                {data.getCapacity}
            </td>  
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                {data.getSpecialities ? data.getSpecialities.length : 0}
            </td>  
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                {"1"}
            </td>  
            <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
                <Box
                    sx={{
                        width: "50%",
                        margin: "auto",
                        height: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        "&:hover" : {
                            cursor: 'pointer'
                        }
                }}>
                    <Box
                        sx={{
                            "&:hover" : {
                                cursor: 'pointer'
                            }
                        }}>

                        <FaPen 
                            color="grey"
                            size={20}
                            onClick={() => openModal("Mise a jour classe", "ADD_CLASS")}
                        />
                    </Box>
                    <Box
                        sx={{
                            "&:hover" : {
                                cursor: 'pointer'
                            }
                        }}>

                        <BsTrashFill 
                            color="red"
                            size={20}
                            onClick={ handleDeleteClass}
                        />
                    </Box>
                </Box>   
            </td>  
        </tr>
        </Fragment>
    )
}

export default TableRow