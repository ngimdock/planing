import React, { useContext } from "react"
import { BsBarChartFill, BsBookFill, BsDoorOpenFill, BsFillPersonFill, BsPeopleFill } from 'react-icons/bs'
import { MdSchool } from 'react-icons/md'
import { HiUserGroup } from 'react-icons/hi'
import styles from "../css/dashboard.module.css"
import DashboardItem from "./dashboardItem"
import FacultyContext from "../../../datamanager/contexts/facultyContext"
import LevelContext from "../../../datamanager/contexts/levelContext"
import ClassContext from "../../../datamanager/contexts/classContext"
import SpecialityContext from "../../../datamanager/contexts/specialityContext"
import RoomContext from "../../../datamanager/contexts/roomContext"
import SubjectContext from "../../../datamanager/contexts/subjectContext"
import TeacherContext from "../../../datamanager/contexts/teacherContext"

const DashboardBody = () => {
  // Get data from global state
  const { faculties } = useContext(FacultyContext)
  const { levels } = useContext(LevelContext)
  const { classes } = useContext(ClassContext)
  const { specialities } = useContext(SpecialityContext)
  const { rooms } = useContext(RoomContext)
  const { teachers } = useContext(TeacherContext)
  const { subjects } = useContext(SubjectContext)

  return (
    <section className={styles.container}>
      <div className={styles.dashboardTitle}> Statistiques Générales</div>

      <div className={styles.dashboardContent}>
        <DashboardItem
          title="Filières"
          value={faculties.length}
          color="#3e4bff"
        >
          <MdSchool
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Niveaux"
          value={levels.length}
          color="orange"
        >
          <BsBarChartFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Classes"
          value={classes.length}
          color="#41d813"
        >
          <HiUserGroup 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Spécialités"
          value={specialities.length}
          color="#f32f39"
        >
          <HiUserGroup 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Cours"
          value={subjects.length}
          color="#2f97a5"
        >
          <BsBookFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Enseignants"
          value={teachers.length}
          color="violet"
        >
          <BsPeopleFill 
            size={25}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Salles"
          value={rooms.length}
          color="#92dffde8"
        >
          <BsDoorOpenFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Admins"
          value={1}
          color="#05502d"
        >
          <BsFillPersonFill 
            size={20}
            color={"#fff"}
          />     
        </DashboardItem>
      </div>
    </section>
  )
}

export default DashboardBody