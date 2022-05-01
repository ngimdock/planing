import { TextField } from '@mui/material'

const Input = ({
  placeholder,
  onChange,
  value,
  fullWidth,
  type,
  className,
  error,
  helperText,
  disabled,
  pr, // Padding-right
}) => {
  // Default values section
  const defaultType = type ? type : "text"
  const defaultError = error && true

  return (
    <TextField 
      disabled={disabled}
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
        marginBottom: 2,
        "&  input": {
          pr: pr && pr
        }
      }}  
      onChange={onChange}
      value={value}
      className={className}
    />
  )
}

export default Input