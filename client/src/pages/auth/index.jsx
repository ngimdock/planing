import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import SigninBody from './components/signinBody'

const SigninLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Connexion | CoursePrograms"
        description="page de connexion"
      />

      <SigninBody />
    </Fragment>
  )
}

export default SigninLayout