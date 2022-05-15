import React, { useContext } from "react"
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import classStyles from '../../css/classModalContent.module.css'
import Select from "../../../inputs/select"
import { BsFillPlusCircleFill, BsX } from 'react-icons/bs'
import GroupItem from "./groupItem"
import SpecialityContext from '../../../../../datamanager/contexts/specialityContext'

const SpecialityItem = ({ 
  data: { 
    id, 
    value, 
    capacity, 
    groups 
  }, 
  index, 
  onDeleteSpeciality,
  onUpdateSpeciality,
  onAddSpecialityGroup,
  onDeleteSpecialityGroup
}) => {
  // Get data from the global state
  const { specialities } = useContext(SpecialityContext)


  return (
    <Box className={classStyles.groupContainer}>
      <span 
        className={classStyles.groupItemTitle} 
        style={{ 
          display: "block",
          marginBottom: 15 
        }}
      >
        { "specialite " + index }
      </span>

      <Box
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          "&:hover": {
            cursor: "pointer"
          }
        }}
        onClick={() => onDeleteSpeciality(id)}
      >
        <BsX 
          color="#828282"
          size={25}
        />
      </Box>

      <Select 
        label="nom"
        options={[
          ...specialities.map(spec => ({ value: spec.getId, label: spec.getName }))
        ]}
        value={value}
        fullWidth
        onGetValue={(value) => onUpdateSpeciality(id, "value", value)}
      />
      <Input 
        placeholder="capacité"
        type="number"
        fullWidth
        sx={{
          mt: 1
        }}
        value={capacity}
        onChange={(e) => onUpdateSpeciality(id, "capacity", e.target.value)}
      />

      <span className={classStyles.groupLabel}>Groupes de la spécialité</span>

      <Box 
        className={`
          ${classStyles.groupContainer}
          ${classStyles.specialityGroupContainer}
        `}
      >
        {
          groups.map((item) => {
            return (
              <GroupItem 
                key={item.id}
                data={item}
                onDeleteGroup={(idGroup) => onDeleteSpecialityGroup(id, idGroup)}
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
          onClick={() => onAddSpecialityGroup(id)}
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

export default SpecialityItem