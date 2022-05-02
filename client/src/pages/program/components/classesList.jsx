import { Typography, Box } from '@mui/material';
import React, { useContext } from 'react';
import AccordionItem from './AccordionItem'
import { BsArrowLeft } from 'react-icons/bs'
import PlanningNavigationContext from '../../../datamanager/contexts/planningNavigationContext';

const ClasseList = () => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)

  // Data for tests
  const programs = [
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
      </Box>

      <Box>
      {
          programs.map((item, index) => {
            return (
              <AccordionItem 
                key={index}
                headerTitle={item.headerTitle}
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