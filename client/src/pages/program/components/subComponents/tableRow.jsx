import { Fragment } from "react"
import styles from '../../css/program.module.css'
import TableCellHour from "./tableCellHour"
import TableCellContent from './tableCell'

const TableRow = () => {
  return (
    <Fragment>
      <tr className={styles.tableRow}>
        <td className={styles.tableCell}>
          <TableCellHour />
        </td>
        {
          Array(7).fill(0).map(() => {
            return (
              <td className={styles.tableCell}>
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