import { Box, Popover, Typography } from "@mui/material"
import { useCallback, useContext } from "react"
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import CurrentUserContext from "../../../datamanager/contexts/currentUserContext"
import PlanningContext from "../../../datamanager/contexts/planningContext"
import { formatTimeToString, getDayIdFromString } from "../../../utils/format"
import ProgramAPI from '../../../api/program'
import PlanningAction from '../../../datamanager/actions/planning'
import ToastContext from "../../../datamanager/contexts/toastContext"
import ClassContext from "../../../datamanager/contexts/classContext"

const PopOverContent = ({ title, value, description }) => {
  return (
    <Box
      sx={{
        width: "calc(50% - 16px)",
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "Nunito-Bold",
          color: "#ff8500"
        }}
      >{title}</Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "Nunito-Bold"
        }}
      >{value}</Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontFamily: "Nunito-Bold",
          color: "#555"
        }}
      >( {description} )</Typography>
    </Box>
  )
}

const PopOver = ({ open, data, onClose, anchorEl }) => {
  // Get data from global state
  const { currentUser } = useContext(CurrentUserContext)
  const { currentSemester, currentClass, dispatch } = useContext(PlanningContext)
  const { showToast } = useContext(ToastContext)
  const { getClass: getUniqueClass } = useContext(ClassContext)

  // Some handlers
  const handleDeleteProgram = async () => {
    const payload = {
      codeCours: data.subjectCode,
      idSalle: data.roomId,
      idJour: getDayIdFromString(data.day),
      matriculeEns: data.teacherMatricule,
      idSemestre: currentSemester.idSemester,
      heureDebut: formatTimeToString(data.startHour),
      idGroupe: data.groupId
    }

    const { data: res, error } = await ProgramAPI.delete(payload)

    if (res) {
      await handleGetProgramsByClass()
    } else {
      showToast(`Le programme n'a pas pu etre supprimé`, "error")
    }
  }

  // Get programs filtered by class based on the code class
  const handleGetProgramsByClass = async () => {
    const { data } = await ProgramAPI.getByClass({
      idYear: currentSemester.idYear,
      idSemester: currentSemester.idSemester,
      codeClass: currentClass.getCode
    })

    console.log(data)

    if (data !== undefined) {
      // When all is OK we update the program of the current class
      if (data) {
        dispatch(PlanningAction.addClass(currentSemester.idYear, currentSemester.idSemester, data))

        console.log({ data })
        showToast(`Le programme a été supprimé avec succes`)
      } else {
        const myClass = getUniqueClass(currentClass.getCode)

        console.log({ myClass })

        dispatch(PlanningAction.addClass(currentSemester.idYear, currentSemester.idSemester, myClass))
      }
    } else {
      showToast(`Le programme de ${currentClass.getCode} n'a pas pu etre chargee correctement`, "error")
    }
  }

  const reformatTime = useCallback(() => {
    let {
      startHour: start,
      endHour: end
    } = data

    start /= 60
    end /= 60

    let startHour = 0
    let startMinutes = 0
    let endHour = 0
    let endMinutes = 0

    // Work on start hour
    while (start >= 60) {
      startHour += 1
      start -= 60
    }

    startMinutes = start

    // Work on end hour
    while (end >= 60) {
      endHour += 1
      end -= 60
    }

    endMinutes = end

    return `${startHour}h${startMinutes ? ":" + startMinutes : ""} - ${endHour}h:${endMinutes}`
  }, [data])

  const getDuration = useCallback(() => {
    let {
      startHour: start,
      endHour: end
    } = data

    start /= 3600
    end /= 3600

    const diffTime = end - start

    if (diffTime <= 1) return 1
    else if (diffTime <= 2) return 2

    return 3
  }, [data])

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      elevation={2}
    >
      <Box
        sx={{
          width: "250px",
          p: 1,
          backgroundColor: "#3e4bff",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontFamily: "Nunito-Bold",
              color: "#fff"
            }}
          >{data.subjectCode.toUpperCase()}</Typography>

          <Box
            sx={{
              width: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <BsPencilFill
              size={15}
              color="#fff"
            />
            <BsFillTrashFill
              size={15}
              color="#fff"
              onClick={handleDeleteProgram}
            />
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            fontFamily: "Nunito-Bold",
            color: "#f8f8f8"
          }}
        >
          ( {data.teacherName.toUpperCase()} )
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <PopOverContent
          title="Salle"
          value={data.roomName.toUpperCase()}
          description={`${data.roomCapacity} Places`}
        />
        <PopOverContent
          title="Horaire"
          value={reformatTime()}
          description={`${getDuration()}H`}
        />
      </Box>
    </Popover>
  )
}

export default PopOver