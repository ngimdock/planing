import React from "react"
import styles from '../../css/classStyle.module.css'

const TableHeader = () => {
  return (
    <thead className={styles.tableHeader}>
      <th>No</th>
      <th>Class Name</th>
      <th>Faculty</th>
      <th>Level</th>
      <th>Capacity</th>
      <th>Speciality Number</th>
      <th>Group</th>
      <th>Control</th>
    </thead>
  )
}

export default TableHeader