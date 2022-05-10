import React from "react"
import styles from '../../css/classStyle.module.css'

const TableHeader = () => {
  return (
    <thead className={styles.tableHeader}>
      <th>No</th>
      <th>Nom classes</th>
      <th>Filieres</th>
      <th>Niveaux</th>
      <th>Capacite</th>
      <th>Nb de specialite</th>
      <th>Nb de groupe</th>
      <th>Controle</th>
    </thead>
  )
}

export default TableHeader