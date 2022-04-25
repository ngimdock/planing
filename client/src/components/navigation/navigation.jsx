import React, { useContext, useEffect, useState } from "react"
import styles from '../../css/base.module.css'
import NavigationItem from "./navigationItem"
import { BsBarChartFill, BsBookFill, BsDoorOpenFill, BsFillCalendarMinusFill, BsFillPersonFill, BsPeopleFill, BsX } from 'react-icons/bs'
import { MdDashboard, MdSchool } from 'react-icons/md'
import { HiUserGroup } from 'react-icons/hi'
import NavigationContext from "../../datamanager/contexts/navigationContext"

// requiring logo
const logo = require('../../assets/images/logo/logo2.png')

// Get the window width value and test is it's greater than 1100px
const getIsFixedValue = () => window.innerWidth > 1100

const NavigationBlock = () => {
  // Get data from the global state
  const { currentPage, isOpen, toggleNavigation } = useContext(NavigationContext)

  // Set local state
  const [isFixed, setIsFixed] = useState(getIsFixedValue())

  // Define whether the navigation section will be fixed ot not
  useEffect(() => {
    handleWindowResize(true)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => handleWindowResize())

    return () => {
      window.removeEventListener('resize', () => handleWindowResize())
    }
  }, [])

  // Some handlers
  const handleWindowResize = (stayOpen = false) => {
    if (getIsFixedValue()) {
      setIsFixed(true)
    } else {
      setIsFixed(false)
      toggleNavigation(stayOpen)
    }
  }

  return (
    <aside className={`
      ${styles.navigationSection}
      ${!isFixed && styles.navigationSectionFloat }
      ${!isFixed && isOpen && styles.navigationSectionFloatTranslate}
    `}>
      <div className={styles.navigationLogoContainer}>
        <img 
          src={logo} 
          alt="logo" 
          className={styles.navigationLogoImg}
        />

        <BsX 
          size={25}
          color="#fff"
          className={styles.navigationClose}
          onClick={() => toggleNavigation()}
        />
      </div>

      <section className={styles.navigationList}>
        <nav className={styles.navigationItems}>
          <NavigationItem title="Tableau de bord" link="/">
            <MdDashboard 
              size={25}
              color={'/' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Profil" link="/profile">
            <BsFillPersonFill 
              size={25}
              color={'/profile' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
        </nav>

        <nav className={styles.navigationItems}>
          <NavigationItem title="Filières" link="/faculties">
            <MdSchool 
              size={25}
              color={'/faculties' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Niveaux" link="/levels">
            <BsBarChartFill 
              size={25}
              color={'/levels' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Classes" link="/classes">
            <HiUserGroup 
              size={25}
              color={'/classes' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Spécialités" link="/specialities">
            <HiUserGroup 
              size={25}
              color={'/specialities' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Cours" link="/subjects">
            <BsBookFill 
              size={25}
              color={'/subjects' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Enseignants" link="/teachers">
            <BsPeopleFill 
              size={25}
              color={'/teachers' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Salles" link="/rooms">
            <BsDoorOpenFill 
              size={25}
              color={'/rooms' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
          <NavigationItem title="Planification" link="/programs">
            <BsFillCalendarMinusFill 
              size={25}
              color={'/programs' === '/' + currentPage ? "#ff8500" : "#fff"}
            />
          </NavigationItem>
        </nav>
      </section>

    </aside>
  )
}

export default NavigationBlock