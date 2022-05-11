import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import LevelItem from "./levelItem"
import styles from "../css/levelStyle.module.css"
import LevelContext from "../../../datamanager/contexts/levelContext"
import generateColor from "../../../utils/generateColor"

const LevelBody = () => {
   // Get global state
  const { openModal } = useContext(ModalContext)
  const { levels } = useContext(LevelContext)

  return (
    <section className={styles.container}>
      <div className={styles.levelTitle}> Liste des differents niveaux</div>
      <div className={styles.levelContent}>
         {
            levels.map(level => {
               return (
                  <LevelItem
                     key={level.getId}
                     id={level.getId}
                     name={level.getName}
                     color={generateColor()}
                  />
               )
            })
         }
      </div>

      <AddButton 
        title="Ajouter Niveau" 
        onClick={() => openModal('Ajouter Niveau', 'ADD_LEVEL')}  
      />
    </section>
  )
}

export default LevelBody