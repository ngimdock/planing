import React, { useContext, useMemo } from 'react'
import { Link } from "react-router-dom"
import { BsFillPersonFill } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import styles from './css/navbar.module.css'
import { HiHome } from "react-icons/hi"
import { BiChevronRight } from 'react-icons/bi'
import { MdOutlineLogout } from 'react-icons/md'
import NavigationContext from '../../datamanager/contexts/navigationContext'

const Navbar = () => {
  // Get global state
  const { currentPage, toggleNavigation } = useContext(NavigationContext)

  // Some handlers
  const generatePagename = useMemo(() => {
    switch (currentPage) {
      case "": {
        return "Tableau de bord"
      }

      case "profile": {
        return "Profil"
      }

      case "faculties": {
        return "Filières"
      }

      case "levels": {
        return "Niveaux"
      }

      case "classes": {
        return "Classes"
      }

      case "specialities": {
        return "Spécialités"
      }

      case "subjects": {
        return "Cours"
      }

      case "rooms": {
        return "Salles"
      }

      case "teachers": {
        return "Enseignants"
      }

      case "programs": {
        return "Planification"
      }

      default: return ""
    }
  }, [currentPage])

  return (
    <header className={styles.container}>
      <div className={styles.navbarTop}>
        <div className={styles.navbarNav}>
          <FiMenu
            size={25}
            color="#555"
            className={styles.navbarMenuIcon}
            onClick={() => toggleNavigation()}
          />

          <Link to="/">
            <HiHome 
              size={20}
              color="#828282"
            />
          </Link>

          <BiChevronRight 
            size={20}
            color="#828282"
          />
          <span className={styles.navbarNavItemText}>{ generatePagename }</span>
        </div>

        <div className={styles.navbarLinks}>
          <Link to="/profile" className={styles.navbarLink}>
            <BsFillPersonFill 
              size={20}
              color="#828282"
            />
            <span 
              className={`
                ${styles.navbarNavItemText}
                ${styles.navbarLinkText} 
              `}
            >Profil</span>
          </Link>

          <Link to="#" className={styles.navbarLink}>
            <MdOutlineLogout 
              size={20}
              color="#828282"
            />
            <span 
              className={`
                ${styles.navbarNavItemText}
                ${styles.navbarLinkText} 
              `}
            >Deconnexion</span>
          </Link>
        </div>
      </div>

      <div className={styles.navbarBottom}>
        <span className={styles.navbarTitle}>{ generatePagename }</span>
      </div>
    </header>
  )
}

export default Navbar