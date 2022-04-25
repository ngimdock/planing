import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import ProgramBody from './components/programBody'

const ProgramLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Plannification | CoursePrograms"
        description="Section de plannification"
      />

      <BaseLayout>
        <ProgramBody />
      </BaseLayout>
    </Fragment>
  )
}

export default ProgramLayout