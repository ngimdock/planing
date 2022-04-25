import { Button as CoreButton } from '@mui/material'

/**
 * Custom button
 */
const Button = ({
  children, // JSX Element
  text, // Text to display
  bgColor, // background color, border color and text color
  rounded, // boolean to specify the radius of the button
  size, // width of the button
  fontSize, // font size of the text
  variant, // type of button (outlined | contained)
  hasShadow, // specify the boxShadow
  onClick, // click event handlercontrolsBtn
  className // Classname for style
}) => {
  // Default values section
  const defaultBgColor = bgColor ? bgColor : "#3e4bff"
  const defaultSize = size ? size : "auto"
  const defaultFontSize = fontSize ? fontSize : 14
  const defaultVariant = variant && variant === "outlined" ? variant : "contained"
  const defaultHasShadow = hasShadow ? hasShadow : false


  // Some functions
  const isBtnContainedType = () => defaultVariant === "contained"

  return (
    <CoreButton
      onClick={onClick}
      variant={defaultVariant}
      sx={{
        backgroundColor: isBtnContainedType() && defaultBgColor,
        borderRadius: rounded && 100,
        padding: 'auto',
        fontFamily: "Nunito-Bold",
        width: defaultSize,
        fontSize: defaultFontSize,
        borderWidth: !isBtnContainedType() && 2,
        borderColor: !isBtnContainedType() && defaultBgColor,
        color: !isBtnContainedType() && defaultBgColor,
        boxShadow: defaultHasShadow ? 4 : 0,
        '&:hover': {
          backgroundColor: isBtnContainedType() && defaultBgColor,
          borderColor: !isBtnContainedType() && defaultBgColor,
          borderWidth: !isBtnContainedType() && 2,
          boxShadow: defaultHasShadow ? 4 : 0,
        },
      }}
      className={className}
    >
      {
        children && children
      }

      <span style={{ marginLeft: children ? 10 : 0 }}>{ text }</span>
    </CoreButton>
  )
}

export default Button