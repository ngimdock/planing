import { Box } from "@mui/material"
import { Fragment, useState } from "react"
import Button from '../../../../components/utils/buttons/button'
import Select from '../../../../components/utils/inputs/select'
import LinearLoader from '../../../../components/utils/loaders/linearLoader'

// Initial state
const initialState = {
  subject: 0,
  teacher: 0,
  room: 0,
  speciality: 0,
  group: 1,
  time: 0
}

const ProgramForm = ({ onClose }) => {
  // Set local state
  const [program, setProgram] = useState(initialState)
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChange = (field, value) => {
    const programPrevState = {...program}

    switch (field) {
      case "subject": {
        programPrevState.subject = value
        break
      }

      case "teacher": {
        programPrevState.teacher = value
        break
      }

      case "room": {
        programPrevState.room = value
        break
      }
      
      case "speciality": {
        programPrevState.speciality = value
        break
      }

      case "group": {
        programPrevState.group = value
        break
      }

      case "time": {
        programPrevState.time = value
        break
      }

      default: // nothing
        break
    }

    setProgram(programPrevState)
  }

  const handleSubmitForm = () => {
    if (!loading) {
      setLoading(true)
      console.log("You can send request here")
    }
  }

  const verificationForm = () => {
    const {
      subject,
      teacher,
      room,
      group,
      time
    } = program

    if (
      subject &&
      teacher &&
      room &&
      group &&
      time
    ) {
      return true
    }

    return false
  }

  return (
    <Fragment>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "calc(100% - 16px)",
          display: "flex",
          flexDirection: "column",
          p: 1,
          backgroundColor: "#fff",
          overflowY: "auto",
          scrollbarWidth: 'thin'
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Select 
            disabled={loading}
            label="cours"
            rounded
            fontSize={14}
            options={[
              { value: 1, label: "MATH 122" }
            ]}
            onGetValue={value => handleChange("subject", value)}
            value={program.subject}
          />
          <Select 
            disabled={loading}
            label="enseignant"
            rounded
            fontSize={14}
            options={[
              { value: 1, label: "DILANE3" }
            ]}
            onGetValue={value => handleChange("teacher", value)}
            value={program.teacher}
          />
          <Select 
            disabled={loading}
            label="salle"
            rounded
            fontSize={14}
            options={[
              { value: 1, label: "A502" }
            ]}
            onGetValue={value => handleChange("room", value)}
            value={program.room}
          />
          <Select 
            disabled={loading}
            label="groupe"
            rounded
            fontSize={14}
            options={[
              { value: 1, label: "Group1" }
            ]}
            onGetValue={value => handleChange("group", value)}
            value={program.group}
          />
          <Select 
            disabled={loading}
            label="specialite"
            rounded
            fontSize={14}
            options={[
              { value: 1, label: "Reseau" }
            ]}
            onGetValue={value => handleChange("speciality", value)}
            value={program.speciality}
          />
          <Select 
            disabled={loading}
            label="duree"
            rounded
            fontSize={14}
            options={[
              { value: 1, label: "3H" }
            ]}
            onGetValue={value => handleChange("time", value)}
            value={program.time}
          />
        </Box>

        <Box 
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            "& button:first-child": {
              mr: 1
            }
          }}
        >
          <Button 
            text="Annuler"
            variant="outlined"
            bgColor="#ff8500"
            fontSize={10}
            size="auto"
            rounded
            onClick={onClose}
          />
          <Button 
            disabled={!verificationForm() || loading}
            text="Sauver"
            fontSize={10}
            size="auto"
            rounded
            onClick={handleSubmitForm}
          />
        </Box>

      </Box>

      {
        loading && <LinearLoader rounded={false} />
      }
    </Fragment>
  )
}

export default ProgramForm