import React, { useContext } from 'react'
import ExportHeader from './components/subComponents/exportHeader'
import ExportFooter from './components/subComponents/exportFooter'
import styles from './css/exports.module.css'
import TableContainer from './components/tableContainer'
import { ExportContext } from '../../datamanager/contexts/exportContext'
import FacultyPage from './components/subComponents/facultyPage'

const ExportBaseLayout = React.forwardRef((props, ref) => {
  // get program global state
  const { programs } = useContext(ExportContext)

  return (
    <div ref={ref} className={styles.wrapper}
    >
      <ExportHeader semestre={programs.semester} anneeAcademique={programs.academicYear} code={programs.facultyName || programs.code} />
      { programs.code ? (
          <TableContainer programs={programs} semestre={programs.semester} anneeAcademique={programs.academicYear}/> 
        ) : programs.prevResult ? (
              programs.prevResult.map(faculty => (
                <div>
                  <FacultyPage name={faculty.facultyName} />
                  {faculty.classes.map(program => (
                    <TableContainer programs={program} semestre={programs.semester} anneeAcademique={programs.academicYear}/>
                  ))}
                </div>
              ))
            ):(
              programs.classes && programs.classes.map(program => (
                <TableContainer programs={program} semestre={programs.semester} anneeAcademique={programs.academicYear}/>
              ))
            )
      }
      <ExportFooter semestre={programs.semester} anneeAcademique={programs.academicYear} />
    </div>
  )
})

export default ExportBaseLayout