import React from 'react'
import TableHeader from '../tableHeader'
import exportBaseStyle from '../../css/exports.module.css'
import styles from './css/exportFooter.module.css'

const ExportFooter = ({ semestre, anneeAcademique }) => {
    return (

        <div className={exportBaseStyle.divisor}>
            <TableHeader semestre={semestre} anneeAcademique={anneeAcademique}  />
            <nav className={styles.nav}>
                <ul>
                    <li>LE PORT DES MASQUES EST OBLIGATOIRE DANS LES SALLES DE COURS</li>
                    <li>LES ENSEIGNEMENTS SE DFERONT EN MODE HYBRIDE: EN PRESENTIEL ET EN VIRTUEL. LES ETUDIANTS SERONT ENTRETENU SUR L'UTILISATION DE GOOGLE CLASSROOM 
                        EN PRESENTIEL PAR UNE EQUIPE SUPERVISEE TECHNIQUEMENT PAR LE CUTI ET PAR LES FORA VIRTUELLES DISPONIBLES.</li>
                    <li>POUR LES COURS DE LANGUES, SE REFERER A LA REPARTITION PAR GROUPE ET PAR SALLE DU SERIVCES DES LANGUES.</li>
                    <li>LES ETUDIANTS SONT APPELES A RESPECTER SCRUPULEUSEMENT LEUR GROUPE SOUS PEINE DE SANCTIONS.</li>
                </ul>
            </nav> 
        </div>
      )
}

export default ExportFooter