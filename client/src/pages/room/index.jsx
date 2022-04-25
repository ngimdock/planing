import { Fragment } from "react"
import Seo from "../../components/utils/seo"
import BaseLayout from "../base"
import RoomBody from "./components/roomBody"

const RoomLayout = () => {
  return (
    <Fragment>
      <Seo 
        title="Salles | CoursePrograms"
        description="Section des salles"
      />

      <BaseLayout>
        <RoomBody />
      </BaseLayout>
    </Fragment>
  )
}

export default RoomLayout