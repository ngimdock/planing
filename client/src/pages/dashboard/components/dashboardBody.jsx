import { useContext } from "react"
import { BsBarChartFill, BsBookFill, BsDoorOpenFill, BsFillPersonFill, BsPeopleFill } from 'react-icons/bs'
import { MdSchool } from 'react-icons/md'
import { HiUserGroup } from 'react-icons/hi'
import ModalContext from "../../../datamanager/contexts/modalContext"
import styles from "../css/dashboard.module.css"
import DashboardItem from "./dashboardItem"

const DashboardBody = () => {
  const { openModal } = useContext(ModalContext)
  
  return (
    <section className={styles.container}>
      <div className={styles.dashboardTitle}> Statistiques Générales</div>

      <div className={styles.dashboardContent}>
        <DashboardItem
          title="Filières"
          value={8}
          color="#3e4bff"
        >
          <MdSchool
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Niveaux"
          value={6}
          color="orange"
        >
          <BsBarChartFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Classes"
          value={8}
          color="#41d813"
        >
          <HiUserGroup 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Spécialités"
          value={32}
          color="#f32f39"
        >
          <HiUserGroup 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Cours"
          value={124}
          color="#2f97a5"
        >
          <BsBookFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Enseignants"
          value={34}
          color="violet"
        >
          <BsPeopleFill 
            size={25}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Salles"
          value={24}
          color="#92dffde8"
        >
          <BsDoorOpenFill 
            size={20}
            color={"#fff"}
          />
        </DashboardItem>
        <DashboardItem
          title="Admins"
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