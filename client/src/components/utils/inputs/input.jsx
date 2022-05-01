import { TextField } from '@mui/material'

const Input = ({
  placeholder,
  onChange,
  value,
  fullWidth,
  type,
  className,
  error,
  helperText
}) => {
  // Default values section
  const defaultType = type ? type : "text"
  const defaultError = error && true

  return (
    <TextField 
      error={defaultError}
      helperText={defaultError && helperText}
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
      className={className}
    />
  )
}

export default Input