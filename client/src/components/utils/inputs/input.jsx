import { TextField } from '@mui/material'

const Input = ({
  placeholder,
  onChange,
  value,
  fullWidth
}) => {
  return (
    <TextField 
      label={placeholder} 
      variant="outlined" 
      size='small'
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        borderColor: "#ccc",
        "&:hover": {
          borderColor: "#ccc",
        },
        fontFamily: "Nunito-Regular"
      }}  
      onChange={onChange}
      value={value}
    />
  )
}

export default Input