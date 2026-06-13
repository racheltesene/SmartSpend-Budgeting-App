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
    const { amount, category, transaction_type, description, transaction_date } =
      req.body;

    const result = await pool.query(
      `INSERT INTO transactions 
      (amount, category, transaction_type, description, transaction_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [amount, category, transaction_type, description, transaction_date]
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
    const { amount, category, transaction_type, description, transaction_date } =
      req.body;

    const result = await pool.query(
      `UPDATE transactions
       SET amount = $1,
           category = $2,
           transaction_type = $3,
           description = $4,
           transaction_date = $5
       WHERE id = $6
       RETURNING *`,
      [amount, category, transaction_type, description, transaction_date, id]
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

    await pool.query("DELETE FROM transactions WHERE id = $1", [id]);

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/budgets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM budgets ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/budgets", async (req, res) => {
  try {
    const { month, budget_amount } = req.body;

    const result = await pool.query(
      `INSERT INTO budgets (month, budget_amount)
       VALUES ($1, $2)
       ON CONFLICT (month)
       DO UPDATE SET budget_amount = EXCLUDED.budget_amount
       RETURNING *`,
      [month, budget_amount]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


app.get("/savings-goals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM savings_goals ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/savings-goals", async (req, res) => {
  try {
    const { goal_name, target_amount } = req.body;

    const result = await pool.query(
      "INSERT INTO savings_goals (goal_name, target_amount, current_amount) VALUES ($1, $2, 0) RETURNING *",
      [goal_name, target_amount]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/savings-goals/:id/contribute", async (req, res) => {
  try {
    const { id } = req.params;
    const { contribution_amount, contribution_date } = req.body;

    const goalResult = await pool.query(
      `UPDATE savings_goals
       SET current_amount = current_amount + $1
       WHERE id = $2
       RETURNING *`,
      [contribution_amount, id]
    );

    const goal = goalResult.rows[0];

    await pool.query(
      `INSERT INTO transactions
      (amount, category, transaction_type, description, transaction_date)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        contribution_amount,
        "Savings",
        "Expense",
        `Savings contribution to ${goal.goal_name}`,
        contribution_date,
      ]
    );

    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/savings-goals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM savings_goals WHERE id = $1", [id]);

    res.json({ message: "Savings goal deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});