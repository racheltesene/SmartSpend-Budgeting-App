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
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY transaction_date DESC, id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const {
      amount,
      category,
      transaction_type,
      description,
      transaction_date,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO transactions
      (amount, category, transaction_type, description, transaction_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        amount,
        category,
        transaction_type,
        description,
        transaction_date,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      amount,
      category,
      transaction_type,
      description,
      transaction_date,
    } = req.body;

    const result = await pool.query(
      `UPDATE transactions
       SET amount = $1,
           category = $2,
           transaction_type = $3,
           description = $4,
           transaction_date = $5
       WHERE id = $6
       RETURNING *`,
      [
        amount,
        category,
        transaction_type,
        description,
        transaction_date,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM transactions WHERE id = $1",
      [id]
    );

    res.json({
      message: "Transaction deleted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});