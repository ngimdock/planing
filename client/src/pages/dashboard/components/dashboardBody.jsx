import { useContext, useState } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const DashboardBody = () => {
  const { openModal } = useContext(ModalContext)
  
  return (
    <section>
      Dashboard Body
    </section>
  )
}

export default DashboardBody