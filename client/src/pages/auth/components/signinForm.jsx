import React from "react"
import Input from "../../../components/utils/inputs/input"
import Button from "../../../components/utils/buttons/button"
import styles from '../css/auth.module.css'

const SigninForm = () => {
    return (
      <section className="SigninForm">
        <div className="TitleSigninForm">

        </div>
        <div className="ContentSigninForm">
            <Input type="text" placeholder="your email"/>
            <Input type="text" placeholder="your password"/>
            <Button> Connexion </Button>
        </div>
      </section>
    )
  }
  
  export default SigninForm
  