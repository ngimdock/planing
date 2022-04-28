import AdminModel from "../models/AdminModel.js";
import bcrypt from 'bcrypt'
import { config } from "dotenv";
import jwt from 'jsonwebtoken'

// Fetch data from .env file
config()

const {
  EXPIRE_IN,
  SECRET_CODE_TOKEN
} = process.env

class AdminController {
  static getCurrentUser (req, res) {
    return res.status(200).json({ data: {...req.user, passwordAdmin: undefined} })
  }

  static async create (req, res) {
    // Get data from body
    const {
      name,
      password,
      email,
      phone,
      sexe
    } = req.body

    if (name && password && email && phone && sexe) {
      // Hash password
      const saltRounds = 10;

      bcrypt.hash(password.toLowerCase(), saltRounds, async (err, hash) => {
        if (err) return res.sendStatus(500);

        const payload = {
          name,
          password: hash,
          email,
          phone,
          sexe
        }

        const { data, error } = await AdminModel.create(payload)

        if (data) {
          return res.status(201).json({ data: "Admin added successfully" })
        }

        return res.status(500).json({ error })
      })
    } else {
      return res.status(400).json({ error: 'Provide all the required data' })
    }
  }

  static async signin (req, res) {
    // Get data from body
    const {
      email,
      password
    } = req.body

    console.log(email)

    if (email && password) {
      const { data, error } = await AdminModel.getCurrentUser(email)

      if (data) {
        console.log({yo: data})
        const verification = bcrypt.compareSync(password.toLowerCase(), data.passwordAdmin)
        console.log(verification)
        if (verification) {
          const token = jwt.sign({ email: data.emailAdmin }, SECRET_CODE_TOKEN, {
            expiresIn: `${EXPIRE_IN} min`,
          });

          return res.status(200).json({ data: { ...data, passwordAdmin: undefined, token } })
        }

        return res.status(500).json({ error: "Your password is incorrect" })
      } else {
        res.status(404).json({ error })
      }
    } else {
      console.log("mince")
      return res.status(400).json({ error: "Provide all the required data" })
    }
  }

  static async checkAdminExist (req, res) {
    // Get data from request body
    const { email } = req.body

    if (email) {
      const { data, error } = await AdminModel.verifyEmail(email)

      if (data) {
        if (data.length > 0) {
          return res.json({ data: true })
        }

        return res.json({ data: false })
      }

      res.status(500).json({ error })
    } else {
      res.status(400).json({ error: "Provide an email address" })
    }
  }
}

export default AdminController