import { Fragment } from "react"
import Seo from '../../components/utils/seo'
import BaseLayout from '../base'
import ProfileBody from './components/profileBody'

const ProfileLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Profil | CoursePrograms"
        description="Section du profil"
      />

      <BaseLayout>
        <ProfileBody />
      </BaseLayout>
    </Fragment>
  )
}

export default ProfileLayout