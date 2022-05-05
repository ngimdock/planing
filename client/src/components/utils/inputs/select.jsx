import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import SelectCore from '@mui/material/Select'

const Select = ({
  /**
   * Different options of the select
   * options = [{ value: string, label: string }]
   */
  options,
  label, // Label of the select
  onGetValue, // change event handler
  fullWidth,
  rounded,
  disabled,
  fontSize
}) => {
  const [value, setValue] = React.useState('')

  const handleChange = (event) => {
    setValue(event.target.value)

    onGetValue(event.target.value)
  };

  return (
    <FormControl 
      fullWidth={fullWidth} 
      sx={{ 
        minWidth: 120, 
        mb: 2,
      }} 
      size="small"
    >
      <InputLabel 
        id="demo-select-small"
        sx={{
          fontSize: fontSize && fontSize
        }}
      >{ label }</InputLabel>
      <SelectCore
        disabled={disabled}
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}
        sx={{
          borderRadius: rounded ? 50:1,
          fontSize: fontSize && fontSize,
          fontFamily: "Nunito-Regular",
          paddingBlock: "auto"
        }}
      >
        <MenuItem 
          value=""
          sx={{
            fontSize: fontSize && fontSize,
            fontFamily: "Nunito-Regular"
          }}  
        >
          <em>Vide</em>
        </MenuItem>

        {
          options && options.map((option) => <MenuItem value={option.value} sx={{ fontSize: fontSize && fontSize - 2, fontFamily: "Nunito-Regular" }}>{ option.label }</MenuItem>)
        }
      </SelectCore>
    </FormControl>
  );
}

export default Select
