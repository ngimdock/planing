import React from "react"
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import classStyles from '../../css/classModalContent.module.css'
import { BsX } from 'react-icons/bs'

const GroupItem = ({ data: { id, name, capacity }, onDeleteGroup }) => {
  return (
    <Box
      className={classStyles.groupItem}
    >
      <span className={classStyles.groupItemTitle}>{ name }</span>

      {
        id > 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 5,
              "&:hover": {
                cursor: "pointer"
              }
            }}
            onClick={() => onDeleteGroup(id)}
          >
            <BsX 
              color="#828282"
              size={25}
            />
          </Box>
        )
      }

      <Input 
        placeholder="capacité"
        type="number"
        fullWidth
        sx={{
          mt: 1
        }}
        value={capacity}
      />
    </Box>
  )
}

export default GroupItem