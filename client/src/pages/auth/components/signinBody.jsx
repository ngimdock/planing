import React from "react"
import styles from '../css/auth.module.css'
import SigninForm from "./signinForm"

// recuperation du logo1
const logo = require('../../../assets/images/logo/logo1.png')

const SigninBody = () => {
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
              Sign In and start generating your planning in an essay way.......
           </span>
         </div>
      </div>
      <div className={styles.SecondSinginPage}>
        <img src="" alt="" />
        <SigninForm/>
      </div>
    </section>
  )
}

export default SigninBody

