import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import LevelBody from './components/levelBody'

const LevelLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Niveaux | CoursePrograms"
        description="Section des niveaux"
      />

      <BaseLayout>
        <LevelBody />
      </BaseLayout>
    </Fragment>
  )
}

export default LevelLayout