import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import AdminModel from '../models/AdminModel.js'

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN
} = process.env

const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Not authorized" })
    }

    jwt.verify(token, SECRET_CODE_TOKEN, async (error, result) => {
      if (error) return res.status(401).json({message: "Not authorized"})

      const user = await AdminModel.getCurrentUser(result.email)

      if (user) {
        req.user = user

        next()
      } else {
        return res.status(401).json({ error: "Not authorized" })
      }      
    })
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: "Not authorized" })
  }
}

export default authenticationMiddleware