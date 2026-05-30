const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smartspend",
  password: "banjo",
  port: 5432,
});

module.exports = pool;