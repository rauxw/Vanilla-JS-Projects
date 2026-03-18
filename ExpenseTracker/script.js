// Data variables
let transactions = JSON.parse(localStorage.getItem("transactions")) || [
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

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("budgets", JSON.stringify(budgets));
  localStorage.setItem("goals", JSON.stringify(goals));
}

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

// Main Common Elements
const content = document.getElementById("content");

// DashBoard Section

// button switch
const dashBoardEl = document.getElementById("dashboard-el");

function loadDashboard() {
  const dataCategory = calculateCategorySpending();
  const totalData = calculateTotalBalance();
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
    saveData();
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
      saveData();
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

function openBudgetModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal">
      <h2>Add Budget</h2>
      <label>Category</label>
      <select id="budget-category">
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Housing">Housing</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
      </select>
      <label>Limit</label>
      <input type="number" id="budget-limit" placeholder="Enter amount"/>
      <button id="save-budget-btn">Save</button>
      <button id="close-budget-btn">Cancel</button>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#close-budget-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#save-budget-btn").addEventListener("click", () => {
    const category = document.getElementById("budget-category").value;
    const limit = Number(document.getElementById("budget-limit").value);

    if (!limit) {
      return;
    }

    const exists = budgets.find(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );

    if (exists) {
      alert(`${category} Budget already exists`);
      return;
    }

    budgets.push({ category, limit });
    saveData();
    modal.remove();
    loadBudgets();
  });
}

function openEditBudgetModal(category) {
  const budget = budgets.find(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );

  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal">
      <h2>Edit Budget</h2>

      <label>Category</label>
      <input type="text" value="${budget.category}" disabled />

      <label>Limit</label>
      <input type="number" id="edit-budget-limit" value="${budget.limit}"/>

      <button id="update-budget-btn">Update</button>
      <button id="close-budget-btn">Cancel</button>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#close-budget-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#update-budget-btn").addEventListener("click", () => {
    const limit = Number(document.getElementById("edit-budget-limit").value);

    budget.limit = limit;
    saveData();
    modal.remove();
    loadBudgets();
  });
}

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
              background: ${percent > 80 ? "orange" : "green"};
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
        <div class="budget-cards-btns-div">
            <button class="edit-budget-btn" data-category="${
              budget.category
            }">Edit
            </button>
            <button class="delete-budget-btn" data-category="${
              budget.category
            }">Delete
            </button>
        </div>
    </div>
  `;
  });

  document.querySelectorAll(".delete-budget-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      budgets = budgets.filter(
        (b) => b.category.toLowerCase() !== category.toLowerCase()
      );
      saveData();
      loadBudgets();
    });
  });

  document.querySelectorAll(".edit-budget-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      openEditBudgetModal(category);
    });
  });

  document
    .getElementById("add-budget-btn")
    .addEventListener("click", openBudgetModal);
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
let goals = [
  {
    id: 1,
    title: "New Car Savings",
    target: 120000,
    saved: 1000,
    deadline: "2026-03-28",
  },
];

// button switch
const savingsEl = document.getElementById("savings-el");

function loadSavings() {
  content.innerHTML = `
    <div class="goal-header">
          <div class="goal-title">Saving Goals</div>
          <button id="add-goal-btn">+ Add Goals</button>
        </div>
        <div class="goals-container" id="goals-container"></div>
  `;

  const goalsContainer = document.getElementById("goals-container");

  goals.forEach((goal) => {
    const percent = ((goal.saved / goal.target) * 100).toFixed(1);
    const daysLeft = (
      Math.ceil(new Date(goal.deadline) - new Date()) /
      (1000 * 60 * 60 * 24)
    ).toFixed(0);
    goalsContainer.innerHTML += `
    <div class="goal-card">
            <div class="goal-card-header">
              <div class="goal-card-header-left">
              <div class="goal-card-header-left-title">${goal.title}</div>
              <div class="goal-card-header-left-subtitle">
                Target:$${goal.target}
              </div>
            </div>
            <div class="goal-card-header-right-text">${daysLeft} days left</div>
        </div>
          <div class="goal-card-progress-bar">
            <div style="
                width: ${percent}%;
                height: 100%;
                background: ${percent >= 100 ? "green" : "blue"};
              ">
            </div>
          </div>
          <div class="goal-card-footer">
            <div class="goal-card-footer-left-text">
              Saved: $${goal.saved} (${percent}%)
            </div>
            <div class="goal-card-footer-right-date">${new Date(
              goal.deadline
            ).toDateString()}
            </div>
          </div>
          <div class="goal-card-btn-div">
            <button class="add-saved-money-goal-btn" data-id="${
              goal.id
            }">+ Add</button>
            <button class="delete-goal-btn" data-id="${
              goal.id
            }">- Delete</button>
          </div>
    </div>
    `;
  });

  document
    .getElementById("add-goal-btn")
    .addEventListener("click", openAddSavingsModal);

  document.querySelectorAll(".delete-goal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      goals = goals.filter((g) => g.id !== id);
      saveData();
      loadSavings();
    });
  });

  document.querySelectorAll(".add-saved-money-goal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      openAddMoneyModal(id);
    });
  });
}

function openAddSavingsModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal">
      <h2>Add Goal</h2>
      <input type="text" id="goal-title" placeholder="Goal name"/>
      <input type="number" id="goal-target" placeholder="Target name"/>
      <input type="date" id="goal-deadline"/>
      <button id="save-goal-btn-modal">Save</button>
      <button id="close-goal-btn-modal">Cancel</button>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#close-goal-btn-modal").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#save-goal-btn-modal").addEventListener("click", () => {
    const goalTitle = document.getElementById("goal-title").value;
    const goalNumber = Number(document.getElementById("goal-target").value);
    const goalDate = document.getElementById("goal-deadline").value;

    if (!goalTitle || !goalNumber || !goalDate) {
      return;
    }

    goals.push({
      id: Date.now(),
      title: goalTitle,
      target: goalNumber,
      saved: 0,
      deadline: goalDate,
    });
    saveData();
    modal.remove();
    loadSavings();
  });
}

function openAddMoneyModal(id) {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal">
      <h2>Add Savings</h2>
      <input type="number" id="add-amount-savings-btn" placeholder="Amount"/>
      <button id="add-savings-money-btn">Add</button>
      <button id="close-savings-money-btn">Cancel</button>
    </div>
  `;

  document.body.append(modal);

  modal
    .querySelector("#close-savings-money-btn")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal
    .querySelector("#add-savings-money-btn")
    .addEventListener("click", () => {
      const addMoney = Number(
        document.getElementById("add-amount-savings-btn").value
      );
      const goal = goals.find((g) => g.id === id);

      transactions.push({
        id: Date.now(),
        date: new Date().toDateString(),
        desc: `Savings: ${goal.title}`,
        category: "Savings",
        type: "expense",
        amount: addMoney,
      });
      saveData();
      goal.saved += addMoney;
      modal.remove();
      loadSavings();
    });
}

savingsEl.addEventListener("click", loadSavings);

// main section

loadDashboard();
