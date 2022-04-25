import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"

const LevelBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      Level Body

      <AddButton 
        title="Ajouter Niveau" 
        onClick={() => openModal('Ajouter Niveau', 'ADD_LEVEL')}  
      />
    </section>
  )
}

export default LevelBody