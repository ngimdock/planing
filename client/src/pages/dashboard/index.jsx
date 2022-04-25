import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import DashboardBody from "./components/dashboardBody"

const DashboardLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Tableau de bord | CoursePrograms"
        description="Section des Statistiques"
      />

      <BaseLayout>
        <DashboardBody />
      </BaseLayout>
    </Fragment>
  )
}

export default DashboardLayout