import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Box } from "@mui/material"
import { BsFillPlusCircleFill } from "react-icons/bs"
import Button from '../../../../components/utils/buttons/button'
import ProgramItem from './programItem'
import ProgramForm from './programForm'

const TableCellContent = ({ data }) => {
  // Set local state
  const [addBtnShown, setAddBtnShown] = useState(false)
  const [formOpened, setFormOpened] = useState(false)
  const [programs, setPrograms] = useState(data ? data.program : null)
  const [loaded, setLoaded] = useState(false)

  // Use effect section
  useEffect(() => {
    programs.forEach((prog, index) => {
      handleFormatTime({ 
        start: prog.startHour,
        end: prog.endHour,
        index
      })
    })
  }, [data])

  // Use callback section
  const generatePrograms = useCallback(() => {
    return programs.map((prog, index) => {
      console.log(prog)
      if (prog.startHour >= data.time.start && prog.endHour <= data.time.end) {
        console.log("k")
        return <ProgramItem key={index} program={prog} />
      }
    })
  }, [programs])


  // Some handlers
  const handleShowBtn = (val) => {
    setAddBtnShown(val)
  } 

  const handleOpenForm = () => {
    setFormOpened(prev => !prev)
  }

  const handleFormatTime = (payload) => {
    const {
      start,
      end,
      index
    } = payload

    const prevPrograms = [...programs]

    // Work with start hour here
    if (typeof start === "string") {
      const startTimeSplitted = start.split(":")
      const startHour = +startTimeSplitted[0] * 3600 // convert hour to second
      const startMinute = +startTimeSplitted[1] * 60 // convert minute to second
  
      // Work with end hour here
      const endTimeSplitted = end.split(":")
      const endHour = +endTimeSplitted[0] * 3600 // convert hour to second
      const endMinute = +endTimeSplitted[1] * 60 // convert minute to second
  
      // Update program time
      prevPrograms[index].startHour = startHour + startMinute
      prevPrograms[index].endHour = endHour + endMinute
  
    }
    
    setPrograms(prevPrograms)
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
        {
          programs && generatePrograms()
        }
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