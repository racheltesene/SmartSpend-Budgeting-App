# Database Schema Plan

## Users Table
- id
- first_name
- last_name
- email
- password_hash
- created_at

## Transactions Table
- id
- user_id
- amount
- transaction_type
- category
- transaction_date
- description
- created_at

## Budgets Table
- id
- user_id
- month
- year
- category
- budget_amount
- created_at

## Relationships
- One user can have many transactions.
- One user can have many budgets.
- Each transaction belongs to one user.
- Each budget belongs to one user.