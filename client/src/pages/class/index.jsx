import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import ClassBody from './components/classBody'

const ClassLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Classes | CoursePrograms"
        description="Section des classes"
      />

      <BaseLayout>
        <ClassBody />
      </BaseLayout>
    </Fragment>
  )
}

export default ClassLayout