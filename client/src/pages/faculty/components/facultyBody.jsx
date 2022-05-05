import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import FacultyItem from "./facultyItem"
import styles from "../css/facultyStyle.module.css"

const FacultyBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section className={styles.container}>
      <div className={styles.facultyTitle}> Liste des differentes filieres </div>
      <div className={styles.facultyContent}>
         <FacultyItem
            name="Informatique"
            color="#3e4bff"
         />
          <FacultyItem
            name="Mathematique"
            color="#FF8500"
         />
          <FacultyItem
            name="Physique"
            color="red"
         />
         <FacultyItem
            name="Chimie"
            color="#d40cb3"
         />
        
      </div>
      
      <AddButton 
        title="Ajouter Filiere" 
        onClick={() => openModal('Ajouter Filiere', 'ADD_FACULTY')}  
      />
    </section>
  )
}

export default FacultyBody