import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography } from '@mui/material';
import { BiChevronUp } from 'react-icons/bi'
import ElementItem from './elementItem';


const AccordionItem = ({ headerTitle, data, target, type, idYear, onGetValue }) => {
  const [expanded, setExpanded] = useState(false);
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
        <Typography sx={{ width: 'max-content', flexShrink: 0, fontFamily: "Nunito-Bold", marginRight: '15px' }}>
          {headerTitle}
        </Typography>
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
                onGetValue={onGetValue ? onGetValue : (value) => { }}
              />
            )
          })
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem