import React, { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Footer from "../components/footer/footer"
import Navbar from "../components/navbar/navbar"
import NavigationBlock from "../components/navigation/navigation"
import ModalCoreContainer from "../components/utils/modals/modalCore"
import styles from '../css/base.module.css'
import ModalContext from "../datamanager/contexts/modalContext"
import NavigationContext from "../datamanager/contexts/navigationContext"

const BaseLayout = ({ children }) => {
  // Get information about the current page from URL
  const location = useLocation()
  const pathname = location.pathname
  const pagename = pathname.substring(1)

  // Get global state
  const { navigateTo } = useContext(NavigationContext)
  const { isOpen, currentModalName, closeModal } = useContext(ModalContext)

  useEffect(() => {
    // Update the value of the current page inside the global state
    navigateTo(pagename)
  }, [pagename])

  return (
    <section className={styles.container}>
      <NavigationBlock />

      <main className={styles.baseContentContainer}>
        <Navbar />

        <section className={styles.baseContent}>
          { children }
        </section>

        <Footer />
      </main>

      <ModalCoreContainer
        title={currentModalName} 
        open={isOpen} 
        closeModal={closeModal} 
      />
    </section>
  )
}

export default BaseLayout