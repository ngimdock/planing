import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import SubjectItem from "./subjectItem"
import styles from "../css/subjetStyle.module.css"

const SubjectBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section className={styles.container}>
      <div className={styles.subjectTitle}> Liste des Unites d'enseignements (04)</div>
      <div className={styles.subjectContent}>
         <SubjectItem
            title="INF3086"
            value="Business Intelligence"
            color="#09325a"
         />
         <SubjectItem
            title="INF3036"
            value="Base de Donnees"
            color="#FF8500"
         />
          <SubjectItem
            title="Math112"
            value="Algebre"
            color="#d40cb3"
         />
          <SubjectItem
            title="CHM2034"
            value="Chimie Organique"
            color="#ca7de9e3"
         />
      </div>

      <AddButton 
        title="Ajouter Cours" 
        onClick={() => openModal('Ajouter Cours', 'ADD_SUBJECT')}  
      />
    </section>
  )
}

export default SubjectBody