import { Box } from "@mui/material"
import { Fragment, useContext, useState } from "react"
import Button from '../../../../components/utils/buttons/button'
import Select from '../../../../components/utils/inputs/select'
import LinearLoader from '../../../../components/utils/loaders/linearLoader'
import RoomContext from "../../../../datamanager/contexts/roomContext"
import TeacherContext from "../../../../datamanager/contexts/teacherContext"
import SubjectContext from "../../../../datamanager/contexts/subjectContext"
import { formatName } from "../../../../utils/format"
import PlanningContext from "../../../../datamanager/contexts/planningContext"

// Initial state
const initialState = {
  subject: 0,
  teacher: 0,
  room: 0,
  class: "",
  speciality: null,
  group: 1,
  start: 7 * 3600, // 7H en secondes
  duration: 3
}

const StartTime = [
  { id: 1, value: 7 * 3600, label: "7H" },
  { id: 2, value: 8 * 3600, label: "8H" },
  { id: 3, value: 9 * 3600, label: "9H" },
  { id: 4, value: 10 * 3600, label: "10H" },
  { id: 5, value: 11 * 3600, label: "11H" },
  { id: 6, value: 12 * 3600, label: "12H" },
  { id: 7, value: 13 * 3600, label: "13H" },
  { id: 8, value: 14 * 3600, label: "14H" },
  { id: 9, value: 15 * 3600, label: "15H" },
  { id: 10, value: 16 * 3600, label: "16H" },
  { id: 12, value: 17 * 3600, label: "17H" },
  { id: 13, value: 18 * 3600, label: "18H" }
]

const ProgramForm = ({ onClose, start }) => {
  // Global state
  const { rooms } = useContext(RoomContext)
  const { teachers } = useContext(TeacherContext)
  const { subjects } = useContext(SubjectContext)
  const { currentClass } = useContext(PlanningContext)

  // Set local state
  const [program, setProgram] = useState({ ...initialState, class: currentClass.getCode, start })
  const [groups, setGroups] = useState(currentClass.getGroups)
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

        const speciality = currentClass.specialities.find(spec => +spec.id === +value)

        setGroups(speciality.groups)
        break
      }

      case "group": {
        programPrevState.group = value
        break
      }

      case "duration": {
        programPrevState.duration = value
        break
      }

      case "startHour": {
        programPrevState.start = value
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

  // Filters

  const filterRoomByCapacity = (rooms) => {
    const classCapacity = currentClass.capacity
    const acceptableCapacity = classCapacity - classCapacity * .2 

    console.log(acceptableCapacity)

    return rooms.filter(room => +room.getCapacity >= +acceptableCapacity)
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
              ...subjects.map(sub => ({ value: sub.getCode, label: sub.getDescription }))
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
              ...teachers.map(tea => ({ value: tea.getMatricule, label: formatName(tea.getName) }))
            ]}
            onGetValue={value => handleChange("teacher", value)}
            value={program.teacher}
          />
          <Select 
            disabled={loading}
            label="heure de debut"
            rounded
            fontSize={14}
            options={
              StartTime.filter(time => (Number(time.value) >= Number(start) && Number(time.value) <= Number(start + (1 * 3600))))
            }
            onGetValue={value => handleChange("startHour", value)}
            value={program.start}
          />
          <Select 
            disabled={loading}
            label="duree"
            rounded
            fontSize={14}
            options={[
              { value: 2, label: "2H" },
              { value: 3, label: "3H" }
            ]}
            onGetValue={value => handleChange("duration", value)}
            value={program.duration}
          />
          <Select 
            disabled={loading}
            label="salle"
            rounded
            fontSize={14}
            options={[
              ...filterRoomByCapacity(rooms).map(room => ({ value: room.getId, label: `${room.getName} (${room.getCapacity} places)` }))
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
              ...groups.map(group => ({ value: group.getId, label: `${program.speciality ? "spec -" : ""} ${group.getName} (${group.getCapacity}places)` }))
            ]}
            onGetValue={value => handleChange("group", value)}
            value={program.group}
          />
          {
            currentClass.specialities.length > 0 && (
              <Select 
                disabled={loading}
                label="specialite"
                rounded
                fontSize={14}
                options={[
                  ...currentClass.specialities?.map(spec => ({ value: spec.getId, label: formatName(spec.getName) }))
                ]}
                onGetValue={value => handleChange("speciality", value)}
                value={program.speciality}
              />
            )
          }
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