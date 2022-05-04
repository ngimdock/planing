import { Box } from '@mui/material';
import React from 'react';
import Table from './subComponents/table';

const ClassTable = () => {

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
          overflowX: "auto"
        }}
      >
        <Table />
      </Box>
    </Box>
  );
}

export default ClassTable