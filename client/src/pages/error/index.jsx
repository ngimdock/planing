import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import ErrorBody from './components/errorBody'

const ErrorLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Page non trouvé | CoursePrograms"
        description="La page que vous essayez d'atteindre est inaccessible"
      />

      <BaseLayout>
        <ErrorBody />
      </BaseLayout>
    </Fragment>
  )
}

export default ErrorLayout