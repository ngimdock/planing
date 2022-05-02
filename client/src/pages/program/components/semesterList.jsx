import { Typography, Box } from '@mui/material';
import React from 'react';
import AccordionItem from './AccordionItem'
import Button from '../../../components/utils/buttons/button'
import { BsFillPlusCircleFill } from 'react-icons/bs';

const SemesterList = () => {
  // Data for tests
  const semesters = [
    {
      headerTitle: "Annee academique 2021-2022",
      semesters: [
        {
          id: 1,
          value: "Semestre 1"
        },
        {
          id: 2,
          value: "Semestre 2"
        }
      ]
    },
    {
      headerTitle: "Annee academique 2022-2023",
      semesters: [
        {
          id: 3,
          value: "Semestre 1"
        },
        {
          id: 4,
          value: "Semestre 2"
        }
      ]
    }
  ]

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
        >
          <BsFillPlusCircleFill 
            size={15}
            color="#ff8500"
          />
        </Button>
      </Box>

      <Box>
        {
          semesters.map((item, index) => {
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