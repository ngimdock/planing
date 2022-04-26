import AdminModel from "../models/AdminModel.js";
import bcrypt from 'bcrypt'

class AdminController {
  static getCurrentUser (req, res) {
    res.send("")
  }

  static async create (req, res) {
    // Get data from body
    const {
      name,
      password,
      email,
      phone
    } = req.body

    if (name && password && email && phone) {
      // Hash password
      const saltRounds = 10;

      bcrypt.hash(password.toLowerCase(), saltRounds, async (err, hash) => {
        if (err) return res.sendStatus(500);

        const payload = {
          name,
          password: hash,
          email,
          phone
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

  static signin (req, res) {
    res.send("")
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