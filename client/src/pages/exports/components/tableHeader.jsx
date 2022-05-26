import React from 'react'
import styles from './subComponents/css/exportFooter.module.css'

const TableHeader = ({ semestre, anneeAcademique }) => {
  return (

    <div>
      <div className={styles.header}>

          <div className={styles.header_fr}>
              <p><b>UNIVERSITE DE YAOUNDE 1</b></p>
              <p><b>FACULTE DES SCIENCES</b></p>
              <p>Division de la Programmation et du suivi des activités Académiques</p>
          </div>

          <div className={styles.header_en}>
              <p><b>UNIVERSITY OF YAOUNDE 1</b></p>
              <p><b>FACULTY OF SCIENCE</b></p>
              <p>Division of Programming and Academic activities follow up</p>
          </div>

      </div>

      <div className={styles.sub_header}>
          <h3 className="title">EMPLOIS DU TEMPS: TIME TABLE</h3>
          <p className="semester">SEMESTRE__{semestre}__ANNEE ACADEMIQUE {anneeAcademique} ACADEMIC YEAR__{semestre}__SEMESTER</p>
      </div>

    </div>
  )
}

export default TableHeader