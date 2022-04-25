import { config } from 'dotenv'
import mysql from "mysql2"

// Fetch data from .env file
config()

const {
  HOSTDB,
  USERDB,
  DBNAME
} = process.env

const connection = mysql.createConnection({
  host: HOSTDB,
  user: USERDB,
  database: DBNAME
});

export default connection