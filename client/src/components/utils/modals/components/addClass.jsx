import React, { useContext } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import classStyles from '../css/classModalContent.module.css'
import ModalContext from "../../../../datamanager/contexts/modalContext"
import Select from "../../inputs/select"
import { BsFillPlusCircleFill, BsX } from 'react-icons/bs'

const GroupItem = () => {
  return (
    <Box
      className={classStyles.groupItem}
    >
      <span className={classStyles.groupItemTitle}>Groupe 1</span>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 5,
          "&:hover": {
            cursor: "pointer"
          }
        }}
      >
        <BsX 
          color="#828282"
          size={25}
        />
      </Box>

      <Input 
        placeholder="capacite"
        type="number"
        fullWidth
        sx={{
          mt: 1
        }}
      />
    </Box>
  )
}

const SpecialityItem = () => {
  return (
    <Box className={classStyles.groupContainer}>
      <Select 
        label="Specialite"
        options={[
          { value: "SI-GL", label: "Geni Logiciel" },
          { value: "R", label: "Reseau" }
        ]}
        value="licence 1"
        fullWidth
      />

      <span className={classStyles.groupLabel}>Groupes de la specialite</span>

      <Box 
        className={`
          ${classStyles.groupContainer}
          ${classStyles.specialityGroupContainer}
        `}
      >
        <GroupItem />

        <Button 
          text="nouveau groupe"
          variant="outlined"
          bgColor="#ff8500"
          fontSize={12}
          rounded
        >
          <BsFillPlusCircleFill 
            size={15}
            color="#ff8500"
          />
        </Button>
      </Box>
    </Box>
  )
}

const AddClassModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

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
        />

        <Select 
          label="Filiere"
          options={[
            { value: "informatique", label: "Informatique" },
            { value: "mathematique", label: "Mathematique" },
            { value: "physique", label: "Physique" }
          ]}
          value="informatique"
          fullWidth
        />

        <Select 
          label="Niveau"
          options={[
            { value: "licence 1", label: "Licence 1" },
            { value: "licence 2", label: "Licence 2" },
            { value: "licence 3", label: "Licence 3" }
          ]}
          value="licence 1"
          fullWidth
        />

        <Input 
          placeholder="capacite"
          type="number"
          fullWidth
        />

        <span className={classStyles.groupLabel}>Groupes de la classe</span>
        <Box className={classStyles.groupContainer}>
          <GroupItem />
          <GroupItem />
          <GroupItem />

          <Button 
            text="nouveau groupe"
            variant="outlined"
            bgColor="#ff8500"
            fontSize={12}
            rounded
          >
            <BsFillPlusCircleFill 
              size={15}
              color="#ff8500"
            />
          </Button>
        </Box>

        <span className={classStyles.groupLabel}>Specialite</span>
        
        <SpecialityItem />

        <Button 
          text="Nouvelle specialite"
          variant="outlined"
          bgColor="#ff8500"
          fontSize={12}
          rounded
        >
          <BsFillPlusCircleFill 
            size={15}
            color="#ff8500"
          />
        </Button>
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