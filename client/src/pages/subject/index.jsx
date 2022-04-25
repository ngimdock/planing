import { Fragment } from "react"
import Seo from '../../components/utils/seo'
import BaseLayout from "../base"
import SubjectBody from "./components/subjectBody"

const SubjectLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Cours | CoursePrograms"
        description="Section des cours"
      />

      <BaseLayout>
        <SubjectBody />
      </BaseLayout>
    </Fragment>
  )
}

export default SubjectLayout