import { Box } from "@mui/material"
import styles from '../../css/program.module.css'
import TableHeader from "./tableHeader"
import TableRow from "./tableRow"

const Table = () => {
  return (
    <Box
      sx={{
        minWidth: "1000px",
        minHeight: 400,
        backgroundColor: "#fff",
      }}  
    >
      <table className={styles.tableContainer}>
        <TableHeader />

        <tbody>
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    </Box>
  )
}

export default Table