import React, { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from './css/modalCore.module.css'
import ModalContext from '../../../datamanager/contexts/modalContext';
import AddFacultyModalContent from './components/addFaculty';
import AddLevelModalContent from './components/addLevel';
import AddClassModalContent from './components/addClass';
import AddSpecialityModalContent from './components/addSpeciality';
import AddSubjectModalContent from './components/addSubject';
import AddTeacherModalContent from './components/addTeacher';
import AddRoomModalContent from './components/addRoom';
import AddAdminModalContent from './components/addAdmin'
import AddAcademicYearModalContent from './components/addAcademicYear';
import UpdateSpecialityModalContent from './components/update/updateSpeciality';
import UpdateLevelModalContent from './components/update/updateLevel';
import UpdateTeacherModalContent from './components/update/updateTeacher';
import UpdateSubjectModalContent from './components/update/updateSubject';
import UpdateFacultyModelContent from './components/update/updateFaculty';
import UpdateRoomModalContent from './components/update/updateRoom';
import SelectSemesterModalContent from './components/export/selectSemester'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 200,
  maxHeight: 500,
  height: 'auto',
  bgcolor: '#fff',
  boxShadow: 35,
  borderRadius: 2,
  overflowX: 'hidden',
  overflowY: "auto"
};

const ModalCoreContainer = ({ open, title, closeModal }) => {
  // Get global state
  const { currentModalCode } = useContext(ModalContext)

  // Some handlers
  const generateModalContent = () => {
    switch (currentModalCode.toUpperCase()) {
      case "ADD_FACULTY": {
        return <AddFacultyModalContent />
      }

      case "ADD_LEVEL": {
        return <AddLevelModalContent />
      }

      case "ADD_CLASS": {
        return <AddClassModalContent />
      }

      case "ADD_SPECIALITY": {
        return <AddSpecialityModalContent />
      }

      case "ADD_SUBJECT": {
        return <AddSubjectModalContent />
      }

      case "ADD_TEACHER": {
        return <AddTeacherModalContent />
      }

      case "ADD_ROOM": {
        return <AddRoomModalContent />
      }

      case "ADD_ADMIN": {
        return <AddAdminModalContent />
      }

      case "ADD_ACADEMIC_YEAR": {
        return <AddAcademicYearModalContent />
      }

      case "UPDATE_SPECIALITY": {
        return <UpdateSpecialityModalContent />
      }

      case "UPDATE_LEVEL": {
        return <UpdateLevelModalContent />
      }

      case "UPDATE_ROOM": {
        return <UpdateRoomModalContent />
      }

      case "UPDATE_TEACHER": {
        return <UpdateTeacherModalContent />
      }

      case "UPDATE_SUBJECT": {
        return <UpdateSubjectModalContent />
      }

      case "UPDATE_FACULTY": {
        return <UpdateFacultyModelContent />
      }

      case "EXPORT_PROGRAM": {
        return <SelectSemesterModalContent />
      }

      default: return null
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <header className={styles.modalCoreHeader}>
              <span className={styles.modalCoreHeaderText}>{title.toUpperCase()}</span>
            </header>

            <Box sx={{
              padding: 2
            }}>
              {generateModalContent()}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalCoreContainer