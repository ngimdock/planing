import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import SubjectItem from "./subjectItem"
import styles from "../css/subjetStyle.module.css"
import SubjectContext from "../../../datamanager/contexts/subjectContext"
import generateColor from "../../../utils/generateColor"

const SubjectBody = () => {
  // Global state
  const { openModal } = useContext(ModalContext)
  const { subjects } = useContext(SubjectContext)

  return (
    <section className={styles.container}>
      <div className={styles.subjectTitle}> Liste des Unites d'enseignements (04)</div>
      <div className={styles.subjectContent}>
        {
          subjects.map(subject => {
            return (
              <SubjectItem
                key={subject.getCode}
                id={subject.getCode}
                title={subject.getCode}
                value={subject.getDescription}
                color={generateColor()}
              />
            )
          })
        }
      </div>

      <AddButton 
        title="Ajouter Cours" 
        onClick={() => openModal('Ajouter Cours', 'ADD_SUBJECT')}  
      />
    </section>
  )
}

export default SubjectBody