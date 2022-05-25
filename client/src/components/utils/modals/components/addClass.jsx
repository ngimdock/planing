import React, { useContext, useReducer,useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import classStyles from '../css/classModalContent.module.css'
import ModalContext from "../../../../datamanager/contexts/modalContext"
import LevelContext from "../../../../datamanager/contexts/levelContext"
import FacultyContext from "../../../../datamanager/contexts/facultyContext"
import Select from "../../inputs/select"
import { BsFillPlusCircleFill } from 'react-icons/bs'
import reducer, { initialState } from '../reducers/classReducer'
import GroupItem from "./subComponents/groupItem"
import SpecialityItem from './subComponents/specialityItem'
import ClassAPI from '../../../../api/class/index';
import LinearLoader from "../../loaders/linearLoader"
import ClassContext from "../../../../datamanager/contexts/classContext"
import ToastContext from '../../../../datamanager/contexts/toastContext'

const AddClassModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { faculties, getFaculty } = useContext(FacultyContext)
  const { levels, getLevel } = useContext(LevelContext)
  const { addClass } = useContext(ClassContext)
  const { showToast } = useContext(ToastContext)
  const [loading, setLoading] = useState(false)

  // Set local state
  const [classes, dispatch] = useReducer(reducer, initialState)

  // Some handlers
  const handleChange = (field, value) => {
    dispatch({
      type: "CHANGE_VALUE",
      payload: {
        field,
        value
      }
    })
  }
  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)
      console.log(classes)

      const payload = {
        codeClasse: classes.name,
        nomClasse: classes.name,
        capaciteClasse: classes.capacity,
        idFil: classes.faculty,
        idNiv: classes.level,
        groups: {
          nomGroupe: classes.groups.name,
          capaciteGroupe: classes.groups.capacity
        },
        specialities: classes.specialities
      }

      const { data, error } = await ClassAPI.create(payload)

      // Stop loading
      setLoading(false)

      if (data) {
        // Get faculty and level from global state
        const faculty = getFaculty(classes.faculty)
        const level = getLevel(classes.level)
  
        addClass({ ...classes, code: classes.name, faculty, level })
        showToast(`La classe ${classes.name} a été créée avec succès`)

        // Reset data
        dispatch({ type: "RESET" })

        closeModal()
      } else {
        console.log(error)

        showToast("Un problème est survenu lors de la création d'une classe", "error")
      }
    }
  }

  const verificationForm = () => {
    const { name, faculty, capacity, level, groups } = classes

    if (name && faculty && capacity && level) {
      return true
    }

    return false
  }


  const handleAddGroup = () => dispatch({ type: "ADD_GROUP" })

  const handleDeleteGroup = (id) => dispatch({ type: "DELETE_GROUP", payload: id })

  const handleAddSpeciality = () => dispatch({ type: "ADD_SPECIALITY" })

  const handleDeleteSpeciality = (id) => dispatch({ type: "DELETE_SPECIALITY", payload: id })

  const handleUpdateSpecialityInfo = (id, field, value) => {
    dispatch({ 
      type: "UPDATE_SPECIALITY_INFO", 
      payload: {
        id,
        field,
        value
      }
    })
  }

  const handleAddSpecialityGroup = (id) => {
    dispatch({
      type: "ADD_SPECIALITY_GROUP",
      payload: id
    })
  }

  const handleDeleteSpecialityGroup = (idSpec, idGroup) => {
    dispatch({
      type: "DELETE_SPECIALITY_GROUP",
      payload: {
        idSpec,
        idGroup
      }
    })
  }



  return (
    <section>
      <Box 
        sx={{
          width: "100%",
          marginBottom: 2,
          paddingTop: 1
        }}
        className={classStyles.container}
      >
        <Input 
          placeholder="nom"
          fullWidth
          onChange={(e) => handleChange("name", e.target.value)}
          value={classes.name}
        />

        <Select 
          label="Filiere"
          options={[
            ...faculties.map(fac => ({ value: fac.getId, label: fac.getName }))
          ]}
          value={classes.faculty}
          fullWidth
          onGetValue={(value) => handleChange("faculty", value)}
        />

        <Select 
          label="Niveau"
          options={[
            ...levels.map(lev => ({ value: lev.getId, label: lev.getName }))
          ]}
          value={classes.level}
          fullWidth
          onGetValue={(value) => handleChange("level", value)}
        />

        <Input 
          placeholder="capacite"
          type="number"
          fullWidth
          onChange={(e) => handleChange("capacity", e.target.value)}
          value={classes.capacity}
        />

        <span className={classStyles.groupLabel}>Groupes de la classe</span>
        <Box className={classStyles.groupContainer}>
          {
            classes.groups.slice(1).map((item) => {
              return (
                <GroupItem 
                  key={item.id}
                  data={item}
                  onDeleteGroup={handleDeleteGroup}
                />
              )
            })
          }

          <Button 
            text="nouveau groupe"
            variant="outlined"
            bgColor="#ff8500"
            fontSize={12}
            rounded
            onClick={handleAddGroup}
          >
            <BsFillPlusCircleFill 
              size={15}
              color="#ff8500"
            />
          </Button>
        </Box>

        <Box 
          sx={{
            display: "block",
          }}
        >
          <p className={classStyles.groupLabel}>Spécialités</p>
          
          {
            classes.specialities.map((speciality, index) => {
              return (
                <SpecialityItem 
                  key={speciality.id}
                  data={speciality}
                  index={index + 1}
                  onDeleteSpeciality={handleDeleteSpeciality}
                  onUpdateSpeciality={handleUpdateSpecialityInfo}
                  onAddSpecialityGroup={handleAddSpecialityGroup}
                  onDeleteSpecialityGroup={handleDeleteSpecialityGroup}
                />
              )
            })
          }

          <Button 
            text="Nouvelle spécialité"
            variant="outlined"
            bgColor="#ff8500"
            fontSize={12}
            rounded
            onClick={handleAddSpeciality}
          >
            <BsFillPlusCircleFill 
              size={15}
              color="#ff8500"
            />
          </Button>
        </Box>
      </Box>


      <Box className={styles.controls}>
        <Button 
          text="Annuler"
          variant="outlined"
          bgColor="#ff8500"
          fontSize={14}
          rounded
          className={styles.controlsBtn}
          onClick={closeModal}
        />

        <Button 
          disabled={!verificationForm() || loading}
          text="Sauver"
          variant="contained"
          fontSize={14}
          rounded
          onClick={handleSubmitForm}
        />
      </Box>
      {
        loading && <LinearLoader />
      }
    </section>
  )
}

export default AddClassModalContent