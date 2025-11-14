require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
