import React, { useContext, useState, useEffect } from "react"
import styles from '../../css/modalContent.module.css'
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import LinearLoader from "../../../loaders/linearLoader"
import LoaderCircle from "../../../loaders/loaderCircle"
import FacultyAPI from "../../../../../api/faculty"
import FacultyContext from "../../../../../datamanager/contexts/facultyContext"
import ToastContext from '../../../../../datamanager/contexts/toastContext'
import { BsX, BsCheck } from "react-icons/bs"

const UpdateFacultyModelContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { updateFaculty, selectedFaculty } = useContext(FacultyContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState(selectedFaculty.name)
  const [loading, setLoading] = useState(false)
  const [facultyAlreadyExist, setFacultyAlreadyExist] = useState(true)
  const [checkingFaculty, setCheckingFaculty] = useState(false)
  const [error, setError] = useState("")

  // UseEffect section
    useEffect(() => {
      if (name === selectedFaculty.name) {
        setFacultyAlreadyExist(false)
      } else {
        if (!checkingFaculty && name.length > 0) {
          handleCheckingFaculty(name)
        } else {
          setFacultyAlreadyExist(true)
        }
      }
    }, [name]) 

  // Some handlers
  const handleCheckingFaculty = async (name) => {

    // Start checking code
    setCheckingFaculty(true)

    // Send request
    const { data, error } = await FacultyAPI.checkFaculty(name)
    
    // Stop checking code
    setCheckingFaculty(false)

    if (data !== undefined) {
      setFacultyAlreadyExist(data)
    } else {
      console.log(error)
    }
  }
  const handleChangeName = (e) => setName(e.target.value)

  const handleSubmitForm = async() => {
    if (!loading) {
      setLoading(true)

      const { data, error: err } = await FacultyAPI.modifyFaculty(selectedFaculty.id, name) 
      setLoading(false);

      const {
          idFil,
          nomFil
      } = data

      if(idFil){
        setName("");
        updateFaculty(idFil, nomFil);
        closeModal();
        showToast("Filière modifié", "success")
      }
      else{
        setError(error)
        console.log(err)
        closeModal();
        showToast("Filière non modifié", "error")
      }
    }
  }

  const verificationForm = () => {
    if (
      name &&
      !facultyAlreadyExist ) {
      return true
    }

    return false
  }

  return (
    <section className={styles.container}>
    <Box sx={{ "position": "relative"}}>
      <Input 
        disabled={loading}
        placeholder="nom de la filière"
        fullWidth
        value={name}
        onChange={handleChangeName}
      />
      {
        checkingFaculty ? <LoaderCircle /> : ( 
          <Box className={styles.emailStatusIcons}>
            { 
              facultyAlreadyExist ? (
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

export default UpdateFacultyModelContent