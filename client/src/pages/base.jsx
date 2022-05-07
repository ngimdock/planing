import { Alert, Snackbar } from "@mui/material"
import React, { Fragment, useContext, useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import AuthApi from "../api/auth"
import Footer from "../components/footer/footer"
import LoadingPage from "../components/loading/loadingPage"
import Navbar from "../components/navbar/navbar"
import NavigationBlock from "../components/navigation/navigation"
import ModalCoreContainer from "../components/utils/modals/modalCore"
import styles from '../css/base.module.css'
import CurrentUserContext from "../datamanager/contexts/currentUserContext"
import ModalContext from "../datamanager/contexts/modalContext"
import NavigationContext from "../datamanager/contexts/navigationContext"
import ToastContext from "../datamanager/contexts/toastContext"
import useGetClasses from "../hooks/useGetClasses"
import useGetFaculties from "../hooks/useGetFaculties"
import useGetLevels from "../hooks/useGetLevels"
import useGetRooms from "../hooks/useGetRooms"
import useGetSpecialities from "../hooks/useGetSpecialities"
import useGetSubjects from "../hooks/useGetSubjects"
import useGetTeachers from "../hooks/useGetTeachers"

const BaseLayout = ({ children }) => {
  // Get information about the current page from URL
  const location = useLocation()
  const pathname = location.pathname
  const pagename = pathname.substring(1)
  
  // Get global state
  const { navigateTo } = useContext(NavigationContext)
  const { isOpen, currentModalName, closeModal } = useContext(ModalContext)
  const { currentUser, login } = useContext(CurrentUserContext)
  const { open: isOpenToast, message, closeToast, type } = useContext(ToastContext)
  
  // Set local state
  const [loading, setLoading] = useState(!currentUser ? true : false)

  // Use effect section
  useEffect(() => {
    // Update the value of the current page inside the global state
    navigateTo(pagename)
  }, [pagename])

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser()
    }
  }, [currentUser])

  // Fetch Data section
  useGetFaculties()
  useGetLevels()
  useGetSpecialities()
  useGetTeachers()
  useGetRooms()
  useGetClasses()
  useGetSubjects()

  // Some handlers
  const getCurrentUser = async () => {
    const { data } = await AuthApi.getCurrentUser()

    if (data && data.data) {
      // Initialize payload
      const payload = {
        id: data.data.idAdmin,
        name: data.data.nomAdmin,
        email: data.data.emailAdmin,
        phone: data.data.numTelephone,
        sexe: data.data.sexe
      }

      // Login the user
      login(payload)
    }
      
    setLoading(false)
  }

  return (
    <Fragment>
      {
        loading ? (
          <LoadingPage />
        ) : (
          currentUser ? (
            <section className={styles.container}>
              <NavigationBlock />
  
              <main className={styles.baseContentContainer}>
                <Navbar />
  
                <section className={styles.baseContent}>
                  { children }

                  <Snackbar 
                    open={isOpenToast} 
                    autoHideDuration={6000} 
                    onClose={closeToast}
                    sx={{
                      position: 'fixed'
                    }}  
                  >
                    <Alert onClose={closeToast} severity={type} sx={{ width: '100%' }}>
                      { message }
                    </Alert>
                  </Snackbar>
                </section>
  
                <Footer />
              </main>
  
              <ModalCoreContainer
                title={currentModalName} 
                open={isOpen} 
                closeModal={closeModal} 
              />

            </section>
          ):<Navigate to="/signin" />
        )
      }

    </Fragment>
  )
}

export default BaseLayout