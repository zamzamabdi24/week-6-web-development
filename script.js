"use strict";

// =========
// 1. Data (arrays)
// =========

let monthlyBudget = 0;
let expenses = []; // array of expense records

// =========
// 2. DOM elements
// =========

const monthlyBudgetInput = document.getElementById("monthlyBudgetInput");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const budgetStatus = document.getElementById("budgetStatus");

const expenseForm = document.getElementById("expense-form");
const expenseDesc = document.getElementById("expenseDesc");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");
const expenseStatus = document.getElementById("expenseStatus");

const totalExpensesValue = document.getElementById("totalExpensesValue");
const remainingBalanceValue = document.getElementById("remainingBalanceValue");
const balanceStatusText = document.getElementById("balanceStatusText");

const dynamicTransactionList = document.getElementById("dynamicTransactionList");

// Optional: keep old Week 5/6 buttons
const startBudgetButton = document.getElementById("startBudget");
const addExpenseButton = document.getElementById("addExpenseBtn");

// =========
// 3. Helper functions
// =========

function formatCurrency(amount) {
  return "KSh " + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Loop to calculate total expenses
function calculateTotalExpenses() {
  let total = 0;
  for (const exp of expenses) {
    total += exp.amount;
  }
  return total;
}

function calculateRemainingBalance() {
  const total = calculateTotalExpenses();
  return monthlyBudget - total;
}

// =========
// 4. DOM update functions
// =========

function updateDashboard() {
  const total = calculateTotalExpenses();
  const remaining = calculateRemainingBalance();

  totalExpensesValue.textContent = formatCurrency(total);
  remainingBalanceValue.textContent = formatCurrency(remaining);

  // Conditionals for budget feedback
  if (monthlyBudget === 0) {
    balanceStatusText.textContent = "Set a monthly budget to see status.";
    if (budgetStatus) budgetStatus.textContent = "";
  } else if (remaining < 0) {
    balanceStatusText.textContent = "You have exceeded your budget.";
    if (budgetStatus) {
      budgetStatus.textContent = "⚠ Budget exceeded!";
      budgetStatus.style.color = "red";
    }
  } else if (remaining < monthlyBudget * 0.2) {
    balanceStatusText.textContent = "You are close to your budget limit.";
    if (budgetStatus) {
      budgetStatus.textContent = "⚡ Close to limit.";
      budgetStatus.style.color = "orange";
    }
  } else {
    balanceStatusText.textContent = "You are within your budget.";
    if (budgetStatus) {
      budgetStatus.textContent = "✓ On track.";
      budgetStatus.style.color = "green";
    }
  }

  renderTransactions();
}

// Loop to render transactions on the page
function renderTransactions() {
  dynamicTransactionList.innerHTML = "";

  for (const exp of expenses) {
    const item = document.createElement("div");
    item.className = "transaction-item";

    const details = document.createElement("div");
    details.className = "transaction-details";

    const icon = document.createElement("div");
    icon.className = "transaction-icon";

    if (exp.category === "Food") icon.textContent = "🍽";
    else if (exp.category === "Transport") icon.textContent = "⌁";
    else if (exp.category === "Rent") icon.textContent = "⌂";
    else if (exp.category === "Entertainment") icon.textContent = "♪";
    else if (exp.category === "Utilities") icon.textContent = "⚡";
    else icon.textContent = "•";

    const textWrap = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = exp.description;

    const sub = document.createElement("span");
    sub.textContent = `${exp.category} · ${exp.date}`;

    textWrap.appendChild(title);
    textWrap.appendChild(sub);

    details.appendChild(icon);
    details.appendChild(textWrap);

    const amountEl = document.createElement("strong");
    amountEl.className = "transaction-amount expense-amount";
    amountEl.textContent = "- " + formatCurrency(exp.amount);

    item.appendChild(details);
    item.appendChild(amountEl);

    dynamicTransactionList.appendChild(item);
  }
}

// =========
// 5. Event handlers (user interactions)
// =========

function handleSetBudget() {
  const value = parseFloat(monthlyBudgetInput.value);
  if (isNaN(value) || value < 0) {
    budgetStatus.textContent = "Please enter a valid budget amount.";
    budgetStatus.style.color = "red";
    return;
  }
  monthlyBudget = value;
  budgetStatus.textContent = "✓ Monthly budget set.";
  budgetStatus.style.color = "green";
  updateDashboard();
}

function handleAddExpense(e) {
  e.preventDefault();

  const description = expenseDesc.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;
  const date = expenseDate.value;

  // Validation with conditionals
  if (!description || isNaN(amount) || amount <= 0 || !date) {
    expenseStatus.textContent = "Please fill all fields correctly.";
    expenseStatus.style.color = "red";
    return;
  }

  const newExpense = {
    id: Date.now(),
    description,
    amount,
    category,
    date
  };

  expenses.push(newExpense); // array usage

  // Clear form
  expenseDesc.value = "";
  expenseAmount.value = "";
  expenseCategory.value = "Food";
  expenseDate.value = "";

  expenseStatus.textContent = "✓ Expense added.";
  expenseStatus.style.color = "green";

  updateDashboard();
}

// Optional: keep old Week 5/6 button behavior
if (startBudgetButton) {
  startBudgetButton.addEventListener("click", () => {
    const input = prompt("Enter your monthly budget (KSh):");
    const value = parseFloat(input);
    if (!isNaN(value) && value >= 0) {
      monthlyBudget = value;
      alert("Monthly budget set to " + formatCurrency(monthlyBudget));
      updateDashboard();
    } else {
      alert("Invalid budget amount.");
    }
  });
}

if (addExpenseButton) {
  addExpenseButton.addEventListener("click", () => {
    const description = prompt("Expense description:");
    const amountInput = prompt("Amount (KSh):");
    const category = prompt("Category (e.g. Food, Transport):") || "Other";
    const date = prompt("Date (YYYY-MM-DD):") || new Date().toISOString().slice(0, 10);

    const amount = parseFloat(amountInput);

    if (!description || isNaN(amount) || amount <= 0) {
      alert("Invalid expense data.");
      return;
    }

    expenses.push({
      id: Date.now(),
      description,
      amount,
      category,
      date
    });

    updateDashboard();
    alert("Expense added.");
  });
}

// =========
// 6. Attach event listeners
// =========

setBudgetBtn.addEventListener("click", handleSetBudget);
expenseForm.addEventListener("submit", handleAddExpense);

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  expenseDate.valueAsDate = new Date();
  updateDashboard();
});