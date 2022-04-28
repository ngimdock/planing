const verifyEmail = (email) => {
  const regex = new RegExp(/\w+\.\w+@facsciences-uy1.cm/, 'i')

  return regex.test(email)
}

export {
  verifyEmail
}