import React from "react"
import styles from '../css/Profile.module.css'
import AddButton from "../../../components/utils/buttons/addButton"

const imageProfil = require('../../../assets/images/logo/image1.jpg')
const ProfileBody = () => {
  return (
    <section className="Container">
      <header></header>
      <div className="UserInfo">
        <img 
           src={imageProfil} 
           alt="image1" 
           className={styles.ImageProfil}
           />
        <div className="Administrator">
          <span className="NameUser"> BLONDELLE KANA</span>
          <span className="UserRule"> Administrator</span>
        </div>
        <AddButton> Add Admin </AddButton>
      </div>
    </section>
  )
}

export default ProfileBody