import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material"
import { useContext } from "react"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import Button from "../../../buttons/button"
import styles from '../../css/modalContent.module.css'
import AccordionItem from '../../../../../pages/program/components/AccordionItem';
import PlanningContext from '../../../../../datamanager/contexts/planningContext';

const SelectSemesterModalContent = () => {
  // Get data from global state
  const { closeModal } = useContext(ModalContext)
  const { programs } = useContext(PlanningContext)

  // Set local state
  const [academicYear, setAcademicYear] = useState(null)

  // UseEffect section
  useEffect(() => {
    console.log("You can launch the printer here")
  }, [academicYear])

  // Some handlers
  const handleChange = (value) => {
    const newValue = {
      idAcademicYear: value.idAcay,
      idSemester: value.idSemester
    }

    console.log(value)

    setAcademicYear(newValue)
  }

  return (
    <section>
      <Box
        sx={{
          position: "relative",
          mb: 3
        }}
      >
        {
          programs.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                headerTitle={item.value}
                data={item.semesters}
                idYear={item.id}
                target="export"
                type="semester"
                onGetValue={(value) => handleChange(value)}
              />
            )
          })
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
      </Box>
    </section>
  )
}

export default SelectSemesterModalContent