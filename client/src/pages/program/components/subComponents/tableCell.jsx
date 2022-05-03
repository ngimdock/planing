import React, { useState, useMemo } from 'react'
import { Box } from "@mui/material"
import { BsFillPlusCircleFill } from "react-icons/bs"
import Button from '../../../../components/utils/buttons/button'
import ProgramItem from './programItem'
import ProgramForm from './programForm'

const TableCellContent = () => {
  // Set local state
  const [addBtnShown, setAddBtnShown] = useState(false)
  const [formOpened, setFormOpened] = useState(false)

  // Some handlers
  const handleShowBtn = (val) => {
    setAddBtnShown(val)
  } 

  const handleOpenForm = () => {
    setFormOpened(prev => !prev)
  }

  const generateAddBtn = useMemo(() => {
    if (addBtnShown) {
      return (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 'calc(100% - 16px)',
            p: 1,
            transition: "all .4s"
          }}
        >
          <Button
            text="Programmer"
            variant="outlined"
            bgColor="#ff8500"
            rounded
            fontSize={10}
            size="auto"
            onClick={handleOpenForm}
          >
            <BsFillPlusCircleFill 
              size={15}
              color="#ff8500"
            />
          </Button>
        </Box>
      )
    }

    return null
  }, [addBtnShown])

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: formOpened ? 200 : 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        transition: "all .4s",
      }}
      onMouseEnter={() => handleShowBtn(true)}
      onMouseLeave={() => handleShowBtn(false)}
    >
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '50px',
          width: "100%",
          height: "100%"
        }}
      >
        <ProgramItem />
      </Box>

      {
        generateAddBtn
      }

      {
        formOpened && <ProgramForm onClose={handleOpenForm} />
      }
      
    </Box>
  ) 
}

export default TableCellContent