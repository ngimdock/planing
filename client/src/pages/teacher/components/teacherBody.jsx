import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const TeacherBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Teacher Body

      <AddButton 
        title="Ajouter Enseignant" 
        onClick={() => openModal('Ajouter Enseignant', 'ADD_TEACHER')}  
      />
    </section>
  )
}

export default TeacherBody