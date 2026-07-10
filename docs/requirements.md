# SmartSpend Requirements

## Project Overview

SmartSpend is a full-stack budgeting and spending insight web application designed to help users track income, expenses, spending habits, budgeting goals, savings goals, recurring transactions, and financial trends. The application provides transaction management, budgeting tools, spending analytics, category breakdowns, monthly filtering, recurring transaction management, CSV exporting, search functionality, and dashboard summaries to help users better understand and manage their finances.

The application uses a React frontend, Express backend, and PostgreSQL database.

---

# Must Have Requirements

## 1. Transaction Management

Users can create, edit, search, and delete income and expense transactions.

**Verification:** Create, edit, search for, and delete transactions while verifying changes appear in both the application dashboard and the PostgreSQL database.

---

## 2. Transaction Categorization

Users can assign categories to transactions.

**Verification:** Create transactions using multiple categories and verify they display correctly throughout the application.

---

## 3. Financial Dashboard

The application displays:

- Total Income
- Total Expenses
- Current Balance
- Largest Expense
- Most Used Category
- Transaction Count

**Verification:** Dashboard values update automatically whenever transaction data changes.

---

## 4. Persistent Data Storage

Transaction, budget, savings goal, and recurring transaction data are stored in PostgreSQL.

**Verification:** Restart the application and verify all previously saved data remains available.

---

## 5. Monthly Analytics

Users can filter transactions by month and visualize monthly spending trends.

**Verification:** Select different months and years and verify the transaction list and spending charts update correctly.

---

## 6. Budget Goal Tracking

Users can create monthly budgets and monitor progress toward those budgets.

**Verification:** Create a monthly budget and verify progress calculations, remaining budget, and warning messages update correctly.

---

## 7. Spending Insights

The application provides automated spending insights based on user spending patterns and budget data.

**Verification:** Demonstrate automatically generated spending insights using sample transaction and budget data.

---

## 8. Category Spending Breakdown

The application displays total spending grouped by expense category.

**Verification:** Demonstrate category spending summaries using multiple expense transactions.

---

# Stretch Requirements

## 1. Responsive Mobile Design

The application supports mobile-friendly layouts and remains usable on smaller screen sizes.

**Verification:** Demonstrate the application using Chrome's mobile device emulator.

---

## 2. CSV Export

Users can export transaction data to a CSV file.

**Verification:** Export transaction data and verify the downloaded CSV matches the displayed transaction data.

---

## 3. Savings Goal Tracking

Users can create savings goals and monitor progress toward completing those goals.

**Verification:** Create a savings goal, contribute funds, and verify the progress bar and contribution transaction update correctly.

---

## 4. Recurring Transactions

Users can create recurring transactions that automatically generate future transaction entries.

**Verification:** Create a recurring transaction, generate future entries, edit generated transactions, and delete recurring transactions.

---

# Additional Features

- Transaction search
- Collapsible recurring transaction groups
- Edit/Delete generated recurring transaction entries
- Year filter for Monthly Expense Chart
- Budget progress visualization
- Budget warning messages
- Responsive mobile interface
- Improved dashboard statistics
- PostgreSQL data persistence
- Automatic savings contribution transactions

---

# Current Status

## Completed

- Transaction creation
- Transaction editing
- Transaction deletion
- Transaction search
- Transaction categorization
- PostgreSQL database integration
- Dashboard summaries
- Financial statistics
- Monthly transaction filtering
- Monthly expense visualization
- Year-based chart filtering
- Budget tracking
- Budget progress bar
- Budget warning system
- Spending insights
- Category spending breakdown
- Responsive mobile design
- CSV export
- Savings goal creation
- Savings contributions
- Savings progress tracking
- Recurring transaction creation
- Recurring transaction generation
- Collapsible recurring transaction groups
- Edit/Delete generated recurring transactions
- Comprehensive feature testing
- User interface improvements
- Final code cleanup
- Final documentation
- Application stability testing
- Final demonstration preparation

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
- pgAdmin

---

# Project Architecture

User Input

↓

React Frontend

↓

Express REST API

↓

PostgreSQL Database

↓

Dashboard Output

---

# Project Status

**Project Complete – Ready for Final Demonstration and Pass-Off**

---

# Last Updated

**Week 12**