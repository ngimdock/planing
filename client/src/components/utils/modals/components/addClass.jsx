import React, { useContext, useReducer } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import classStyles from '../css/classModalContent.module.css'
import ModalContext from "../../../../datamanager/contexts/modalContext"
import Select from "../../inputs/select"
import { BsFillPlusCircleFill } from 'react-icons/bs'
import reducer, { initialState } from '../reducers/classReducer'
import GroupItem from "./subComponents/groupItem"
import SpecialityItem from './subComponents/specialityItem'

const AddClassModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

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
            { value: "informatique", label: "Informatique" },
            { value: "mathematique", label: "Mathematique" },
            { value: "physique", label: "Physique" }
          ]}
          value={classes.faculty}
          fullWidth
          onGetValue={(value) => handleChange("faculty", value)}
        />

        <Select 
          label="Niveau"
          options={[
            { value: "licence 1", label: "Licence 1" },
            { value: "licence 2", label: "Licence 2" },
            { value: "licence 3", label: "Licence 3" }
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
            classes.groups.map((item) => {
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
          text="Sauver"
          variant="contained"
          fontSize={14}
          rounded
        />
      </Box>
    </section>
  )
}

export default AddClassModalContent