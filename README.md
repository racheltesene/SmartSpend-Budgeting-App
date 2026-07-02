# SmartSpend – Budgeting and Spending Insight Web Application

## Overview

SmartSpend is a full-stack budgeting web application designed to help users manage their personal finances. Users can track income and expenses, create monthly budgets, monitor savings goals, schedule recurring transactions, and analyze spending trends through an interactive dashboard.

The application is built using React, Express, Node.js, and PostgreSQL, following a client-server architecture with REST APIs for communication.

---

# Features

## Transaction Management

- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- Categorize transactions
- Track transaction dates
- Search transactions

---

## Dashboard

Displays real-time financial summaries including:

- Total Income
- Total Expenses
- Current Balance
- Largest Expense
- Most Used Category
- Transaction Count

Dashboard statistics update automatically whenever transaction data changes.

---

## Budget Tracking

- Create monthly budgets
- Track remaining budget
- Budget progress bar
- Budget warning messages
- Monthly budget persistence

---

## Spending Analytics

- Monthly transaction filtering
- Monthly expense chart
- Year filtering for expense chart
- Category spending breakdown
- Automated spending insights

---

## Savings Goals

- Create savings goals
- Track savings progress
- Progress bars
- Record savings contributions
- Automatically log contributions as expense transactions

---

## Recurring Transactions

- Create recurring income or expense transactions
- Automatically generate future transaction entries
- Collapse recurring transaction groups
- Edit generated recurring entries
- Delete generated recurring entries

---

## Data Export

- Export displayed transactions to CSV

---

## Responsive Design

- Mobile-friendly interface
- Responsive layouts for smaller screen sizes

---

# Tech Stack

## Frontend

- React
- CSS

## Backend

- Node.js
- Express
- REST API

## Database

- PostgreSQL

## Development Tools

- GitHub
- VS Code
- pgAdmin

---

# Project Progress

## Completed

### Core Features

- ✅ Transaction creation
- ✅ Transaction editing
- ✅ Transaction deletion
- ✅ Transaction categorization
- ✅ Transaction search
- ✅ Transaction date tracking

### Dashboard

- ✅ Total Income
- ✅ Total Expenses
- ✅ Current Balance
- ✅ Largest Expense
- ✅ Most Used Category
- ✅ Transaction Count

### Budget Features

- ✅ Monthly budgets
- ✅ Budget progress tracking
- ✅ Budget warning system

### Analytics

- ✅ Monthly filtering
- ✅ Monthly expense chart
- ✅ Year filtering
- ✅ Category spending breakdown
- ✅ Spending insights

### Stretch Features

- ✅ Responsive mobile design
- ✅ CSV export
- ✅ Savings goal tracking
- ✅ Recurring transactions

---

# Application Architecture

```
User Input
      │
      ▼
React Frontend
      │
 REST API (HTTP)
      │
      ▼
Express Backend
      │
      ▼
PostgreSQL Database
      │
      ▼
Dashboard & Analytics
```

---

# REST API Endpoints

## Transactions

- GET `/transactions`
- POST `/transactions`
- PUT `/transactions/:id`
- DELETE `/transactions/:id`

## Budgets

- GET `/budgets`
- POST `/budgets`

## Savings Goals

- GET `/savings-goals`
- POST `/savings-goals`
- PUT `/savings-goals/:id/contribute`
- DELETE `/savings-goals/:id`

## Recurring Transactions

- GET `/recurring-transactions`
- POST `/recurring-transactions`
- POST `/recurring-transactions/:id/generate`
- DELETE `/recurring-transactions/:id`

---

# Running the Project

## Backend

```bash
cd backend
npm install
node server.js
```

The backend will run on:

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# Future Improvements

Potential enhancements include:

- User authentication
- Cloud deployment
- Email reminders for recurring transactions
- Multiple user accounts
- Data visualization improvements

---

# Author

**Rachel Tesene**

BYU–Idaho

CSE 499 Senior Project

Spring 2026