import { config } from 'dotenv'
import mysql from "mysql2/promise"

// Fetch data from .env file
config()

const {
  HOSTDB,
  USERDB,
  DBNAME
} = process.env


const connection = await mysql.createConnection({
  host: HOSTDB,
  user: USERDB,
  database: DBNAME
});

export default connection