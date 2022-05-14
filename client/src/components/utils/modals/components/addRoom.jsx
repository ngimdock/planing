import React, { useContext, useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../datamanager/contexts/modalContext"
import LinearLoader from "../../loaders/linearLoader"
import RoomAPI from '../../../../api/room/index';
import RoomContext from "../../../../datamanager/contexts/roomContext"
import ToastContext from "../../../../datamanager/contexts/toastContext"

const AddRoomModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { addRoom } = useContext(RoomContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChange = (field, e) => {
    const value = e.target.value

    if (field === "name") {
      setName(value)
    } else if (field === "capacity") {
      setCapacity(value)
    }
  }

  const handleSubmitForm =async () => {
    if (!loading) {
      setLoading(true)
      const payload = {
        nomSal : name,
        capaciteSal: capacity
      }
      
      const {data, error } = await RoomAPI.create(payload)
      console.log("front",data)
      setLoading(false)
      
      if (data) {
        addRoom({
          id: data.id,
          name: data.nomSal,
          capacity: data.capaciteSal
        })
        closeModal()
        showToast("creation reussite", "success")
        
      } else {
        console.log(error)
        showToast("ne peut creer cette salle", "error")
      }

    }
  }

  const verificationForm = () => {
    if (name && capacity) {
      return true
    }

    return false
  }

  return (
    <section>
      <Input 
        disabled={loading}
        placeholder="nom de la salle"
        fullWidth
        onChange={(e) => handleChange("name", e)}
      />
      <Input 
        disabled={loading}
        placeholder="capacité de la salle"
        fullWidth
        type="number"
        onChange={(e) => handleChange("capacity", e)}
      />

      <Box className={styles.controls}>
        <Button 
          text="Annuler"
          variant="outlined"
          bgColor="#ff8500"
          fontSize={14}
          rounded
          className={styles.controlsBtn}
          onClick={closeModal}
        />

        <Button 
          disabled={!verificationForm() || loading}
          text="Sauver"
          variant="contained"
          fontSize={14}
          rounded
          onClick={ handleSubmitForm }
        />
      </Box>

      {
        loading && <LinearLoader />
      }
    </section>
  )
}

export default AddRoomModalContent