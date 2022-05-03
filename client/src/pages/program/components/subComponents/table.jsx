import { Box } from "@mui/material"
import styles from '../../css/program.module.css'
import TableHeader from "./tableHeader"
import TableRow from "./tableRow"

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
          <TableRow />
          <TableRow color="#f8f8f8" />
          <TableRow />
          <TableRow color="#f8f8f8" />
        </tbody>
      </table>
    </Box>
  )
}

export default Table