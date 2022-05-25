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
import AcademicYearAPI from '../../../../api/academicYear';
import ToastContext from '../../../../datamanager/contexts/toastContext';
import PlanningContext from '../../../../datamanager/contexts/planningContext';
import PlanningAction from '../../../../datamanager/actions/planning';

const AddAcademicYearModalContent = () => {
  // Get data from global state
  const { closeModal } = useContext(ModalContext)
  const { showToast } = useContext(ToastContext)
  const { dispatch } = useContext(PlanningContext)

  // Set local state
  const [startYear, setStartYear] = useState(new Date(Date.now()))
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChangeYear = (value) => {
    setStartYear(value)
  }

  const handleSubmitForm = async () => {
    if (!loading) {
      // Start loading
      setLoading(true)

      // Send request
      const { data, error } = await AcademicYearAPI.create(generateAcademicYearString(startYear))

      // Stop loading
      setLoading(false)

      if (data) {
        console.log(data)
        // Add academic year to the context
        dispatch(PlanningAction.addAcademicYear(data.academicYear))

        // Add semesters
        for (let semester of data.semesters) {
          // For each semester, we add it to the global state
          dispatch(PlanningAction.addSemester({
            idAcademicYear: data.academicYear.id,
            idSemester: semester.id,
            value: `Semestre ${semester.value}`
          }))
        }

        closeModal()
      } else {
        showToast("Probleme lie a la creation d'une annee academique")
      }

    }
  }

  const verificationForm = () => {
    if (startYear) return true

    return false
  }

  const generateAcademicYearString = (date) => {
    let year = +date.getFullYear()

    return `${year}-${year + 1}`
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