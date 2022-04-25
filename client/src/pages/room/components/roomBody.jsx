import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const RoomBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Room Body

      <AddButton 
        title="Ajouter Salle" 
        onClick={() => openModal('Ajouter Salle', 'ADD_ROOM')}  
      />
    </section>
  )
}

export default RoomBody