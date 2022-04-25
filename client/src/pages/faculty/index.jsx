import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import FacultyBody from './components/facultyBody'

const FacultyLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Filieres | CoursePrograms"
        description="Section des filieres"
      />

      <BaseLayout>
        <FacultyBody />
      </BaseLayout>
    </Fragment>
  )
}

export default FacultyLayout