import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import LevelItem from "./levelItem"
import styles from "../css/levelStyle.module.css"

const LevelBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section className={styles.container}>
      <div className={styles.levelTitle}> Liste des differents niveaux</div>
      <div className={styles.levelContent}>
         <LevelItem
            name="Niveau 1"
            color="#3e4bff"
         />
          <LevelItem
            name="Niveau 2"
            color="#FF8500"
         />
          <LevelItem
            name="Niveau 3"
            color="red"
         />
         <LevelItem
            name="Master 1"
            color="#44928c"
         />
         <LevelItem
            name="Master 2"
            color=" #c90c99"
         />
         <LevelItem
            name="Master 2++"
            color="#163306"
         />
        
      </div>

      <AddButton 
        title="Ajouter Niveau" 
        onClick={() => openModal('Ajouter Niveau', 'ADD_LEVEL')}  
      />
    </section>
  )
}

export default LevelBody