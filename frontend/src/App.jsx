import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div className="app">
      <h1>SmartSpend Prototype</h1>
      <p>Budgeting and Spending Insight Web Application</p>

      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <strong>{transaction.category}</strong> - ${transaction.amount} (
              {transaction.transaction_type}) - {transaction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;