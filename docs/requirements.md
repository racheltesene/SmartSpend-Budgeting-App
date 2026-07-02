# SmartSpend Requirements

## Project Overview

SmartSpend is a full-stack budgeting and spending insight web application designed to help users track income, expenses, spending habits, budgeting goals, savings goals, recurring transactions, and financial trends. The application provides transaction management, budgeting tools, spending analytics, category breakdowns, monthly filtering, recurring transaction management, CSV exporting, and dashboard summaries to help users better understand and manage their finances.

The application uses a React frontend, Express backend, and PostgreSQL database.

---

# Must Have Requirements

## 1. Transaction Management

Users can create, edit, and delete income and expense transactions.

**Verification:** Create, edit, and delete transactions and verify changes appear in the application dashboard and PostgreSQL database.

---

## 2. Transaction Categorization

Users can assign categories to transactions.

**Verification:** Create transactions using multiple categories and verify they display correctly.

---

## 3. Financial Dashboard

The application displays:

- Total Income
- Total Expenses
- Current Balance
- Largest Expense
- Most Used Category
- Transaction Count

**Verification:** Dashboard values update automatically when transaction data changes.

---

## 4. Persistent Data Storage

Transaction and budgeting data is stored in PostgreSQL.

**Verification:** Restart the application and verify saved data remains available.

---

## 5. Monthly Analytics

Users can filter transactions by month and visualize monthly spending trends.

**Verification:** Select different months and verify displayed transactions and spending charts update correctly.

---

## 6. Budget Goal Tracking

Users can create monthly budgets and track progress toward those budgets.

**Verification:** Create a budget and verify progress tracking calculations update correctly.

---

## 7. Spending Insights

The application provides automated spending insights based on user spending patterns and budget data.

**Verification:** Demonstrate insight generation using sample transaction and budget data.

---

## 8. Category Spending Breakdown

The application displays spending totals grouped by category.

**Verification:** Demonstrate category spending summaries using multiple transactions.

---

# Stretch Requirements

## 1. Responsive Mobile Design

The application supports mobile-friendly layouts and remains usable on smaller screen sizes.

**Verification:** Demonstrate the application functioning correctly in a mobile-sized browser window.

---

## 2. CSV Export

Users can export transaction data to a CSV file.

**Verification:** Export transaction data and verify the CSV contents match stored transaction data.

---

## 3. Savings Goal Tracking

Users can create savings goals and track progress toward achieving them.

**Verification:** Create a savings goal and verify progress updates when contributions are added.

---

## 4. Recurring Transactions

Users can create recurring transactions that automatically populate future months.

**Verification:** Create a recurring transaction and verify future entries are generated according to user settings.

---

# Additional Polish Features

- Transaction search
- Collapsible recurring transaction groups
- Edit/Delete options for generated recurring transaction entries
- Year filter for Monthly Expense Chart
- Mobile-friendly UI improvements
- Improved chart and transaction organization

---

# Current Status

## Completed

- Transaction creation, editing, and deletion
- Transaction categorization
- PostgreSQL database integration
- Dashboard summaries
- Financial statistics
- Monthly transaction filtering
- Monthly expense visualization
- Budget goal tracking
- Budget progress bar
- Budget warning system
- Spending insights
- Category spending breakdown
- Responsive mobile design
- CSV export
- Savings goal tracking
- Savings contributions recorded as expenses
- Recurring transaction creation
- Recurring transaction generation
- Collapsible recurring transaction groups
- Edit/Delete options for recurring entries
- Year-based filtering for the Monthly Expense Chart
- Transaction search
- Comprehensive feature testing
- User interface refinements
- Application stability improvements

## Remaining Work: Week 12

- Final code cleanup and organization
- Final documentation review
- Prepare and practice final demonstration
- Perform final verification of all requirements

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
Express API  
↓  
PostgreSQL Database  
↓  
Dashboard Output

---

# Last Updated

Week 11