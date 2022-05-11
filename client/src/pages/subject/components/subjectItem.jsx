import React, {useState, useContext} from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/subjetStyle.module.css"
import SubjectAPI from "../../../api/subject"
import ToastContext from "../../../datamanager/contexts/toastContext"
import LoaderCircle from '../../../components/utils/loaders/loaderCircle';

const SubjectItem = ({ id, title, value, color }) => {

  // get global state
  const { showToast } = useContext(ToastContext)

  // set local state
  const [loading, setLoading] = useState(false)

  // some handle
  const handleDeleteSubject = async (idSubject) => {

    console.log(idSubject);
    if(!idSubject) return;

    if(loading) return;

    setLoading(true)

    //delete the subject
    const { data, error } = await SubjectAPI.deleteSubject(idSubject)
    setLoading(false)

    if(data){
      console.log(data);
      return showToast(data)
    }

    return showToast("An error occur")
  }
   
  return (
    <div className={styles.subjectItem}
      style={{
        backgroundColor: color
      }}  
    >
      <span className={styles.Description}> { title } </span>
      <span className={styles.number}> { value } </span>
      <div className={styles.levelIcon}>
        <FiEdit2
          size="18"
          color="#3b3e41"
        />
        < RiDeleteBin6Line
          size="18"
          color="#ff0000"
          onClick={() => handleDeleteSubject(id)}
        />
      </div>
      {
        loading && <LoaderCircle />
      }
    </div>
  )
}

export default SubjectItem;