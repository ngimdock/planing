import React, { useEffect } from 'react';
import { Box } from "@mui/material"
import { useContext } from "react"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import Button from "../../../buttons/button"
import styles from '../../css/modalContent.module.css'
import AccordionItem from '../../../../../pages/program/components/AccordionItem';
import PlanningContext from '../../../../../datamanager/contexts/planningContext';
import { ExportContext } from '../../../../../datamanager/contexts/exportContext';
import ExportBaseLayout from '../../../../../pages/exports/base'
import ToastContext from '../../../../../datamanager/contexts/toastContext';

const SelectSemesterModalContent = () => {
  // Get data from global state
  const { closeModal, currentModalData } = useContext(ModalContext)
  const { programs } = useContext(PlanningContext)
  const { showToast } = useContext(ToastContext)
  const {
    exportRef,
    setExportName,
    handlePrintByRoom,
    handlePrintByFaculty,
    handlePrintByTeacher,
    setPrograms,
    readyToExport,
    setReadyToExport,
    handleChargeTheExportComponent
  } = useContext(ExportContext)

  console.log(programs)

  useEffect(() => {
    if (readyToExport) {
      handlePrintProgram()
      setReadyToExport(false)
    }
  }, [readyToExport])

  // Some handlers
  const handleChange = async(value) => {
    const newValue = {
      ...value,
      idAcademicYear: value.idAcay,
      idAcay: undefined
    }

    console.log(newValue);
    setExportName(currentModalData.data.name)
    await handleSetCurrentExportData(newValue)
    closeModal()
  }
  
  const handleSetCurrentExportData = async(newValue) => {
    const {newProgram, hasProgram } = await handleChargeTheExportComponent(currentModalData.type, { objectData: currentModalData.data, academicYear: newValue })
    if(hasProgram) {
      setPrograms(newProgram)
      setReadyToExport(hasProgram)
    } else {
      showToast("A program has not yet been defined", "error")
      setReadyToExport(hasProgram)
    }
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