import React, { useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {Typography, Box} from '@mui/material';
import { BiChevronUp } from 'react-icons/bi'
import ElementItem from './elementItem';
import { MdOutlineFileUpload } from 'react-icons/md'
import { ExportContext } from '../../../datamanager/contexts/exportContext';


const AccordionItem = ({ headerTitle, data, target, type, idYear }) => {
  const [expanded, setExpanded] = useState(false);
  const { handlePrint } = useContext(ExportContext)
  const handleChange = (event) => {
    setExpanded(prev => !prev);
  }

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={
          <BiChevronUp 
            size={25}
            color="#fff"
          />
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          backgroundColor: "#3e4bff",
          color: "#fff"
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "95%",
            justifyContent: "space-between"
          }}
        >
          <Typography sx={{ width: 'max-content', flexShrink: 0, fontFamily: "Nunito-Bold", marginRight: '15px' }}>
            { headerTitle }
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
              onClick={handlePrint}
            >
              Exporter
            </Typography>
          </Box> 
        </Box>

      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {
          data?.map(item => {
            return (
              <ElementItem 
                key={item.id}
                value={type === "semester" ? item.value : item.getCode}
                idSemester={type === "semester" && item.id}
                year={{
                  id: idYear,
                  value: headerTitle
                }}
                target={target}
              />
            )
          })
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem