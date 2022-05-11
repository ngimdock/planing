import { useContext} from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import RoomItem from "./roomItem"
import styles from "../css/roomStyle.module.css"
import RoomContext from "../../../datamanager/contexts/roomContext"
import generateColor from "../../../utils/generateColor"

const RoomBody = () => {
  // Gel data from global state
  const { openModal } = useContext(ModalContext)
  const { rooms } = useContext(RoomContext)

  return (
    <section className={styles.container}>
      <div className={styles.roomTitle}> List of room(04) </div>
      <div className={styles.roomContent}>
        {
          rooms.map(room => {
            return (
              <RoomItem 
                key={room.getId}
                title={room.getName}
                value={`${room.getCapacity} Places`}
                color={generateColor()}
              />
            )
          })
        }
      </div>

      <AddButton 
        title="Ajouter Salle" 
        onClick={() => openModal('Ajouter Salle', 'ADD_ROOM')}  
      />
    </section>
  )
}

export default RoomBody