import React from 'react'
import styles from './css/exportHeader.module.css'
import exportBaseStyle from '../../css/exports.module.css'
import img from '../../../../assets/images/logo/logoFac.png'

const ExportHeader = () => {
    return (

        <div className={exportBaseStyle.divisor}>
            <div className={styles.header}>
    
                <div className={styles.header_fr}>
                <div style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "marginBottom": "10px",
                    "fontSize": "20px"
                }}>
                    <div>UNIVERSITE DE YAOUNDE 1</div>
                    <div><b>FACULTE DES SCIENCES</b></div>
                </div>
                    <p style={{
                        "width": "325px",
                        "textAlign": "center"
                    }}><b>Division de la Programmation et du suivi des activités Académiques</b></p>
                    <div>
                        <b>ANNEE ACADEMIQUE 2021-2022 SEMESTRE 2</b>
                    </div>
                </div>
    
                <img src={img} alt="" />
    
                <div className={styles.header_en}>
                <div style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "marginBottom": "10px",
                    "fontSize": "20px"
                }}> 
                    <div>THE UNIVERSITY OF YAOUNDE 1</div>
                    <div><b>FACULTY OF SCIENCE</b></div>
                </div>
                    <p style={{
                        "width": "300px",
                        "textAlign": "center"
                    }}><b>Division of Programming and Academic activities follow up</b></p>
                    <div>
                        <b>2021-2022 ACADEMIC YEAR 2 SEMESTER</b>
                    </div>
                </div>
                </div>
    
                <div style={{
                    "marginTop": "10vh",
                    "marginBottom": "20vh",
                    "textAlign": "center"
                }}>
                    <h1>EMPLOIS DE TEMPS - TIME TABLE</h1>
                </div>
    
    
                <div style={{
                    "marginBottom": "20vh",
                    "textAlign": "center"
                }}>
                    <h2>DEBUT DES COURS: LUNDI 21 MARS 2022 A 07H00</h2>
                </div>
    
        </div>
    );    
}

export default ExportHeader