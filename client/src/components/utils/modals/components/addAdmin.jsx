import { Box } from "@mui/material"
import React, { useContext, useState } from "react"
import AuthApi from "../../../../api/auth"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import ToastContext from "../../../../datamanager/contexts/toastContext"
import { verifyEmail, verifyPhoneNumber } from "../../../../utils/regex"
import Button from "../../buttons/button"
import Input from "../../inputs/input"
import Select from "../../inputs/select"
import LinearLoader from "../../loaders/linearLoader"
import styles from "../css/modalContent.module.css"

const initialState = {
  name: "",
  email: "",
  phone: "",
  sexe: ""
}

const AddAdminModalContent = () => {
  // Get data from global state
  const { closeModal } = useContext(ModalContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [adminData, setAdminData] = useState(initialState)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChange = (field, value) => {
    if (!loading) {
      const adminDataClone = {...adminData}

      switch (field) {
        case "name": {
          adminDataClone.name = value
  
          setNameError(value.length === 0 || value.length >= 4 ? false : true)
          break
        }
  
        case "email": {
          adminDataClone.email = value
  
          setEmailError(value.length === 0 || !verifyEmail(value))
          break
        }
  
        case "phone": {
          adminDataClone.phone = value
  
          setPhoneError(value.length === 0 || !verifyPhoneNumber(value))
          break
        }
        
        case "sexe": {
          adminDataClone.sexe = value
          break
        }
  
        default: return
      }
  
      setAdminData(adminDataClone)
    }
  }

  const handleSubmitForm = async () => {
    if (!loading) {
      // Start loading
      setLoading(true)

      // Send request to the server for creating admin
      const { data, error } = await AuthApi.addAdmin({ ...adminData, password: "admin" })

      // Stop loading
      setLoading(false)

      if (data) {
        setAdminData(initialState)
        showToast("Administrateur créé avec succès")
        closeModal()
      }
    }
  }

  const verificationForm = () => {
    const {
      name,
      email,
      phone,
      sexe
    } = adminData
    
    if (
      name.length >= 4 &&
      verifyEmail(email) &&
      verifyPhoneNumber(phone) &&
      sexe
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
          error={nameError}
          helperText={nameError && "Le nom doit avoir 4 caracteres minimum"}
          value={adminData.name}
          placeholder="noms"
          type="text"
          fullWidth
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Input 
          disabled={loading}
          error={emailError}
          helperText={emailError && "Mauvais format"}
          value={adminData.email}
          placeholder="adresse mail"
          type="text"
          fullWidth
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input 
          disabled={loading}
          error={phoneError}
          helperText={phoneError && "Mauvais format"}
          value={adminData.phone}
          placeholder="telephone"
          type="number"
          fullWidth
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <Select 
          disabled={loading}
          label="sexe"
          options={[
            { value: "masculin", label: "Masculin" },
            { value: "feminin", label: "Feminin" }
          ]}
          value={adminData.sexe}
          fullWidth
          onGetValue={(value) => handleChange("sexe", value)}
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
            disabled={!verificationForm()}
            text="Sauver"
            variant="contained"
            fontSize={14}
            rounded
            onClick={handleSubmitForm}
          />
        </Box>
      </Box>

      {
        loading && <LinearLoader />
      }
    </section>
  )
}

export default AddAdminModalContent