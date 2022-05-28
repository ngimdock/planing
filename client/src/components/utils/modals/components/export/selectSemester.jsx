import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material"
import { useContext } from "react"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import Button from "../../../buttons/button"
import styles from '../../css/modalContent.module.css'
import AccordionItem from '../../../../../pages/program/components/AccordionItem';
import PlanningContext from '../../../../../datamanager/contexts/planningContext';
import { ExportContext } from '../../../../../datamanager/contexts/exportContext';
import ExportBaseLayout from '../../../../../pages/exports/base'

const SelectSemesterModalContent = () => {
  // Get data from global state
  const { closeModal, currentModalData } = useContext(ModalContext)
  const { programs } = useContext(PlanningContext)
  const {
    exportRef,
    handlePrintByRoom,
    handlePrintByFaculty,
    handlePrintByTeacher,
  } = useContext(ExportContext)

  // Set local state
  const [academicYear, setAcademicYear] = useState(null) // This state contains data about semester and the academic year

  // UseEffect section
  useEffect(() => {
    if (academicYear) {
      handlePrintProgram()
    }
  }, [academicYear])

  // Some handlers
  const handleChange = (value) => {
    const newValue = {
      idAcademicYear: value.idAcay,
      idSemester: value.idSemester
    }

    setAcademicYear(newValue)

    closeModal()
  }

  const handlePrintProgram = () => {
    // You can use this data to do what you want
    console.log(currentModalData.data)

    if (currentModalData.type === "faculty") {
      handlePrintByFaculty()
    } else if (currentModalData.type === "room") {
      handlePrintByRoom()
    } else if (currentModalData.type === "teacher") {
      handlePrintByTeacher()
    }
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

      <div style={{ display: "none" }}><ExportBaseLayout ref={exportRef} /></div>
    </section>
  )
}

export default SelectSemesterModalContent