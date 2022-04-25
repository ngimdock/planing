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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 200,
  height: 'auto',
  bgcolor: '#fff',
  boxShadow: 35,
  borderRadius: 2,
  overflow: 'hidden'
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

      default: return null
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <header className={styles.modalCoreHeader}>
              <span className={styles.modalCoreHeaderText}>{ title.toUpperCase() }</span>
            </header>

            <Box sx={{
              padding: 2
            }}>
              { generateModalContent() }
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalCoreContainer