import { useState } from "react"
import ModalContext from "../contexts/modalContext"

const ModalProvider = ({ children }) => {
  // Set local state
  const [isOpen, setIsOpen] = useState(false)
  const [currentModalName, setCurrentModalName] = useState("")
  const [currentModalCode, setCurrentModalCode] = useState("")

  // Some handlers
  const handleOpenModal = (modalName, modalCode) => {
    setCurrentModalName(modalName)
    setCurrentModalCode(modalCode)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  // Context value
  const contextValue = {
    isOpen,
    currentModalName,
    currentModalCode,
    openModal: handleOpenModal,
    closeModal: handleCloseModal
  }

  return (
    <ModalContext.Provider value={contextValue}>
      { children }
    </ModalContext.Provider>
  )
}

export default ModalProvider