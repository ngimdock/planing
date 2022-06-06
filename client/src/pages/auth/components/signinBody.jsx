import { Alert, Snackbar } from "@mui/material"
import React, { useContext } from "react"
import ToastContext from "../../../datamanager/contexts/toastContext"
import styles from '../css/auth.module.css'
import SigninForm from "./signinForm"

// recuperation du logo1
const logo = require('../../../assets/images/logo/logo1.png')
const svg = require('../../../assets/images/svg/signin.png')

const SigninBody = () => {
  // Get data from global state
  const { open: isOpenToast, closeToast, type, message } = useContext(ToastContext)

  return (
    <section className={styles.container}>
      <div className={styles.FirstSigninPage}>
        <div className={styles.FirstSigninContent}>
          <img
            src={logo}
            alt="logo"
            className={styles.LogoImg}
          />
          <span className={styles.SignInDescription}>
            Connectez-vous et générez votre emploi de temps des cours facilement ...
          </span>
        </div>
      </div>
      <div className={styles.SecondSinginPage}>
        <img
          src={svg}
          alt="svg"
          className={styles.signinSvg}
        />
        <SigninForm />
      </div>

      <Snackbar
        open={isOpenToast}
        autoHideDuration={6000}
        onClose={closeToast}
        sx={{
          position: 'fixed'
        }}
      >
        <Alert onClose={closeToast} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </section>
  )
}

export default SigninBody

