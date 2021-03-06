import React, { useContext } from "react"
import styles from '../css/Profile.module.css'
import Button from "../../../components/utils/buttons/button"
import { Box } from "@mui/material"
import { BsFillPlusCircleFill } from 'react-icons/bs'
import CurrentUserContext from "../../../datamanager/contexts/currentUserContext"
import ModalContext from "../../../datamanager/contexts/modalContext"

const imageProfil = require('../../../assets/images/default.png')

const ProfileBody = () => {
  // Get global data
  const { currentUser } = useContext(CurrentUserContext)
  const { openModal } = useContext(ModalContext)

  // Some handlers
  const handleOpenModal = () => {
    openModal("Ajouter Administrateur", "ADD_ADMIN")
  }

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
            justifyContent: 'space-between'
          }}
          className={styles.UserInfoTop}
        >
          <div className={styles.Administrator}>
            <span className={styles.NameUser}>{ currentUser.getName }</span>
            <span className={styles.UserRule}> Administrator</span>
          </div>

          <Button 
            text="Ajouter admin"
            variant="outlined"
            rounded
            bgColor="#FF8500"
            className={styles.ButtonAdmin}
            onClick={handleOpenModal}
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
        <span>{ currentUser.getEmail }</span>
      </div>
      <div className={styles.information_content}>
        <span className={styles.info}>Phone </span>
        <span>{ currentUser.getPhone }</span>
      </div>
      <div className={styles.information_content} style={{ borderRadius: "0 0 10px 10px" }}>
        <span className={styles.info}> Sexe</span>
        <span>{ currentUser.getSexe }</span>
      </div>
    </section>
  )
}

export default ProfileBody