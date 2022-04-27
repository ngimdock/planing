import React from "react"
import Input from "../../../components/utils/inputs/input"
import Button from "../../../components/utils/buttons/button"
import styles from '../css/auth.module.css'

const SigninForm = () => {
    return (
      <section className={styles.Signinform}>
        <div className={styles.titleSigninForm}>
            SIGN IN
        </div>
        <div className={styles.ContentSigninForm}>
            <Input type="text" className={styles.inputSpace} placeholder="your email"/>
            <Input type="text" className={styles.inputSpace} placeholder="your password"/>
            <Button className={styles.buttonForm}> Connexion </Button>
            <span className={styles.signinPasword}> You don't remenber your password?</span>
            <span className={styles.signinClick}> click here </span>
        </div>
      </section>
    )
  }
  
  export default SigninForm
  