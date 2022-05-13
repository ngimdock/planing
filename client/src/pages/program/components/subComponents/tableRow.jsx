import { Fragment, useContext } from "react"
import styles from '../../css/program.module.css'
import TableCellHour from "./tableCellHour"
import TableCellContent from './tableCell'
import PlanningContext from "../../../../datamanager/contexts/planningContext"

const TableRow = ({ color, time }) => {
  // Defaults values
  const defaultColor = color ? color:"#fff"

  // Get data from the global state
  const { currentClass: myClass } = useContext(PlanningContext)

  return (
    <Fragment>
      <tr className={styles.tableRow}>
        <td className={styles.tableCell} style={{ backgroundColor: defaultColor }}>
          <TableCellHour time={time} />
        </td>
        {
          myClass && Object.values(myClass.programs).map((program, index) => {
            return ( 
              <td className={styles.tableCell} style={{ backgroundColor: defaultColor }}>
                <TableCellContent key={index} data={{ program, time }} />
              </td>
            )
          })
        }
      </tr>
    </Fragment>
  )
}

export default TableRow