-- ==========================================
-- SmartSpend Database Schema
-- Rachel Tesene
-- BYU–Idaho CSE 499 Senior Project
-- ==========================================

-- ==========================================
-- Transactions Table
-- ==========================================

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ==========================================
-- Budgets Table
-- ==========================================

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL UNIQUE,
    budget_amount DECIMAL(10,2) NOT NULL
);

-- ==========================================
-- Savings Goals Table
-- ==========================================

CREATE TABLE savings_goals (
    id SERIAL PRIMARY KEY,
    goal_name VARCHAR(100) NOT NULL,
    target_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0
);

-- ==========================================
-- Recurring Transactions Table
-- ==========================================

CREATE TABLE recurring_transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    frequency VARCHAR(20) NOT NULL,
    occurrences INTEGER NOT NULL
);