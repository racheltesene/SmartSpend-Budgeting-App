// ======================================================
// Imports & Configuration
// ======================================================
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ======================================================
// Health Check
// ======================================================
app.get("/", (req, res) => {
  res.send("SmartSpend API running");
});

// ======================================================
// Transaction Routes
// ======================================================
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

// ======================================================
// Budget Routes
// ======================================================
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

// ======================================================
// Savings Goal Routes
// ======================================================
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

// ======================================================
// Recurring Transaction Routes
// ======================================================

app.get("/recurring-transactions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM recurring_transactions ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/recurring-transactions", async (req, res) => {
  try {
    const {
      amount,
      category,
      transaction_type,
      description,
      start_date,
      frequency,
      occurrences,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO recurring_transactions
      (amount, category, transaction_type, description, start_date, frequency, occurrences)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        amount,
        category,
        transaction_type,
        description,
        start_date,
        frequency,
        occurrences,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/recurring-transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM recurring_transactions WHERE id = $1", [id]);

    res.json({ message: "Recurring transaction deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ======================================================
// Helper Functions
// ======================================================
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const formatDateForSQL = (date) => {
  return date.toISOString().split("T")[0];
};

app.post("/recurring-transactions/:id/generate", async (req, res) => {
  try {
    const { id } = req.params;

    const recurringResult = await pool.query(
      "SELECT * FROM recurring_transactions WHERE id = $1",
      [id]
    );

    if (recurringResult.rows.length === 0) {
      return res.status(404).json({ message: "Recurring transaction not found" });
    }

    const recurring = recurringResult.rows[0];
    const generatedTransactions = [];

    for (let i = 0; i < Number(recurring.occurrences); i++) {
      let transactionDate = new Date(recurring.start_date);

      if (recurring.frequency === "Weekly") {
        transactionDate = addDays(transactionDate, i * 7);
      } else if (recurring.frequency === "Biweekly") {
        transactionDate = addDays(transactionDate, i * 14);
      } else if (recurring.frequency === "Monthly") {
        transactionDate = addMonths(transactionDate, i);
      }

      const result = await pool.query(
        `INSERT INTO transactions
        (amount, category, transaction_type, description, transaction_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
          recurring.amount,
          recurring.category,
          recurring.transaction_type,
          `${recurring.description || "Recurring transaction"} (Recurring)`,
          formatDateForSQL(transactionDate),
        ]
      );

      generatedTransactions.push(result.rows[0]);
    }

    res.json({
      message: "Recurring transactions generated",
      generatedTransactions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ======================================================
// Start Server
// ======================================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});