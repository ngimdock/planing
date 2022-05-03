import { Typography, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AccordionItem from './AccordionItem'
import Button from '../../../components/utils/buttons/button'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import ModalContext from '../../../datamanager/contexts/modalContext';
import ToastContext from '../../../datamanager/contexts/toastContext';
import AcademicYearAPI from '../../../api/academicYear';

const SemesterList = () => {
  // Get data from global state
  const { openModal } = useContext(ModalContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [semestersList, setSemestersList] = useState([])

  // UseEffect section
  useEffect(() => {
    handleGetAcademicYears()
  }, [])

  // Some handlers
  const handleGetAcademicYears = async () => {
    const { data, error } = await AcademicYearAPI.getAll()

    if (data) {
      console.log(data)

      const academicYears = []

      data.forEach(acaY => {
        // Initialization of an academic year data
        const academicYear = {
          id: acaY.idAnneeAca,
          headerTitle: "Annee academique " + acaY.valAnneeAca,
          semesters: []
        }

        const semesters = []

        acaY.semestres.forEach((semester) => {
          // Initialization of a semester data
          const semesterValue = {
            id: semester.idSemestre,
            value: "Semestre " + semester.valSemestre
          }

          semesters.push(semesterValue)
        })

        academicYear.semesters = semesters

        academicYears.push(academicYear)
      })

      setSemestersList(academicYears)
    } else {
      showToast("Probleme de chargement de la liste des annees", "error")
    }
  }

  const handleOpenModal = () => {
    openModal("Ajouter Annee Academique", "ADD_ACADEMIC_YEAR")
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "calc(100% - 5px)",
        flexShrink: 0,
        marginRight: "5px",
        marginLeft: "2.5px"
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "#fff",
          border: "1px solid #eee",
          overflow: "hidden",
          borderRadius: "5px 5px 0 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Typography sx={{ fontFamily: "Nunito-Bold", fontSize: "18px" }}>
          Listes des Annees Academiques
        </Typography>

        <Button
          text="Ajouter une annee"
          rounded
          fontSize={12}
          bgColor="#ff8500"
          variant="outlined"
          onClick={handleOpenModal}
        >
          <BsFillPlusCircleFill 
            size={15}
            color="#ff8500"
          />
        </Button>
      </Box>

      <Box>
        {
          semestersList.map((item, index) => {
            return (
              <AccordionItem 
                key={index}
                headerTitle={item.headerTitle}
                data={item.semesters}
                target="classes"
              />
            )
          })
        }
      </Box>
    </Box>
  );
}

export default SemesterList