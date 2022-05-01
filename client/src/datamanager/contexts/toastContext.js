import { createContext } from "react";

const ToastContext = createContext({
  open: false,
  message: "",
  type: "",
  showToast: (message) => {},
  closeToast: () => {}
})

export default ToastContext
