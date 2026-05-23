const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartSpend API running");
});

app.get("/transactions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const { amount, category, transaction_type, description } = req.body;

    const result = await pool.query(
      "INSERT INTO transactions (amount, category, transaction_type, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, category, transaction_type, description]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});