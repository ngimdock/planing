import React, { useState } from 'react';
import { Box } from "@mui/material"
import { useContext } from "react"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LinearLoader from '../../loaders/linearLoader';

const AddAcademicYearModalContent = () => {
  // Get data from global state
  const { closeModal } = useContext(ModalContext)

  // Set local state
  const [startYear, setStartYear] = useState(new Date(Date.now()))
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChangeYear = (value) => {
    setStartYear(value)
  }

  const handleSubmitForm = () => {
    if (!loading) {
      setLoading(true)
      console.log("You can send request here")
    }
  }

  const verificationForm = () => {
    if (startYear) return true

    return false
  }

  return (
    <section>
      <Box
        sx={{
          position: "relative"
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            // disableFuture
            disabled={loading}
            orientation="landscape"
            label="Annee de debut"
            minDate={new Date(2021, 0, 1)}
            maxDate={new Date(2025, 0, 1)}
            openTo="year"
            views={['year']}
            value={startYear}
            onChange={(newValue) => {
              handleChangeYear(newValue);
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                fullWidth 
                size='small' 
                sx={{ mb: 2 }} 
              />
            )}
          />
        </LocalizationProvider>
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

export default AddAcademicYearModalContent