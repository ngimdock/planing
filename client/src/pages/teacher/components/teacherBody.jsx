import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import style from "../css/teacher.module.css"
import TeacherContent from "./TeacherContent"

const TeacherBody = () => {
  // Get global state
  const { openModal } = useContext(ModalContext)

  return (
    <section>
      <div className={style.teacherTitle} > Liste des Enseignants </div>
      <div className={style.teacherBody}>
        <TeacherContent />
      </div>

      <AddButton
        title="Ajouter Enseignant"
        onClick={() => openModal('Ajouter Enseignant', 'ADD_TEACHER')}
      />
    </section>
  )
}

export default TeacherBody