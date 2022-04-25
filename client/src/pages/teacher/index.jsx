import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import TeacherBody from "./components/teacherBody"

const TeacherLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Enseignants | CoursePrograms"
        description="Section des enseignants"
      />

      <BaseLayout>
        <TeacherBody />
      </BaseLayout>
    </Fragment>
  )
}

export default TeacherLayout