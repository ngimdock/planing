import React, {useState, useContext} from 'react'
import { FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from "../css/subjetStyle.module.css"
import SubjectAPI from "../../../api/subject"
import ToastContext from "../../../datamanager/contexts/toastContext"
import ModalContext from '../../../datamanager/contexts/modalContext'
import SubjectContext from '../../../datamanager/contexts/subjectContext'
import LoaderCircle from '../../../components/utils/loaders/loaderCircle';

const SubjectItem = ({ id, title, value, color }) => {

  // get global state
  const { showToast } = useContext(ToastContext)
  const { openModal, closeModal } = useContext(ModalContext)
  const { removeSubject, selectSubject } = useContext(SubjectContext)

  // set local state
  const [loading, setLoading] = useState(false)

  // some handle
  const handleDeleteSubject = async (codeSubject) => {

    console.log(codeSubject);

    if(!codeSubject) return;

    if(loading) return;

    setLoading(true)

    //delete the subject
    const { data, error } = await SubjectAPI.deleteSubject(codeSubject)
    setLoading(false)

    console.log(data)

    if(data){
      console.log(codeSubject);
      console.log( typeof codeSubject);
      removeSubject(codeSubject) // remove subject in globale state
      showToast(data)
    }else{
       showToast("Could not delete the Course", "error")
    }

  }

  const handleSelectSubject = async (codeSubject) => {

    //store the selected subject in global state
    selectSubject(codeSubject)

    // Open the update modal
    openModal("Update Subject", "UPDATE_SUBJECT")
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
          onClick={() => handleSelectSubject(id)}
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