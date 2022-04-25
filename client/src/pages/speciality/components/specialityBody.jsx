import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const SpecialityBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Speciality Body

      <AddButton 
        title="Ajouter Specialité" 
        onClick={() => openModal('Ajouter Specialité', 'ADD_SPECIALITY')}  
      />
    </section>
  )
}

export default SpecialityBody