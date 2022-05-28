import React, { useContext } from 'react'
import ExportHeader from './components/subComponents/exportHeader'
import ExportFooter from './components/subComponents/exportFooter'
import styles from './css/exports.module.css'
import TableContainer from './components/tableContainer'
import { ExportContext } from '../../datamanager/contexts/exportContext'

const ExportBaseLayout = React.forwardRef((props, ref) => {
  // get program global state
  const { programs } = useContext(ExportContext)

  return (
    <div ref={ ref } className={styles.wrapper}
    >
      <ExportHeader semestre={programs.semester} anneeAcademique={programs.academicYear} />
        {/* {programs.map(program => ( */}
          <TableContainer programs={programs} />
        {/* ))} */}
      <ExportFooter semestre={programs.semester} anneeAcademique={programs.academicYear} />
    </div>
  )
})

export default ExportBaseLayout