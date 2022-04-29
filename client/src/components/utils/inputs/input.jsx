import { TextField } from '@mui/material'

const Input = ({
  placeholder,
  onChange,
  value,
  fullWidth,
  type
}) => {
  // Default values section
  const defaultType = type ? type : "text"

  return (
    <TextField 
      type={defaultType}
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
        fontFamily: "Nunito-Regular",
        marginBottom: 2
      }}  
      onChange={onChange}
      value={value}
    />
  )
}

export default Input