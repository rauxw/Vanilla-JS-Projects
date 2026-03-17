// Data variables
let transactions = [
  {
    id: 1,
    date: "Jun 12, 2025",
    desc: "Salary",
    category: "Income",
    type: "income",
    amount: 12000,
  },
  {
    id: 2,
    date: "Jun 12, 2025",
    desc: "Lunch",
    category: "Food",
    type: "expense",
    amount: 100,
  },
  {
    id: 3,
    date: "Jun 13, 2025",
    desc: "Bus Ticket",
    category: "Transportation",
    type: "expense",
    amount: 50,
  },
  {
    id: 4,
    date: "Jun 14, 2025",
    desc: "Rent Payment",
    category: "Housing",
    type: "expense",
    amount: 800,
  },
  {
    id: 5,
    date: "Jun 15, 2025",
    desc: "Movie Night",
    category: "Entertainment",
    type: "expense",
    amount: 60,
  },
  {
    id: 6,
    date: "Jun 16, 2025",
    desc: "Clothes Shopping",
    category: "Shopping",
    type: "expense",
    amount: 150,
  },
];

function calculateCategorySpending() {
  let food = 0;
  let transportation = 0;
  let housing = 0;
  let entertainment = 0;
  let shopping = 0;

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      switch (tx.category.toLocaleLowerCase()) {
        case "food":
          food += tx.amount;
          break;
        case "transportation":
          transportation += tx.amount;
          break;
        case "housing":
          housing += tx.amount;
          break;
        case "entertainment":
          entertainment += tx.amount;
          break;
        case "shopping":
          shopping += tx.amount;
      }
    }
  });

  return { food, transportation, housing, entertainment, shopping };
}

function calculateTotalBalance() {
  let income = 0;
  let expense = 0;

  transactions.forEach((tx) => {
    if (tx.type === "income") {
      income += tx.amount;
    } else {
      expense += tx.amount;
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
    savingsRate: income ? Math.round(((income - expense) / income) * 100) : 0,
  };
}
// Data formatted
const dataCategory = calculateCategorySpending();
const totalData = calculateTotalBalance();

// Main Common Elements
const content = document.getElementById("content");

// DashBoard Section

// button switch
const dashBoardEl = document.getElementById("dashboard-el");

function loadDashboard() {
  content.innerHTML = `
      <div class="display-variables-div">
          <div class="display-variable-info">
            <div class="display-variable-info-text">Total balance</div>
            <div class="display-variable-data" id="balance-el">$ ${totalData.balance}</div>
          </div>
          <div class="display-variable-info">
            <div class="display-variable-info-text">Monthly Income</div>
            <div class="display-variable-data" id="income-el">$ ${totalData.income}</div>
          </div>
          <div class="display-variable-info">
            <div class="display-variable-info-text">Monthly Expense</div>
            <div class="display-variable-data" id="expense-el">$ ${totalData.expense}</div>
          </div>
          <div class="display-variable-info">
            <div class="display-variable-info-text">Savings Rate</div>
            <div class="display-variable-data" id="savings-el">${totalData.savingsRate}%</div>
          </div>
        </div>
        <div class="display-graphics-div">
          <div class="graphics-chart-circle-div">
            <h2>Spending by Category</h2>
            <canvas id="circle-chart"></canvas>
          </div>
          <div class="graphics-chart-graph-div">
            <h2>Monthly Overview</h2>
            <canvas id="bar-chart"></canvas>
          </div>
      </div>
        `;
  const circleChart = document.getElementById("circle-chart");
  const barChart = document.getElementById("bar-chart");

  new Chart(circleChart, {
    type: "doughnut",
    data: {
      labels: [
        "Food",
        "Transportation",
        "Housing",
        "Entertainment",
        "Shopping",
      ],
      datasets: [
        {
          label: "Spending by category",
          data: [
            dataCategory.food,
            dataCategory.transportation,
            dataCategory.housing,
            dataCategory.entertainment,
            dataCategory.shopping,
          ],
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffcd56",
            "#4bc0c0",
            "#9966ff",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  new Chart(barChart, {
    type: "bar",
    data: {
      labels: ["June"], // only one month
      datasets: [
        {
          label: "Income",
          data: [totalData.income],
          backgroundColor: "#4CAF50",
        },
        {
          label: "Expenses",
          data: [totalData.expense],
          backgroundColor: "#F44336",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// loadDashboard();

dashBoardEl.addEventListener("click", loadDashboard);

// Transaction Section

// button switch
const transactionEl = document.getElementById("transactions-el");

function openModalTransaction(type = "add", data = {}) {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal">
      <h2>Add transaction</h2>
      <label>Description</label>
      <input type="text" id="desc" placeholder="Description" value="Lunch"/>
      <label>Amount</label>
      <input type="number" id="amount" placeholder="Amount" value="45"/>

      <label>Type</label>
      <select id="type">
        <option value="income">Income</option>
        <option value="expense" >Expense</option>
      </select>

      <label>Category</label>
      <select id="category">
        <option value="food">Food</option>
        <option value="transportation">Transportation</option>
        <option value="housing">Housing</option>
        <option value="entertainment">Entertainment</option>
        <option value="shopping">Shopping</option>
      </select>

      <button id="save-btn">Save</button>
      <button id="close-btn">Cancel</button>
    </div>`;

  document.body.append(modal);
  // Close
  modal.querySelector("#close-btn").addEventListener("click", () => {
    modal.remove();
  });

  // Save
  modal.querySelector("#save-btn").addEventListener("click", () => {
    const desc = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    const newTransaction = {
      id: Date.now(),
      date: new Date().toDateString(),
      desc: desc,
      category: category,
      type: type,
      amount: amount,
    };

    transactions.push(newTransaction);
    renderTransactions();
    modal.remove();
  });
}

function renderTransactions() {
  const tableMain = document.querySelector(".table-main");
  tableMain.innerHTML = `
    <tr class="table-header">
      <th>Date</th>
      <th>Description</th>
      <th>Category</th>
      <th>Type</th>
      <th>Amount</th>
      <th>Actions</th>
    </tr>
  `;

  transactions.forEach((tx) => {
    tableMain.innerHTML += `
      <tr class="table-category">
          <td id="category-date-el">${tx.date}</td>
          <td id="category-description-el">${tx.desc}</td>
          <td id="category-el">${tx.category}</td>
          <td id="category-type-el">${tx.type}</td>
          <td id="category-amount-el">${tx.type === "income" ? "+" : "-"}$${
      tx.amount
    }</td>
          <td class="category-input-special">
            <button class="edit-category-btn" data-id="${tx.id}">Edit</button>
            <button class="delete-category-btn" data-id="${
              tx.id
            }">Delete</button>
          </td>
      </tr>
    `;
  });
}

function loadTransactions() {
  content.innerHTML = `
       <div class="transactions-header">
          <div class="transactions-title">Transactions</div>
          <button id="add-transactions-btn">+ Add Transactions</button>
        </div>
        <table class="table-main">
        </table>
  `;
  renderTransactions();
  document
    .getElementById("add-transactions-btn")
    .addEventListener("click", () => {
      openModalTransaction("add");
    });

  document.querySelectorAll(".edit-category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModalTransaction("edit", {
        desc: "Salary",
        amount: 12000,
      });
    });
  });

  document.querySelector(".table-main").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-category-btn")) {
      const id = Number(e.target.dataset.id);
      transactions = transactions.filter((tx) => tx.id !== id);
      renderTransactions();
    }
  });
}

transactionEl.addEventListener("click", loadTransactions);

// Budget Section

let budgets = [
  { category: "Food", limit: 300 },
  { category: "Transportation", limit: 200 },
  { category: "Housing", limit: 1000 },
  { category: "Entertainment", limit: 250 },
  { category: "Shopping", limit: 150 },
];

function getCategorySpend(category) {
  let total = 0;
  let img = "";
  transactions.forEach((tx) => {
    if (
      tx.type === "expense" &&
      tx.category.toLowerCase() === category.toLowerCase()
    ) {
      total += tx.amount;
      img = `images/${category.toLowerCase()}-logo.png`;
    }
  });
  return { total, img };
}

// button switch
const budgetsEl = document.getElementById("budgets-el");

function loadBudgets() {
  content.innerHTML = `
       <div class="budget-header">
          <div class="budget-title">Budget Categories</div>
          <button id="add-budget-btn">+ Add Budget</button>
        </div>
        <div class="budget-cards-container" id="budget-container-el"></div>
  `;

  const budgetContainerEl = document.getElementById("budget-container-el");

  budgets.forEach((budget) => {
    const spend = getCategorySpend(budget.category);
    const remaining = budget.limit - spend.total;
    const percent = Math.min((spend.total / budget.limit) * 100, 100);

    budgetContainerEl.innerHTML += `
    <div class="budget-category-card">
        <div class="budget-category-card-header">
          <img class="budget-category-card-img" src="${
            spend.img
          }" alt="food logo"></img>
          <div class="budget-category-info">
            <div class="budget-category-title">${budget.category}</div>
            <div class="budget-category-price">Budget: $${budget.limit}</div>
          </div>
        </div>
        <div class="budget-card-sub-info-section">
          <div class="budget-card-sub-info-text">Spend: $${
            spend.total
          } / Remaining: $${remaining}</div>
          <div class="budget-card-sub-info-progress-bar">
            <div style="
              width: ${percent}%;
              height: 100%;
              background: ${percent > 100 ? "red" : "green"};
              border-radius:8px;
            "></div>
          </div>
          <div class="budget-card-sub-info-footer">
            <div class="budget-card-sub-info-percent">${percent.toFixed(
              0
            )}% of budget</div>
            <div class="budget-card-sub-info-money-left">$${remaining} left</div>
          </div>
        </div>
    </div>
  `;
  });
}

budgetsEl.addEventListener("click", loadBudgets);

//Reports Section

//button switch
const reportsEl = document.getElementById("reports-el");

//reports-chart-circle

function monthName() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[new Date().getMonth()];
}

function loadReports() {
  const month = monthName();
  const year = new Date().getFullYear();
  content.innerHTML = `
        <div class="budget-header">
          <div class="budget-title">Reports</div>
          <button id="add-budget-btn">${month} ${year}</button>
        </div>
        <div class="chart-container">
          <div class="chart-title">Income vs Expenses</div>
          <canvas id="reports-circle-chart"></canvas>
        </div>
  `;
  const reportChartCircleEl = document.getElementById("reports-circle-chart");
  new Chart(reportChartCircleEl, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          label: "Income vs Expenses",
          data: [totalData.income, totalData.expense],
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffcd56",
            "#4bc0c0",
            "#9966ff",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

reportsEl.addEventListener("click", loadReports);

// Savings section

// button switch
const savingsEl = document.getElementById("savings-el");

function loadSavings() {
  content.innerHTML = `
    <div class="goal-header">
          <div class="goal-title">Saving Goals</div>
          <button id="add-goal-btn">+ Add Goals</button>
        </div>
        <div class="goals-container">
          <div class="goal-card">
            <div class="goal-card-header">
              <div class="goal-card-header-left">
                <div class="goal-card-header-left-title">New Car Savings</div>
                <div class="goal-card-header-left-subtitle">
                  Target:$120000.00
                </div>
              </div>
              <div class="goal-card-header-right-text">289 days left</div>
            </div>
            <div class="goal-card-progress-bar"></div>
            <div class="goal-card-footer">
              <div class="goal-card-footer-left-text">
                Saved: $1000.00(0.8%)
              </div>
              <div class="goal-card-footer-right-date">Mar 28, 2026</div>
            </div>
          </div>
        </div>
  `;
}

savingsEl.addEventListener("click", loadSavings);

// main section

loadDashboard();
