const verifyEmail = (email) => {
  const regex = new RegExp(/\w+\.\w+@facsciences-uy1\.cm/, 'i')

  return regex.test(email)
}

const verifyPhoneNumber = (phone) => {
  const regex = new RegExp(/6[5-9,2][0-9]{3}[0-9]{4}/)

  if (phone.toString().length !== 9) return false
  
  return regex.test(phone)
}

export {
  verifyEmail,
  verifyPhoneNumber
}