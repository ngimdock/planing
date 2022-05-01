import { useContext} from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import RoomItem from "./roomItem"
import styles from "../css/roomStyle.module.css"

const RoomBody = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section className={styles.container}>
      <div className={styles.roomTitle}> List of room(04) </div>
      <div className={styles.roomContent}>
         <RoomItem
            title="A502"
            value="502 Places"
            color="#09325a"
         />
         <RoomItem
            title="A1001"
            value="1001 Places"
            color="#FF8500"
         />
          <RoomItem
            title="A250"
            value="250 Places"
            color="#d40cb3"
         />
          <RoomItem
            title="A3"
            value="200 Places"
            color="#ca7de9e3"
         />
      </div>

      <AddButton 
        title="Ajouter Salle" 
        onClick={() => openModal('Ajouter Salle', 'ADD_ROOM')}  
      />
    </section>
  )
}

export default RoomBody