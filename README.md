# Spend Wise – Week 6 Interactive Budget Tracker

SpendWise is a personal budgeting web application that helps users track their monthly budget and expenses. In Week 7, the project was enhanced to be fully interactive using JavaScript.

## Improvements Made This Week

- Added a form to add new expenses (description, amount, category, and date).
- Added controls to set a monthly budget.
- Implemented a live dashboard that shows:
  - Total expenses
  - Remaining balance
  - Budget status messages
- Added a dynamic transactions list that updates when new expenses are added.
- All updates happen directly on the webpage, not just in the console.

## How Conditionals Are Used

- To validate user input:
  - Check that the description is not empty.
  - Check that the amount is a positive number.
  - Check that a date is selected.
- To provide budget feedback:
  - If remaining balance < 0 → “You have exceeded your budget.”
  - If remaining balance < 20% of the budget → “You are close to your budget limit.”
  - Otherwise → “You are within your budget.”

## How Arrays Are Used

- A single array `expenses` stores all expense records.
- Each expense is an object:
  ```js
  {
    id: 1728300000000,
    description: "Grocery shopping",
    amount: 2500,
    category: "Food",
    date: "2026-10-07"
  }
  ```
- New expenses are added using `expenses.push(newExpense)`.

## How Loops Are Used

- A `for...of` loop in `calculateTotalExpenses()` goes through the `expenses` array to sum all amounts.
- A `for...of` loop in `renderTransactions()` goes through the `expenses` array to create and insert HTML for each transaction into the page.

## How the DOM Is Updated

- `textContent` is used to update:
  - Total expenses value
  - Remaining balance value
  - Status messages
- `document.createElement`, `appendChild`, and `innerHTML` are used to:
  - Create transaction items
  - Insert them into the `#dynamicTransactionList` section

## How User Interactions Are Handled Through Events

- `setBudgetBtn` has a `"click"` event listener that:
  - Reads the budget input
  - Validates it
  - Updates `monthlyBudget`
  - Calls `updateDashboard()`
- `expense-form` has a `"submit"` event listener that:
  - Prevents default form submission
  - Reads and validates input
  - Adds a new expense to the `expenses` array
  - Calls `updateDashboard()` to refresh the UI
- The original “Start Budgeting” and “Add Expense” buttons from Week 5/6 still work using `prompt()` and also update the same data and UI.

## Challenges Encountered and How They Were Resolved

- **Challenge:** The transaction list did not update after adding a new expense.  
  **Solution:** Ensured that `updateDashboard()` (which calls `renderTransactions()`) is called every time a new expense is pushed into the `expenses` array.

- **Challenge:** Budget status message was not changing correctly.  
  **Solution:** Added clear conditional logic in `updateDashboard()` to handle three cases: no budget set, within budget, close to limit, and exceeded.

- **Challenge:** Keeping the old Week 5/6 button behavior while adding new form-based behavior.  
  **Solution:** Both approaches update the same `expenses` array and call the same `updateDashboard()` function, so the UI stays consistent.

## How to Run the Project

1. Clone or download the repository.
2. Open `index.html` in a browser (or use Live Server in VS Code).
3. Set a monthly budget using the “Set Monthly Budget” control.
4. Add expenses using the “Add New Expense” form.
5. Observe how the totals, balance, and transaction list update automatically.

## Files

- `index.html` – Page structure and layout
- `style.css` – Styling for the dashboard
- `script.js` – JavaScript logic (arrays, loops, conditionals, DOM, events)
- `README.md` – This file
