# API Plan

## Base URL

http://localhost:5000

---

## Transaction Routes

- GET /transactions
- POST /transactions
- PUT /transactions/:id
- DELETE /transactions/:id

---

## Budget Routes

- GET /budgets
- POST /budgets

---

## Savings Goal Routes

- GET /savings-goals
- POST /savings-goals
- PUT /savings-goals/:id/contribute
- DELETE /savings-goals/:id

---

## Recurring Transaction Routes

- GET /recurring-transactions
- POST /recurring-transactions
- POST /recurring-transactions/:id/generate
- DELETE /recurring-transactions/:id

---

## Notes

Dashboard summaries, spending statistics, category breakdowns, monthly filtering, year filtering, and transaction search are currently calculated in the React frontend using transaction data retrieved from the API.