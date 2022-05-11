import { useContext } from 'react'
import { Box } from "@mui/material"
import styles from '../../css/classStyle.module.css'
import TableHeader from "./tableHeader"
import TableRow from "./tableRow"
import ClassContext from '../../../../datamanager/contexts/classContext'

const Table = () => {
  // Global state
  const { classes } = useContext(ClassContext)
  return (
    <Box
      sx={{
        minWidth: "1400px",
        minHeight: 400,
        backgroundColor: "#fff",
      }}  
    >
      <table 
        className={styles.tableContainer}
        cellSpacing={1}
      >
        <TableHeader />

        <tbody>
          {
            classes.map((myClass, index) => {
              return (
                <TableRow 
                  key={myClass.getCode}
                  number={index + 1} 
                  data={myClass}
                  color={(index + 1) % 2 === 0 && "#f8f8f8"} 
                />
              )
            })
          }
        </tbody>
      </table>
    </Box>
  )
}

export default Table