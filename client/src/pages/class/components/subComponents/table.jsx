import { Box } from "@mui/material"
import styles from '../../css/classStyle.module.css'
import TableHeader from "./tableHeader"
import TableRow from "./tableRow"
// Constant values
const No = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  }
]

const Table = () => {
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
            No.map(item => <TableRow number={item} color={item.id % 2 === 0 && "#f8f8f8"} />)
          }
        </tbody>
      </table>
    </Box>
  )
}

export default Table