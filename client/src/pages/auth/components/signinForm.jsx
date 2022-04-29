import React from "react"
import Input from "../../../components/utils/inputs/input"
import Button from "../../../components/utils/buttons/button"
import styles from '../css/auth.module.css'

const SigninForm = () => {
  return (
    <section className={styles.Signinform}>
      <div className={styles.titleSigninForm}>
        CONNEXION
      </div>
      <div className={styles.ContentSigninForm}>
        <Input type="text"className={styles.InputSpace} placeholder="your email"/>
        <Input type="text" className={styles.InputSpace}placeholder="your password"/>

        <Button className={styles.buttonForm}> Connexion </Button>

        <span className={styles.signinPasword}> Vous avez oublié votre mot de passe?</span>
        <span className={styles.signinClick}> Cliquez ici </span>
      </div>
    </section>
  )
}
  
  export default SigninForm
  