import React, { useContext, useState, useEffect } from "react"
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import styles from '../../css/modalContent.module.css'
import LinearLoader from "../../../loaders/linearLoader"
import LoaderCircle from "../../../loaders/loaderCircle"
import SpecialityAPI from "../../../../../api/speciality"
import SpecialityContext from "../../../../../datamanager/contexts/specialityContext"
import ToastContext from "../../../../../datamanager/contexts/toastContext"
import { BsX, BsCheck } from "react-icons/bs"

const UpdateSpecialityModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { updateSpeciality, selectedSpeciality } = useContext(SpecialityContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState(selectedSpeciality.name)
  const [loading, setLoading] = useState(false)
  const [specialityAlreadyExist, setSpecialityAlreadyExist] = useState(true)
  const [checkingSpeciality, setCheckingSpeciality] = useState(false)
  const [error, setError] = useState("")

    // UseEffect section
    useEffect(() => {
      if (name === selectedSpeciality.name) {
        setSpecialityAlreadyExist(false)
      } else {
        if (!checkingSpeciality && name.length > 0) {
          handleCheckingSpeciality(name)
        } else {
          setSpecialityAlreadyExist(true)
        }
      }
    }, [name])  

  // Some handlers
   const handleCheckingSpeciality = async (name) => {

    // Start checking code
    setCheckingSpeciality(true)

    // Send request
    const { data, error } = await SpecialityAPI.checkSpeciality(name)
    
    // Stop checking code
    setCheckingSpeciality(false)

    if (data !== undefined) {
      setSpecialityAlreadyExist(data)
    } else {
      console.log(error)
    }
  }

  const handleChangeName = (e) => setName(e.target.value)

  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)
      const { data , error: err } = await SpecialityAPI.modifySpeciality(selectedSpeciality.id, name)
      setLoading(false)
      const {
          idSpecialite,
          nomSpecialite
      } = data
      if(idSpecialite) {
        updateSpeciality(idSpecialite, nomSpecialite)
        closeModal()
        showToast("Speciality updated", "success")
      } else {
        setError(err)
        console.log(error)
        closeModal()
        showToast("Could not update the speciality", "error")
      }
    }
  }

  const verificationForm = () => {
    if (
      name &&
      !specialityAlreadyExist 
      ) {
      return true
    }

    return false
  }

  return (
    <section>
      <Box sx={{ "position": "relative"}}>
        <Input 
          disabled={loading}
          value={name}
          placeholder="nom de la spécialité"
          fullWidth
          onChange={handleChangeName}
        />
          {
            checkingSpeciality ? <LoaderCircle /> : ( 
              <Box className={styles.emailStatusIcons}>
                { 
                  specialityAlreadyExist ? (
                    <BsX 
                      color="red"
                      size={30}
                    />
                    ):(
                    <BsCheck 
                      color="green"
                      size={30}
                    />
                  )
                }
              </Box>
            )
          }
      </Box>

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
          onClick={handleSubmitForm}
        />
      </Box>

      {
        loading && <LinearLoader />
      }
    </section>
  )
}

export default UpdateSpecialityModalContent