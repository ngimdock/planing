import React, { useContext, useEffect, useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import styles from '../css/modalContent.module.css'
import Select from "../../inputs/select"
import LinearLoader from '../../loaders/linearLoader'
import SubjectAPI from "../../../../api/subject"
import { BsCheck, BsX } from "react-icons/bs"
import LoaderCircle from "../../loaders/loaderCircle"

import SubjectContext from "../../../../datamanager/contexts/subjectContext"
import SpecialityContext from '../../../../datamanager/contexts/specialityContext';


// Initial state
const initialState = {
  code: "",
  description: "",
  speciality: 0
}

const AddSubjectModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { addSubject } = useContext(SubjectContext)
  const { specialities } = useContext(SpecialityContext)

  // Set local state
  const [subject, setSubject] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [codeAlreadyExist, setCodeAlreadyExist] = useState(true)
  const [checkingCode, setCheckingCode] = useState(false)
  const [error, setError] = useState(null)

  // UseEffect section
  useEffect(() => {
    if (!checkingCode && subject.code.length >= 4) {
      handleCheckingCode(subject.code)
    }
  }, [subject.code])

  // Some handlers
  const handleCheckingCode = async (code) => {
    // Start checking code
    setCheckingCode(true)

    // Send request
    const { data, error } = await SubjectAPI.checkCode(code)

    // Stop checking code
    setCheckingCode(false)

    if (data !== undefined) {
      setCodeAlreadyExist(data)
    } else {
      console.log(error)
    }
  }

  const handleChange = (field, value) => {
    const subjectPrev = { ...subject }

    switch (field) {
      case "code": {
        subjectPrev.code = value
        break
      }

      case "description": {
        subjectPrev.description = value
        break
      }

      case "speciality": {
        subjectPrev.speciality = value
        break
      }

      default: break
    }

    setSubject(subjectPrev)
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault()

    console.log(subject);
    if (!loading) {
      setLoading(true)

      const payload = {
        codeCours: subject.code,
        descriptionCours: subject.description,
        idSpecialite: subject.speciality
      }

      const { data, error } = await SubjectAPI.createSubject(payload)

      setLoading(false)

      if (data) {
        addSubject(data)
        console.log(data);
        closeModal()
      }

      console.log(error)
      setError(error)
    }
  }

  const verificationForm = () => {
    const {
      code,
      description
    } = subject

    if (
      code &&
      !codeAlreadyExist &&
      description
    ) {
      return true
    }

    return false
  }

  return (
    <section>
      <Box sx={{ position: 'relative' }}>
        <Input
          disabled={loading}
          placeholder="code"
          fullWidth
          onChange={(e) => handleChange("code", e.target.value)}
        />

        {
          checkingCode ? <LoaderCircle /> : (
            <Box className={styles.emailStatusIcons}>
              {
                codeAlreadyExist ? (
                  <BsX
                    color="red"
                    size={30}
                  />
                ) : (
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
        placeholder="description"
        multiline
        fullWidth
        type="number"
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <Select
        disabled={loading}
        options={specialities && specialities.map(spec => {
          return ({
            value: spec.getId,
            label: spec.getName
          })
        })}
        label="Specialité"
        fullWidth
        onGetValue={(value) => handleChange("speciality", value)}
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

export default AddSubjectModalContent