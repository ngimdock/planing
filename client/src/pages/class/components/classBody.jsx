import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const ClassBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Class Body

      <AddButton 
        title="Ajouter classe" 
        onClick={() => openModal('Ajouter classe', 'ADD_CLASS')}  
      />
    </section>
  )
}

export default ClassBody