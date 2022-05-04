import { Fragment } from "react"
import styles from '../../css/classStyle.module.css'
import { Box, Typography } from "@mui/material"
import { FaPen } from 'react-icons/fa'
import { BsTrashFill } from 'react-icons/bs'

const TableRow = ({ color, number }) => {
  // Defaults values
  const defaultColor = color ? color:"#fff"
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
                    {
                     number.id
                    }
                </Typography>

          </Box>
          
        </td>
        
        <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
            {"INFO L1"}
        </td>  
        <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
            {"Informatique"}
        </td>  
        <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
            {"Licence 1"}
        </td>  
        <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
            {"450"}
        </td>  
        <td className={styles.cellText} style={{ backgroundColor: defaultColor }}>
            {"0"}
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
                    />
                </Box>
            </Box>   
        </td>  
      </tr>
    </Fragment>
  )
}

export default TableRow