import { useContext, useState } from "react"
import AddButton from "../../../components/utils/buttons/addButton"
import { BsBarChartFill, BsBookFill, BsDoorOpenFill, BsFillCalendarMinusFill, BsFillPersonFill, BsPeopleFill, BsX } from 'react-icons/bs'
import { MdDashboard, MdSchool } from 'react-icons/md'
import { HiUserGroup } from 'react-icons/hi'
import ModalContext from "../../../datamanager/contexts/modalContext"
import styles from "../css/dashboard.module.css"

const DashboardItem = ({ title, value, color, children }) => {
    const { openModal } = useContext(ModalContext)
    
    return (
        <div className={styles.dashboardItem}>
          <div className={styles.dahsIcon}
            style={{
              backgroundColor: color
            }}  
          >
            { children }
          </div>
          <div className={styles.dashfaculties}>
            <span className={styles.Description}> { title } </span>
            <span className={styles.number}> { value } </span>
          </div>
        </div>
  )
}

export default DashboardItem;