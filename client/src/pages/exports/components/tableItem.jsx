import React, { useContext } from 'react'
import { ExportContext } from '../../../datamanager/contexts/exportContext'
import styles from '../css/exports.module.css'

const TableItem = () => {

    const { placeExport } = useContext(ExportContext)

    const headerInfos = [
        "Heures", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
    ]

    const bodyInfos = []
    for(var i = 0; i < 7; i++) {
        bodyInfos.push("")
    }

  return (
    <div style={{
        paddingLeft: "50px",
        paddingRight: "50px"
    }}>
       <table className={styles.table}>
           <thead>
                <tr>
                    {headerInfos.map((item) => (
                        <th className={styles.th}>{item}</th>
                    ))}
                </tr>
           </thead>
           <tbody>
                <tr>
                    <td className={styles.td}>7h - 9h55 {placeExport}</td>

                    {bodyInfos.map((item) => (
                        <td className={styles.td}>{item}</td>

                    ))}
                </tr>
                <tr>
                    <td className={styles.td}>10h05 - 12h55</td>
                    {bodyInfos.map((item) => (
                        <td className={styles.td}>{item}</td>

                    ))}
                </tr>
                <tr>
                    <td className={styles.td}>13h15 - 15h55</td>
                    {bodyInfos.map((item) => (
                        <td className={styles.td}>{item}</td>

                    ))}
                </tr>
                <tr>
                    <td className={styles.td}>16h05 - 18h55</td>
                    {bodyInfos.map((item) => (
                        <td className={styles.td}>{item}</td>

                    ))}
                </tr>
                <tr>
                    <td className={styles.td}>19h05 - 21h</td>
                    {bodyInfos.map((item) => (
                        <td className={styles.td}>{item}</td>

                    ))}
                </tr>
           </tbody>
        </table>
    </div>
  )
}

export default TableItem