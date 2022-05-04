import React from "react"
import styles from '../../css/program.module.css'

const TableHeader = () => {
  return (
    <thead className={styles.tableHeader}>
      <th>Horaire</th>
      <th>Lundi</th>
      <th>Mardi</th>
      <th>Mercredi</th>
      <th>Jeudi</th>
      <th>Vendredi</th>
      <th>Samedi</th>
      <th>Dimanche</th>
    </thead>
  )
}

export default TableHeader