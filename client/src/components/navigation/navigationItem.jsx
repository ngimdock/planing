import { useContext } from "react"
import { Link } from "react-router-dom"
import styles from '../../css/base.module.css'
import NavigationContext from "../../datamanager/contexts/navigationContext"

const NavigationItem = ({ children, title, link }) => {
  // Get data from the global state
  const { currentPage } = useContext(NavigationContext)

  return (
    <Link 
      to={link} 
      className={`
        ${styles.navigationItem} 
        ${link === '/' + currentPage ? styles.navigationItemActive : ""}
      `}
    >
      {
        children
      }

      <span className={`
        ${styles.navigationItemText}
        ${link === '/' + currentPage ? styles.navigationItemTextActive : ""}
      `}>{ title }</span>
    </Link>
  )
}

export default NavigationItem