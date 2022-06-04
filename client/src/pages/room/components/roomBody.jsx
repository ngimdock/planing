import { useContext } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import ModalContext from "../../../datamanager/contexts/modalContext"
import RoomItem from "./roomItem"
import styles from "../css/roomStyle.module.css"
import RoomContext from "../../../datamanager/contexts/roomContext"

const RoomBody = () => {
  // Gel data from global state
  const { openModal } = useContext(ModalContext)
  const { rooms } = useContext(RoomContext)

  console.log("Hello")

  return (
    <section className={styles.container}>
      <div className={styles.roomTitle}> Liste des salles </div>
      <div className={styles.roomContent}>
        {
          rooms.map(room => {
            return (
              <RoomItem
                key={room.getId}
                id={room.getId}
                title={room.getName}
                value={`${room.getCapacity} Places`}
                capacity={room.getCapacity}
                color={room.getColor}
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