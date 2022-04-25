import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const SubjectBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Subject Body

      <AddButton 
        title="Ajouter Cours" 
        onClick={() => openModal('Ajouter Cours', 'ADD_SUBJECT')}  
      />
    </section>
  )
}

export default SubjectBody