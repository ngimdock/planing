import { Fragment } from "react"
import styles from '../../css/program.module.css'
import TableCellHour from "./tableCellHour"
import TableCellContent from './tableCell'

const TableRow = ({ color }) => {
  // Defaults values
  const defaultColor = color ? color:"#fff"
  return (
    <Fragment>
      <tr className={styles.tableRow}>
        <td className={styles.tableCell} style={{ backgroundColor: defaultColor }}>
          <TableCellHour />
        </td>
        {
          Array(7).fill(0).map(() => {
            return ( 
              <td className={styles.tableCell} style={{ backgroundColor: defaultColor }}>
                <TableCellContent />
              </td>
            )
          })
        }
      </tr>
    </Fragment>
  )
}

export default TableRow