import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    transaction_type: "Expense",
    description: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      amount: "",
      category: "Food",
      transaction_type: "Expense",
      description: "",
    });

    fetchTransactions();
  };

  const income = transactions
    .filter((t) => t.transaction_type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.transaction_type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  return (
    <div className="app">
      <header>
        <h1>SmartSpend</h1>
        <p>Budgeting and spending insight prototype</p>
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

      <section className="main-content">
        <div className="panel">
          <h2>Add Transaction</h2>

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

            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Example: Lunch, rent, paycheck"
            />

            <button type="submit">Add Transaction</button>
          </form>
        </div>

        <div className="panel">
          <h2>Recent Transactions</h2>

          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <div className="transaction-list">
              {transactions.map((transaction) => (
                <div className="transaction" key={transaction.id}>
                  <div>
                    <strong>{transaction.category}</strong>
                    <p>{transaction.description}</p>
                  </div>
                  <span>
                    {transaction.transaction_type === "Expense" ? "-" : "+"}$
                    {Number(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;