import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const FacultyBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Faculty Body

      <AddButton 
        title="Ajouter Filiere" 
        onClick={() => openModal('Ajouter Filiere', 'ADD_FACULTY')}  
      />
    </section>
  )
}

export default FacultyBody