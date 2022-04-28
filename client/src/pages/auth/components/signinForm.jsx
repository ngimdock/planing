import React, { useMemo, useState } from "react"
import Input from "../../../components/utils/inputs/input"
import Button from "../../../components/utils/buttons/button"
import styles from '../css/auth.module.css'
import AuthApi from "../../../api/auth"
import { verifyEmail } from "../../../utils/regex"

const SigninForm = () => {
  // Set local state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const passwordError = useMemo(() => {
    const isNotOk = password.length > 0 && password.length <= 4

    if (isNotOk) {
      return { error: true, helper: "mot de passe trop court" }
    }

    return { error: false, helper: "" }
  }, [password])

  const emailError = useMemo(() => {
    const isOk = verifyEmail(email)

    if (email.length > 0 && !isOk) {
      return { error: true, helper: "mauvais format" }
    }

    return { error: false, helper: "" }
  }, [email])

  // Some handler
  const handleChange = (type, value) => {
    if (type === "email") {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }

  const handleSubmitForm = async () => {
    // await AuthApi.login("dilane@gmail.com", "admin")

    if (validateForm()) {
      console.log("ok")
    }
  }

  const validateForm = () => {
    if (
      email && 
      verifyEmail(email) && 
      password && 
      password.length > 4
    )
      return true

    return false
  }

  return (
    <section className={styles.Signinform}>
      <div className={styles.titleSigninForm}>
        CONNEXION
      </div>
      <div className={styles.ContentSigninForm}>
        <Input 
          error={emailError.error}
          helperText={emailError.helper}
          type="text"
          value={email}
          className={styles.InputSpace} 
          placeholder="your email"
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <Input 
          error={passwordError.error}
          helperText={passwordError.helper}
          type="text" 
          value={password}
          className={styles.InputSpace}
          placeholder="your password"
          onChange={(e) => handleChange('pasword', e.target.value)}
        />

        <Button 
          disabled={!validateForm()}
          className={styles.buttonForm}
          onClick={handleSubmitForm}
        > 
          Connexion 
        </Button>

        <span className={styles.signinPasword}> Vous avez oublié votre mot de passe?</span>
        <span className={styles.signinClick}> Cliquez ici </span>
      </div>
    </section>
  )
}
  
  export default SigninForm
  