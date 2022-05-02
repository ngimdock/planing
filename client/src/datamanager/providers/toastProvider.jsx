import { useState } from "react"
import ToastContext from "../contexts/toastContext"

const ToastProvider = ({ children }) => {
  // Set local state
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  // Some handlers
  const handleShowToast = (message, type = "success") => {
    setMessage(message)
    setType(type)

    setOpen(true)
  }

  const handleCloseToast = () => {
    setOpen(false)
  }

  // context value
  const contextValue = {
    open,
    message,
    type,
    showToast: handleShowToast,
    closeToast: handleCloseToast
  }

  return (
    <ToastContext.Provider value={contextValue}>
      { children }
    </ToastContext.Provider>
  )
}

export default ToastProvider