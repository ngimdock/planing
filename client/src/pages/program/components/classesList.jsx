import { Typography, Box } from '@mui/material';
import React, { useCallback, useContext, useEffect } from 'react';
import AccordionItem from './AccordionItem'
import { BsArrowLeft } from 'react-icons/bs'
import PlanningNavigationContext from '../../../datamanager/contexts/planningNavigationContext';
import PlanningContext from '../../../datamanager/contexts/planningContext';
import ClassContext from '../../../datamanager/contexts/classContext';
import PlanningAction from '../../../datamanager/actions/planning';

const ClasseList = () => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)
  const { programs, currentSemester, selectClass, loaded, dispatch } = useContext(PlanningContext)
  const { classes } = useContext(ClassContext)

  // Use effect section
  useEffect(() => {
    if (loaded)
      formatClassesByFaculties(classes)
  }, [classes, loaded])

  // Some handlers
  const formatClassesByFaculties = useCallback((classes) => {
    const faculties = []

    // Find function
    const getPositionOfFaculty = (id) => {
      const index = faculties.findIndex(fac => Number(fac.id) === Number(id))

      if (index > -1) {
        return index
      }

      return undefined
    }

    for (let myClass of classes) {
      const facIndex = getPositionOfFaculty(myClass.getFaculty.getId)

      if (facIndex !== undefined) {
        faculties[facIndex].classes.push(myClass)
      } else {
        const faculty = {
          id: myClass.getFaculty.getId,
          value: myClass.getFaculty.getName,
          classes: [myClass]
        }

        faculties.push(faculty)
      }
    }

    // Save class list in the global state
    dispatch(PlanningAction.addFaculties({ faculties }))
  }, [classes])

  /**
   * Get faculties
   * @param {number} idAcademicYear 
   * @param {number} idSemester 
   * @returns Array
   */
  const getFaculties = (idAcademicYear, idSemester) => {
    console.log({ idAcademicYear, idSemester })
    if (idAcademicYear && idSemester) {
      // Get index of academic year
      const acaYIndex = programs.findIndex(acaY => Number(acaY.id) === Number(idAcademicYear))

      if (acaYIndex > -1) {
        // Get index of semester
        const semesterIndex = programs[acaYIndex].semesters.findIndex(semester => Number(semester.id) === Number(idSemester))
      
        if (semesterIndex > -1) {
          return programs[acaYIndex].semesters[semesterIndex].faculties
        }
      }
    }

    return []
  }

  // Data for tests
  const programsT = [
    {
      headerTitle: "Informatique",
      classes: [
        {
          id: 1,
          value: "Info Licence 1"
        },
        {
          id: 2,
          value: "Info Licence 2"
        },
        {
          id: 3,
          value: "Info Licence 3"
        }
      ]
    },
    {
      headerTitle: "Physique",
      classes: [
        {
          id: 1,
          value: "Physique Licence 1"
        },
        {
          id: 2,
          value: "Physique Licence 2"
        },
        {
          id: 3,
          value: "Physique Licence 3"
        }
      ]
    }
  ]

  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "calc(100% - 8px)",
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
          alignItems: 'center'
        }}
      >
        <Box 
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mr: 4,
            "&:hover": {
              cursor: 'pointer'
            }
          }}
          onClick={() => navigateTo("semesters")}
        >
          <BsArrowLeft 
            color="#555"
            size={20}
          />

          <Typography sx={{ fontFamily: "Nunito-Bold", fontSize: "14px", ml: 1 }}>
            Retour
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: "Nunito-Bold", fontSize: "18px" }}>
          Listes des programmes
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#aaa",
            fontFamily: "Nunito-Regular",
            display: "flex",
            alignSelf: "center",
            marginLeft: "auto"
          }}
        >
          { currentSemester.value }
        </Typography>
      </Box>

      <Box>
      {
          getFaculties(currentSemester.idYear, currentSemester.idSemester).map((item) => {
            return (
              <AccordionItem 
                key={item.id}
                headerTitle={item.value}
                data={item.classes}
                target="programs"
              />
            )
          })
        }
      </Box>
    </Box>
  );
}

export default ClasseList