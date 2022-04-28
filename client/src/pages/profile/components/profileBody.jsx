import React from "react"
import styles from '../css/Profile.module.css'
import Button from "../../../components/utils/buttons/button"
import { Box } from "@mui/material"
import { BsFillPlusCircleFill } from 'react-icons/bs'

const imageProfil = require('../../../assets/images/logo/image1.jpg')
const ProfileBody = () => {
  return (
    <section className={styles.Container}>
      <header />

      <div className={styles.UserInfo}>
        <div className={styles.ImageContainer}>
          <img 
            src={imageProfil} 
            alt="image1" 
            className={styles.ImageProfil}
          />
        </div>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: "row",
            width: '100%',
            justifyContent: 'space-between'
          }}
          className={styles.UserInfoTop}
        >
          <div className={styles.Administrator}>
            <span className={styles.NameUser}> Blondelle Kana</span>
            <span className={styles.UserRule}> Administrator</span>
          </div>

          <Button 
            text="Ajouter admin"
            variant="outlined"
            rounded
            bgColor="#FF8500"
            className={styles.ButtonAdmin}
          >
            <BsFillPlusCircleFill 
              color="#FF8500"
              size={15}
            />
          </Button>
        </Box>

        
        <span className={styles.PersonnalInfo}> Personnal informations</span>
      </div>

      <div className={styles.information_content}>
        <span className={styles.info}>Email</span>
        <span> blondelle.kana@facsciences-uy1.cm</span>
      </div>
      <div className={styles.information_content}>
        <span className={styles.info}>Phone </span>
        <span>675612258 </span>
      </div>
      <div className={styles.information_content} style={{ borderRadius: "0 0 10px 10px" }}>
        <span className={styles.info}> Sexe</span>
        <span> Feminin</span>
      </div>
    </section>
  )
}

export default ProfileBody