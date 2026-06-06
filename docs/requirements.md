# SmartSpend Requirements

## Project Overview

SmartSpend is a full-stack budgeting and spending insight web application designed to help users track income, expenses, budgets, and spending trends. The application uses a React frontend, Express backend, and PostgreSQL database.

---

# Must Have Requirements

## 1. Transaction Creation

Users can create income and expense transactions.

**Verification:** Add a transaction and verify it appears in the transaction list and database.

---

## 2. Transaction Editing

Users can edit existing transactions.

**Verification:** Modify a transaction and verify the updated information appears correctly.

---

## 3. Transaction Deletion

Users can delete transactions.

**Verification:** Delete a transaction and verify it is removed from the application.

---

## 4. Transaction Categorization

Users can assign categories to transactions.

**Verification:** Create transactions with multiple categories and verify they display correctly.

---

## 5. Dashboard Summary

The application displays:

- Total Income
- Total Expenses
- Current Balance

**Verification:** Dashboard values update automatically when transaction data changes.

---

## 6. PostgreSQL Data Storage

Transaction data is stored in PostgreSQL.

**Verification:** Restart the application and verify data persists.

---

## 7. Monthly Transaction Filtering

Users can filter transactions by month.

**Verification:** Select different months and verify displayed transactions change appropriately.

---

## 8. Monthly Expense Visualization

The application displays monthly expenses in a chart.

**Verification:** Add expenses across multiple months and verify chart updates.

---

## 9. Spending Statistics

The application displays:

- Largest Expense
- Most Used Category
- Number of Transactions Displayed

**Verification:** Statistics update automatically when transaction data changes.

---

# Stretch Requirements

## 1. Budget Goal Tracking

Users can create and manage monthly budgets.

**Verification:** Create a budget and verify it is stored and displayed.

---

## 2. Budget Warning System

The application warns users when they approach or exceed their budget.

**Verification:** Demonstrate under-budget, near-budget, and over-budget scenarios.

---

## 3. Spending Insights

The application generates spending insights using transaction and budget data.

**Verification:** Insights update when spending behavior changes.

---

## 4. Category Spending Breakdown

The application displays spending totals grouped by category.

**Verification:** Category totals update automatically based on filtered transactions.

---

# Current Status

## Completed

- Transaction creation
- Transaction editing
- Transaction deletion
- Transaction categorization
- PostgreSQL database integration
- Dashboard summaries
- Monthly transaction filtering
- Monthly expense chart
- Spending statistics
- Budget tracking
- Budget progress bar
- Budget warning system
- Spending insights

## In Progress

- Category spending breakdown
- Additional dashboard analytics
- Mobile responsiveness improvements

---

# Technology Stack

## Frontend

- React
- CSS

## Backend

- Node.js
- Express

## Database

- PostgreSQL

## Development Tools

- VS Code
- GitHub

---

# Project Architecture

User Input

↓

React Frontend

↓

Express API

↓

PostgreSQL Database

↓

Dashboard Output

---

# Last Updated

Week 7 Development