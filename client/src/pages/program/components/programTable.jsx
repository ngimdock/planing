import { Typography, Box } from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { MdOutlineFileUpload } from 'react-icons/md'
import PlanningContext from '../../../datamanager/contexts/planningContext';
import PlanningNavigationContext from '../../../datamanager/contexts/planningNavigationContext';
import Table from './subComponents/table';
import { ExportContext } from '../../../datamanager/contexts/exportContext';
import ExportBaseLayout from '../../exports/base';

const ProgramTable = () => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)
  const { currentClass } = useContext(PlanningContext)
  const { exportRef, handlePrintByClass } = useContext(ExportContext)

  useEffect(() => {
    console.log("Updated in UseEffect")
  }, [currentClass])
  
  const myClass = useMemo(() => {
    console.log("Updated")
    
    return currentClass
  }, [currentClass])
  
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
          {myClass && `${myClass.getName} (${myClass.getCapacity} Etudiants)`}
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
            onClick={handlePrintByClass}
          >
          <div style={{ display: "none" }}><ExportBaseLayout ref={exportRef} /></div>
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