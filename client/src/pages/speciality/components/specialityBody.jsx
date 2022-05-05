import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import SpecialityItem from "../components/specialityItem"
import styles from "../css/specialityStyle.module.css"

const SpecialityBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section className={styles.container}>
      <div className={styles.specialityTitle}> Liste des differents specialite</div>
      <div className={styles.specialityContent}>
         <SpecialityItem
            name="Genie Logiciel"
            color="#3e4bff"
         />
          <SpecialityItem
            name="Data science"
            color="#FF8500"
         />
          <SpecialityItem
            name="Reseaux"
            color="red"
         />
         <SpecialityItem
            name="Securite"
            color="#44928c"
         />
         <SpecialityItem
            name="Biologie Vegetale"
            color=" #c90c99"
         />
         <SpecialityItem
            name="Biologie Animale"
            color="#163306"
         />
         <SpecialityItem
            name="Microbiologie"
            color="aqua"
         />
        
      </div>
      
      <AddButton 
        title="Ajouter Specialité" 
        onClick={() => openModal('Ajouter Specialité', 'ADD_SPECIALITY')}  
      />
    </section>
  )
}

export default SpecialityBody