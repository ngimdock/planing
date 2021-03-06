import styles from "../css/dashboard.module.css"

const DashboardItem = ({ title, value, color, children }) => {
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