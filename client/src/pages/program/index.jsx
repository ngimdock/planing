import { Fragment, StrictMode } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import ProgramBody from './components/programBody'

const ProgramLayout = () => {
  return (
    <StrictMode>
      <Seo 
        title="Plannification | CoursePrograms"
        description="Section de plannification"
      />

      <BaseLayout>
        <ProgramBody />
      </BaseLayout>
    </StrictMode>
  )
}

export default ProgramLayout