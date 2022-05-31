import React, {useEffect} from 'react'
import styles from './subComponents/css/exportFooter.module.css'
import exportBaseStyle from '../css/exports.module.css'
import TableHeader from './tableHeader'
import TableItem from './tableItem'

const TableContainer = ({ programs }) => {

  var program;
  if(programs.programs || programs.CodeRoom || programs.NameTeacher) {
    program = { 
      programs: programs.programs, 
      code: programs.code ? 
        programs.code : programs.CodeRoom ? 
          programs.CodeRoom : programs.NameTeacher ? 
            programs.NameTeacher : null
    }
  } else if(programs.classes) {
    program = { programs: programs.classes[0].programs, code: programs.facultyName}
  } else {
    return
  }

  return (
    <div className={exportBaseStyle.divisor}>
        <TableHeader semestre={programs.semester} anneeAcademique={programs.academicYear} />
        <b>
            <h3 className={styles.fac_level}>{program.code}</h3>
        </b>
        <TableItem program={program.programs} />
    </div>

  )
}

export default TableContainer