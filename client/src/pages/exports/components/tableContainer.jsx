import React from 'react'
import styles from './subComponents/css/exportFooter.module.css'
import exportBaseStyle from '../css/exports.module.css'
import TableHeader from './tableHeader'
import TableItem from './tableItem'

const TableContainer = ({ programs }) => {

  return (
    <div className={exportBaseStyle.divisor}>
        <TableHeader semestre={programs.semester} anneeAcademique={programs.academicYear} />
        <b>
            <h3 className={styles.fac_level}>{programs.code}</h3>
        </b>
        <TableItem program={programs.programs} />
    </div>

  )
}

export default TableContainer