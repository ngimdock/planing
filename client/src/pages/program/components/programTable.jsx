import { Typography, Box } from '@mui/material';
import React, { useContext } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { MdOutlineFileUpload } from 'react-icons/md'
import PlanningContext from '../../../datamanager/contexts/planningContext';
import PlanningNavigationContext from '../../../datamanager/contexts/planningNavigationContext';
import Table from './subComponents/table';

const ProgramTable = () => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)
  const { currentClass: myClass } = useContext(PlanningContext)

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
          overflow: "hidden",
          borderRadius: "5px 5px 0 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#3e4bff"
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
          onClick={() => navigateTo("classes")}
        >
          <BsArrowLeft 
            color="#f8f8f8"
            size={20}
          />

          <Typography 
            sx={{ 
              fontFamily: "Nunito-Bold", 
              fontSize: "14px", 
              ml: 1,
              color: "#fff"
            }}
          >
            Retour
          </Typography>
        </Box>

        <Typography 
          sx={{ 
            fontFamily: "Nunito-Bold", 
            fontSize: "18px", 
            color: "#fff" 
          }}
        >
          { myClass && `${myClass.getName} (${myClass.getCapacity} Etudiants)` }
        </Typography>

        <Box 
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: 'pointer'
            }
          }}
        >
          <MdOutlineFileUpload 
            color="#f8f8f8"
            size={20}
          />

          <Typography 
            sx={{ 
              fontFamily: "Nunito-Bold", 
              fontSize: "14px", 
              ml: 1,
              color: "#fff"
            }}
          >
            Exporter
          </Typography>
        </Box>
      </Box>

      <Box 
        sx={{
          overflowX: "auto"
        }}
      >
        <Table />
      </Box>
    </Box>
  );
}

export default ProgramTable