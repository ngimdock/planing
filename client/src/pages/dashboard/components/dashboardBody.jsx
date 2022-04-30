import { useContext, useState } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import { BsBarChartFill, BsBookFill, BsDoorOpenFill, BsFillCalendarMinusFill, BsFillPersonFill, BsPeopleFill, BsX } from 'react-icons/bs'
import { MdDashboard, MdSchool } from 'react-icons/md'
import { HiUserGroup } from 'react-icons/hi'
import ModalContext from "../../../datamanager/contexts/modalContext"
import styles from "../css/dashboard.module.css"
import DashboardItem from "./dashboardItem"

const DashboardBody = () => {
  const { openModal } = useContext(ModalContext)
  
  return (
    <section className={styles.container}>
      <div className={styles.dashboardTitle}> Statistiques General</div>
      <div className={styles.dashboardContent}>
      <DashboardItem
          title="Filiere"
          value={8}
          color="#3e4bff"
        >
          <MdSchool
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Niveau"
          value={6}
          color="orange"
        >
          <BsBarChartFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Classe"
          value={8}
          color="#41d813"
        >
            <HiUserGroup 
              size={20}
              color={"#fff"}
            />
        </DashboardItem>
        <DashboardItem
          title="Specialite"
          value={32}
          color="#f32f39"
        >
            <HiUserGroup 
              size={20}
              color={"#fff"}
            />
        </DashboardItem>
        <DashboardItem
          title="Sujet"
          value={124}
          color="#2f97a5"
        >
          <BsBookFill 
              size={20}
              color={"#fff"}
            />
        </DashboardItem>
        <DashboardItem
          title="Enseignant"
          value={34}
          color="violet"
        >
          <BsPeopleFill 
            size={25}
            color={"#fff"}
            />
        </DashboardItem>
        <DashboardItem
          title="Salle"
          value={24}
          color="#92dffde8"
        >
           <BsDoorOpenFill 
              size={20}
              color={"#fff"}
            />
        </DashboardItem>
        <DashboardItem
          title="Admin"
          value={5}
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