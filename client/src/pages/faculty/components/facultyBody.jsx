import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import FacultyItem from "./facultyItem"
import styles from "../css/facultyStyle.module.css"
import FacultyContext from "../../../datamanager/contexts/facultyContext"
import generateColor from "../../../utils/generateColor"

const FacultyBody = () => {
  // Get data from global state
  const { openModal } = useContext(ModalContext)
  const { faculties } = useContext(FacultyContext)

  return (
    <section className={styles.container}>
      <div className={styles.facultyTitle}> Liste des differentes filieres </div>
      <div className={styles.facultyContent}>
        {
          faculties.map(fac => {
            return (
              <FacultyItem
                key={fac.getId}
                id={fac.getId}
                name={fac.getName}
                color={fac.getColor}
              />
            )
          })
        }
      </div>

      <AddButton
        title="Ajouter Filiere"
        onClick={() => openModal('Ajouter Filiere', 'ADD_FACULTY')}
      />
    </section>
  )
}

export default FacultyBody