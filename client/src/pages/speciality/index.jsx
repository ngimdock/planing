import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import SpecialityBody from "./components/specialityBody"

const SpecialityLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Specialité | CoursePrograms"
        description="Section des Specialités"
      />

      <BaseLayout>
        <SpecialityBody />
      </BaseLayout>
    </Fragment>
  )
}

export default SpecialityLayout