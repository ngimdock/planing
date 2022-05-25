import React, { useContext, useEffect, useState } from "react"
import Input from '../../../inputs/input'
import Select from '../../../inputs/select'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import styles from '../../css/modalContent.module.css'
import TeacherAPI from "../../../../../api/teacher"
import { BsCheck, BsX } from "react-icons/bs"
import LoaderCircle from "../../../loaders/loaderCircle"
import LinearLoader from '../../../loaders/linearLoader'
import TeacherContext from "../../../../../datamanager/contexts/teacherContext"
import ToastContext from "../../../../../datamanager/contexts/toastContext"


const UpdateTeacherModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { updateTeacher, selectedTeacher } = useContext(TeacherContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [teacher, setTeacher] = useState(selectedTeacher)
  const [loading, setLoading] = useState(false)
  const [matriculeAlreadyExist, setMatriculeAlreadyExist] = useState(true)
  const [checkingMatricule, setCheckingMatricule] = useState(false)
  const [error, setError] = useState("")

  // UseEffect section
  useEffect(() => {
    if (teacher.matricule === selectedTeacher.matricule) {
      setMatriculeAlreadyExist(false)
    } else {
      if (!checkingMatricule && teacher.matricule.length >= 4) {
        handleCheckingMatricule(teacher.matricule)
      } else {
        setMatriculeAlreadyExist(true)
      }
    }
  }, [teacher.matricule])

  // Some handlers
  const handleCheckingMatricule = async (code) => {
    // Start checking code
    setCheckingMatricule(true)

    // Send request
    const { data, error } = await TeacherAPI.checkMatricule(code)
    
    // Stop checking code
    setCheckingMatricule(false)

    if (data !== undefined) {
      setMatriculeAlreadyExist(data)
    } else {
      console.log(error)
    }
  }

  const handleChange = (field, value) => {
    const teacherPrev = {...teacher}
    
    switch (field) {
      case "matricule": {
        teacherPrev.matricule = value
        break
      }

      case "name": {
        teacherPrev.name = value
        break
      }

      case "sexe": {
        teacherPrev.sexe = value
        break
      }

      default: break
    }

    setTeacher(teacherPrev)
  }

  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)
      const { data, error: err } = await TeacherAPI.updateTeacher(
        selectedTeacher.matricule, 
        { matricule: teacher.matricule, 
          name: teacher.name, 
          sexe: teacher.sexe})
      setLoading(false)
      if(data.matriculeEns) {
        const payload = { matricule: data.matriculeEns, name: data.nomEns, sex: data.sexEns  } 
        updateTeacher(selectedTeacher.matricule, payload)
        closeModal()
        showToast("Enseignant modifié", "success")
      } else {
        setError(err)
        closeModal()
        showToast("Enseignant non modifié", "error")
      }
    }
  }

  const verificationForm = () => {
    const {
      matricule,
      name,
      sexe
    } = teacher

    if (
      matricule &&
      !matriculeAlreadyExist &&
      name &&
      sexe
    ) {
      return true
    }

    return false
  }

  return (
    <section>
      <Box sx={{ position: "relative" }}>
        <Input 
          disabled={loading}
          placeholder="matricule"
          fullWidth
          onChange={e => handleChange("matricule", e.target.value)}
          value={teacher.matricule}
        />

          {
            checkingMatricule ? <LoaderCircle /> : (
              <Box className={styles.emailStatusIcons}>
                {
                  matriculeAlreadyExist ? (
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
      <Input 
        disabled={loading}
        placeholder="nom"
        fullWidth
        onChange={e => handleChange("name", e.target.value)}
        value={teacher.name}
      />
      <Select 
        disabled={loading}
        options={[
          { value: "feminin", label: "Feminin" },
          { value: "masculin", label: "Masculin" }
        ]}
        label="Sexe"
        onGetValue={value => handleChange("sexe", value)}
        value={(teacher.sexe).toLowerCase()}
        fullWidth
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
          onClick={handleSubmitForm}
        />
      </Box>

      {
        loading && <LinearLoader />
      }
    </section>
  )
}

export default UpdateTeacherModalContent