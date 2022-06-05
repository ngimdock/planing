import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import SpecialityContext from "../../../datamanager/contexts/specialityContext"
import generateColor from "../../../utils/generateColor"
import SpecialityItem from "../components/specialityItem"
import styles from "../css/specialityStyle.module.css"

const SpecialityBody = () => {
   // Global state
   const { openModal } = useContext(ModalContext)
   const { specialities } = useContext(SpecialityContext)

   return (
      <section className={styles.container}>
         <div className={styles.specialityTitle}> Liste des differentes specialites</div>
         <div className={styles.specialityContent}>
            {
               specialities.map(spec => {
                  return (
                     <SpecialityItem
                        key={spec.getId}
                        id={spec.getId}
                        name={spec.getName}
                        color={spec.getColor}
                     />
                  )
               })
            }
         </div>

         <AddButton
            title="Ajouter Specialité"
            onClick={() => openModal('Ajouter Specialité', 'ADD_SPECIALITY')}
         />
      </section>
   )
}

export default SpecialityBody