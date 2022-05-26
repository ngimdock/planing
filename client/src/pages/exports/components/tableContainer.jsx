import React from 'react'
import styles from './subComponents/css/exportFooter.module.css'
import exportBaseStyle from '../css/exports.module.css'
import TableHeader from './tableHeader'
import TableItem from './tableItem'

const TableContainer = ({ program }) => {
  return (
    <div className={exportBaseStyle.divisor}>
        <TableHeader semestre={program.semestre} anneeAcademique={program.anneeAcademique} />
        <b>
            <h3 className={styles.fac_level}>{program.target}</h3>
        </b>
        <TableItem />
    </div>

  )
}

export default TableContainer