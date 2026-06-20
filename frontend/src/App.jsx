import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [budgetAmount, setBudgetAmount] = useState("");

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [contributionDate, setContributionDate] = useState(today);

  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    transaction_type: "Expense",
    description: "",
    transaction_date: today,
  });

  const fetchTransactions = () => {
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  const fetchBudgets = () => {
    fetch("http://localhost:5000/budgets")
      .then((response) => response.json())
      .then((data) => setBudgets(data))
      .catch((error) => console.error("Error fetching budgets:", error));
  };

  const fetchSavingsGoals = () => {
    fetch("http://localhost:5000/savings-goals")
      .then((response) => response.json())
      .then((data) => setSavingsGoals(data))
      .catch((error) => console.error("Error fetching savings goals:", error));
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
    fetchSavingsGoals();
  }, []);

  const formatMonth = (transactionDate) => {
    const date = new Date(transactionDate);
    return date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
  };

  const availableMonths = [
    "All Months",
    ...new Set(
      transactions.map((transaction) =>
        formatMonth(transaction.transaction_date)
      )
    ),
  ];

  const filteredTransactions =
    selectedMonth === "All Months"
      ? transactions
      : transactions.filter(
          (transaction) =>
            formatMonth(transaction.transaction_date) === selectedMonth
        );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category: "Food",
      transaction_type: "Expense",
      description: "",
      transaction_date: today,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5000/transactions/${editingId}`
      : "http://localhost:5000/transactions";

    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    resetForm();
    fetchTransactions();
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);

    setFormData({
      amount: transaction.amount,
      category: transaction.category,
      transaction_type: transaction.transaction_type,
      description: transaction.description || "",
      transaction_date: transaction.transaction_date
        ? transaction.transaction_date.split("T")[0]
        : today,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/transactions/${id}`, {
      method: "DELETE",
    });

    fetchTransactions();
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();

    if (selectedMonth === "All Months") {
      alert("Please choose a specific month before setting a budget.");
      return;
    }

    await fetch("http://localhost:5000/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        month: selectedMonth,
        budget_amount: budgetAmount,
      }),
    });

    setBudgetAmount("");
    fetchBudgets();
  };

  const handleSavingsGoalSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/savings-goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal_name: goalName,
        target_amount: targetAmount,
      }),
    });

    setGoalName("");
    setTargetAmount("");
    fetchSavingsGoals();
  };

  const handleContributionSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGoalId) {
      alert("Please choose a savings goal.");
      return;
    }

    await fetch(
      `http://localhost:5000/savings-goals/${selectedGoalId}/contribute`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contribution_amount: contributionAmount,
          contribution_date: contributionDate,
        }),
      }
    );

    setContributionAmount("");
    setContributionDate(today);
    fetchSavingsGoals();
    fetchTransactions();
  };

  const handleDeleteSavingsGoal = async (id) => {
    await fetch(`http://localhost:5000/savings-goals/${id}`, {
      method: "DELETE",
    });

    fetchSavingsGoals();
  };

  const income = filteredTransactions
    .filter((t) => t.transaction_type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = filteredTransactions
    .filter((t) => t.transaction_type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  const selectedBudget = budgets.find((budget) => budget.month === selectedMonth);

  const currentBudget =
    selectedMonth !== "All Months" && selectedBudget
      ? Number(selectedBudget.budget_amount)
      : 0;

  const remainingBudget = currentBudget - expenses;

  const budgetPercent =
    currentBudget > 0 ? Math.min((expenses / currentBudget) * 100, 100) : 0;

  let budgetMessage = "Select a month and set a budget to receive budget feedback.";
  let budgetMessageClass = "budget-message neutral";

  if (selectedMonth !== "All Months" && currentBudget > 0) {
    if (expenses === 0) {
      budgetMessage = "No expenses recorded for this month yet.";
      budgetMessageClass = "budget-message neutral";
    } else if (expenses > currentBudget) {
      budgetMessage = `Budget exceeded by $${Math.abs(remainingBudget).toFixed(2)}.`;
      budgetMessageClass = "budget-message danger";
    } else if (budgetPercent >= 90) {
      budgetMessage = "Warning: You are close to reaching your budget limit.";
      budgetMessageClass = "budget-message warning";
    } else {
      budgetMessage = "You are currently within your monthly budget.";
      budgetMessageClass = "budget-message success";
    }
  }

  const monthlyTotals = transactions.reduce((acc, transaction) => {
    if (transaction.transaction_type === "Expense") {
      const month = formatMonth(transaction.transaction_date);
      acc[month] = (acc[month] || 0) + Number(transaction.amount);
    }
    return acc;
  }, {});

  const monthlyChartData = Object.keys(monthlyTotals).map((month) => ({
    month,
    amount: monthlyTotals[month],
  }));

  const maxMonthlyAmount =
    monthlyChartData.length > 0
      ? Math.max(...monthlyChartData.map((item) => item.amount))
      : 0;

  const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.transaction_type === "Expense") {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + Number(transaction.amount);
    }
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryTotals).map((category) => ({
    category,
    amount: categoryTotals[category],
  }));

  const maxCategoryAmount =
    categoryChartData.length > 0
      ? Math.max(...categoryChartData.map((item) => item.amount))
      : 0;

  const filteredExpenseTransactions = filteredTransactions.filter(
    (t) => t.transaction_type === "Expense"
  );

  const largestExpense =
    filteredExpenseTransactions.length > 0
      ? filteredExpenseTransactions.reduce((largest, current) =>
          Number(current.amount) > Number(largest.amount) ? current : largest
        )
      : null;

  const categoryCounts = filteredTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + 1;
    return acc;
  }, {});

  const mostUsedCategory =
    Object.keys(categoryCounts).length > 0
      ? Object.keys(categoryCounts).reduce((a, b) =>
          categoryCounts[a] > categoryCounts[b] ? a : b
        )
      : "N/A";

  const transactionsInSelectedView = filteredTransactions.length;

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export.");
      return;
    }

    const headers = ["Date", "Category", "Type", "Amount", "Description"];

    const rows = filteredTransactions.map((transaction) => [
      transaction.transaction_date
        ? transaction.transaction_date.split("T")[0]
        : "",
      transaction.category,
      transaction.transaction_type,
      transaction.amount,
      transaction.description || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      selectedMonth === "All Months"
        ? "smartspend_transactions.csv"
        : `smartspend_transactions_${selectedMonth.replace(" ", "_")}.csv`;

    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <header>
        <h1>SmartSpend</h1>
        <p>Budgeting and Spending Insight Application</p>
      </header>

      <section className="cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>${income.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Total Expenses</h3>
          <p>${expenses.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Current Balance</h3>
          <p>${balance.toFixed(2)}</p>
        </div>
      </section>

      <section className="filter-panel">
        <label>View Month</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleExportCSV}>
          Export CSV
        </button>
      </section>

      <section className="budget-panel">
        <div>
          <h2>Monthly Budget Tracker</h2>
          <p>
            {selectedMonth === "All Months"
              ? "Select a specific month to set or view a budget."
              : `Budget for ${selectedMonth}`}
          </p>
        </div>

        <form onSubmit={handleBudgetSubmit} className="budget-form">
          <input
            type="number"
            placeholder="Enter monthly budget"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            required
          />
          <button type="submit">Save Budget</button>
        </form>

        {selectedMonth !== "All Months" && (
          <div className="budget-summary">
            <p>Budget: ${currentBudget.toFixed(2)}</p>
            <p>Spent: ${expenses.toFixed(2)}</p>
            <p>
              Remaining:{" "}
              <span className={remainingBudget < 0 ? "over-budget" : ""}>
                ${remainingBudget.toFixed(2)}
              </span>
            </p>

            <div className="budget-track">
              <div
                className={remainingBudget < 0 ? "budget-fill danger" : "budget-fill"}
                style={{ width: `${budgetPercent}%` }}
              ></div>
            </div>

            <p className={budgetMessageClass}>{budgetMessage}</p>
          </div>
        )}
      </section>

      <section className="main-content">
        <div className="panel">
          <h2>{editingId ? "Edit Transaction" : "Add Transaction"}</h2>

          <form onSubmit={handleSubmit}>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Rent</option>
              <option>Transportation</option>
              <option>Entertainment</option>
              <option>School</option>
              <option>Paycheck</option>
              <option>Savings</option>
              <option>Other</option>
            </select>

            <label>Type</label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
            >
              <option>Expense</option>
              <option>Income</option>
            </select>

            <label>Date</label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Example: Groceries, Rent, Paycheck"
            />

            <button type="submit">
              {editingId ? "Update Transaction" : "Add Transaction"}
            </button>
          </form>
        </div>

        <div className="panel">
          <h2>Recent Transactions</h2>

          {filteredTransactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <div className="transaction-list">
              {filteredTransactions.map((transaction) => (
                <div className="transaction" key={transaction.id}>
                  <div>
                    <strong>{transaction.category}</strong>
                    <p>{transaction.description}</p>
                    <small>
                      {transaction.transaction_date
                        ? transaction.transaction_date.split("T")[0]
                        : "No date"}
                    </small>
                  </div>

                  <span>
                    {transaction.transaction_type === "Expense" ? "-" : "+"}$
                    {Number(transaction.amount).toFixed(2)}
                  </span>

                  <div className="transaction-actions">
                    <button type="button" onClick={() => handleEdit(transaction)}>
                      Edit
                    </button>

                    <button type="button" onClick={() => handleDelete(transaction.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="stats-panel">
        <div className="stat-card">
          <h3>Largest Expense</h3>
          {largestExpense ? (
            <>
              <p>${Number(largestExpense.amount).toFixed(2)}</p>
              <small>{largestExpense.category}</small>
            </>
          ) : (
            <p>N/A</p>
          )}
        </div>

        <div className="stat-card">
          <h3>Most Used Category</h3>
          <p>{mostUsedCategory}</p>
        </div>

        <div className="stat-card">
          <h3>Transactions Shown</h3>
          <p>{transactionsInSelectedView}</p>
        </div>
      </section>

      <section className="panel chart-panel">
        <h2>Category Spending Breakdown</h2>

        {categoryChartData.length === 0 ? (
          <p>No expense data for the selected month.</p>
        ) : (
          <div className="bar-chart">
            {categoryChartData.map((item) => (
              <div className="bar-row" key={item.category}>
                <div className="bar-label">{item.category}</div>

                <div className="bar-track">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${(item.amount / maxCategoryAmount) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="bar-amount">${item.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="panel savings-panel">
        <h2>Savings Goals</h2>

        <div className="savings-forms">
          <form onSubmit={handleSavingsGoalSubmit}>
            <h3>Create Goal</h3>

            <label>Goal Name</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Example: New Laptop"
              required
            />

            <label>Target Amount</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />

            <button type="submit">Create Savings Goal</button>
          </form>

          <form onSubmit={handleContributionSubmit}>
            <h3>Add Contribution</h3>

            <label>Choose Goal</label>
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              required
            >
              <option value="">Select a goal</option>
              {savingsGoals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.goal_name}
                </option>
              ))}
            </select>

            <label>Contribution Amount</label>
            <input
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              required
            />

            <label>Contribution Date</label>
            <input
              type="date"
              value={contributionDate}
              onChange={(e) => setContributionDate(e.target.value)}
              required
            />

            <button type="submit">Add Contribution</button>
          </form>
        </div>

        {savingsGoals.length === 0 ? (
          <p>No savings goals yet.</p>
        ) : (
          <div className="savings-list">
            {savingsGoals.map((goal) => {
              const progress =
                Number(goal.target_amount) > 0
                  ? Math.min(
                      (Number(goal.current_amount) /
                        Number(goal.target_amount)) *
                        100,
                      100
                    )
                  : 0;

              return (
                <div className="savings-goal" key={goal.id}>
                  <div className="savings-header">
                    <div>
                      <strong>{goal.goal_name}</strong>
                      <p>
                        ${Number(goal.current_amount).toFixed(2)} / $
                        {Number(goal.target_amount).toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteSavingsGoal(goal.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="savings-track">
                    <div
                      className="savings-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <small>{progress.toFixed(1)}% complete</small>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="panel chart-panel">
        <h2>Monthly Expense Chart</h2>

        {monthlyChartData.length === 0 ? (
          <p>No expense data yet. Add an expense with a date to see the chart.</p>
        ) : (
          <div className="bar-chart">
            {monthlyChartData.map((item) => (
              <div className="bar-row" key={item.month}>
                <div className="bar-label">{item.month}</div>

                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.amount / maxMonthlyAmount) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="bar-amount">${item.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;