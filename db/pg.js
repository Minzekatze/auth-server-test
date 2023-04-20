import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export default pool;
