const { Pool } = require("pg");

// Configure your PostgreSQL connection
const pool = new Pool({
    user: "postgres",        // my PostgreSQL username
    host: "localhost",       // localhost for local development
    database: "smartspend",  // the database I created
    password: "banjo", // replace with  actual PostgreSQL password
    port: 5432,              // default PostgreSQL port
});

// Export the pool so other files can use it
module.exports = pool;