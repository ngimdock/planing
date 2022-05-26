import React from 'react'
import ExportHeader from './components/subComponents/exportHeader'
import ExportFooter from './components/subComponents/exportFooter'
import styles from './css/exports.module.css'
import TableContainer from './components/tableContainer'

const programs =  [
  {
    semestre: "1",
    anneeAcademique: "2021-2022",
    target: "INF-L1"
  },
  {
    semestre: "2",
    anneeAcademique: "2021-2022",
    target: "INF-L1"
  },
  {
    semestre: "1",
    anneeAcademique: "2021-2022",
    target: "INF-L2"
  },
  {
    semestre: "2",
    anneeAcademique: "2021-2022",
    target: "INF-L2"
  },
  {
    semestre: "1",
    anneeAcademique: "2021-2022",
    target: "INF-L3"
  },
  {
    semestre: "2",
    anneeAcademique: "2021-2022",
    target: "INF-L3"
  }
]

const ExportBaseLayout = React.forwardRef((props, ref) => {

  return (
    <div ref={ ref } className={styles.wrapper}
    >
      <ExportHeader />
        {programs.map(program => (
          <TableContainer program={program} />
        ))}
      <ExportFooter />
    </div>
  )
})

export default ExportBaseLayout