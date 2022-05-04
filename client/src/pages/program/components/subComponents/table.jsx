import { Box } from "@mui/material"
import styles from '../../css/program.module.css'
import TableHeader from "./tableHeader"
import TableRow from "./tableRow"

// Constant values
const TIMES = [
  {
    id: 1,
    start: 7,
    end: 10
  },
  {
    id: 2,
    start: 10,
    end: 13
  },
  {
    id: 3,
    start: 13,
    end: 16
  },
  {
    id: 4,
    start: 16,
    end: 18
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
            TIMES.map(item => <TableRow time={item} color={item.id % 2 === 0 && "#f8f8f8"} />)
          }
        </tbody>
      </table>
    </Box>
  )
}

export default Table