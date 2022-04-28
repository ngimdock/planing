import React from "react"
import styles from '../css/Profile.module.css'
import Button from "../../../components/utils/buttons/button"

const imageProfil = require('../../../assets/images/logo/image1.jpg')
const ProfileBody = () => {
  return (
    <section className={styles.Container}>
      <header></header>
        <div className={styles.UserInfo}>
            <img 
            src={imageProfil} 
            alt="image1" 
             className={styles.ImageProfil}
            />
          <div className={styles.Administrator}>
            <span className={styles.NameUser}> Blondelle Kana</span>
            <span className={styles.UserRule}> Administrator</span>
          </div>
          <button className={styles.ButtonAdmin}> Add Admin </button>
          <span className={styles.PersonnalInfo}> Personnal informations</span>
        </div>
        <div className={styles.information_content}>
          <span className={styles.info}> email</span>
          <span> blondelle.kana@facsciences-uy1.cm</span>
        </div>
        <div className={styles.information_content}>
          <span className={styles.info}>Phone </span>
          <span>675612258 </span>
        </div>
        <div className={styles.information_cont}>
          <span className={styles.info}> Sexe</span>
          <span> Feminin</span>
        </div>
    </section>
  )
}

export default ProfileBody