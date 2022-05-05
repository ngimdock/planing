import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import style from "../css/classStyle.module.css"
import ModalContext from "../../../datamanager/contexts/modalContext"
import ClassTable from "./classTable"

const ClassBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      <div className={style.classTitle} > List of Classes </div>
      <div className={style.classBody}>
        <ClassTable />  
      </div>

      <AddButton 
        title="Ajouter classe" 
        onClick={() => openModal('Ajouter classe', 'ADD_CLASS')}  
      />
    </section>
  )
}

export default ClassBody