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
            <div class="display-variable-data" id="balance-el">$ 11150</div>
          </div>
          <div class="display-variable-info">
            <div class="display-variable-info-text">Monthly Income</div>
            <div class="display-variable-data" id="income-el">$ 12000</div>
          </div>
          <div class="display-variable-info">
            <div class="display-variable-info-text">Monthly Expense</div>
            <div class="display-variable-data" id="expense-el">$ 850.56</div>
          </div>
          <div class="display-variable-info">
            <div class="display-variable-info-text">Savings Rate</div>
            <div class="display-variable-data" id="savings-el">92%</div>
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
          data: [200, 150, 500, 100, 300],
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
          data: [12000],
          backgroundColor: "#4CAF50",
        },
        {
          label: "Expenses",
          data: [850],
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

function loadTransactions() {
  content.innerHTML = `
       <div class="transactions-header">
          <div class="transactions-title">Transactions</div>
          <button id="add-transactions-btn">+ Add Transactions</button>
        </div>
        <table>
          <tr class="table-header">
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
          <tr class="table-category">
            <td id="category-date-el">Jun 12, 2025</td>
            <td id="category-description-el">Salary</td>
            <td id="category-el">Income</td>
            <td id="category-type-el">income</td>
            <td id="category-amount-el">+$12000</td>
            <td class="category-input-special">
              <button id="edit-category-el">Edit</button>
              <button id="delete-category-el">Delete</button>
            </td>
          </tr>
          <tr class="table-category">
            <td id="category-date-el">Jun 12, 2025</td>
            <td id="category-description-el">Lunch</td>
            <td id="category-el">Food</td>
            <td id="category-type-el">Expense</td>
            <td id="category-amount-el">-$100</td>
            <td class="category-input-special">
              <button id="edit-category-el">Edit</button>
              <button id="delete-category-el">Delete</button>
            </td>
          </tr>
        </table>
  `;
}

transactionEl.addEventListener("click", loadTransactions);

// Budget Section

// button switch
const budgetsEl = document.getElementById("budgets-el");

function loadBudgets() {
  content.innerHTML = `
       <div class="budget-header">
          <div class="budget-title">Budget Categories</div>
          <button id="add-budget-btn">+ Add Budget</button>
        </div>
        <div class="budget-cards-container">
          <div class="budget-category-card">
            <div class="budget-category-card-header">
              <img class="budget-category-card-img" src="images/food-logo.png" alt="food logo "></img>
              <div class="budget-category-info">
              <div class="budget-category-title">Food</div>
              <div class="budget-category-price">Budget: $200.00</div>
            </div>
          </div>
          <div class="budget-card-sub-info-section">
            <div class="budget-card-sub-info-text">Spend: $200.00 / Remaining: $100.00</div>
            <div class="budget-card-sub-info-progress-bar"></div>
            <div class="budget-card-sub-info-footer">
              <div class="budget-card-sub-info-percent">67% of budget</div>
              <div class="budget-card-sub-info-money-left">$100.00 left</div>
            </div>
          </div>
        </div>
         <div class="budget-category-card">
          <div class="budget-category-card-header">
            <img class="budget-category-card-img" src="images/food-logo.png" alt="food logo "></img>
            <div class="budget-category-info">
              <div class="budget-category-title">Food</div>
              <div class="budget-category-price">Budget: $200.00</div>
            </div>
          </div>
          <div class="budget-card-sub-info-section">
            <div class="budget-card-sub-info-text">Spend: $200.00 / Remaining: $100.00</div>
            <div class="budget-card-sub-info-progress-bar"></div>
            <div class="budget-card-sub-info-footer">
              <div class="budget-card-sub-info-percent">67% of budget</div>
              <div class="budget-card-sub-info-money-left">$100.00 left</div>
            </div>
          </div>
        </div>
         <div class="budget-category-card">
          <div class="budget-category-card-header">
            <img class="budget-category-card-img" src="images/food-logo.png" alt="food logo "></img>
            <div class="budget-category-info">
              <div class="budget-category-title">Food</div>
              <div class="budget-category-price">Budget: $200.00</div>
            </div>
          </div>
          <div class="budget-card-sub-info-section">
            <div class="budget-card-sub-info-text">Spend: $200.00 / Remaining: $100.00</div>
            <div class="budget-card-sub-info-progress-bar"></div>
            <div class="budget-card-sub-info-footer">
              <div class="budget-card-sub-info-percent">67% of budget</div>
              <div class="budget-card-sub-info-money-left">$100.00 left</div>
            </div>
          </div>
        </div>
         <div class="budget-category-card">
          <div class="budget-category-card-header">
            <img class="budget-category-card-img" src="images/food-logo.png" alt="food logo "></img>
            <div class="budget-category-info">
              <div class="budget-category-title">Food</div>
              <div class="budget-category-price">Budget: $200.00</div>
            </div>
          </div>
          <div class="budget-card-sub-info-section">
            <div class="budget-card-sub-info-text">Spend: $200.00 / Remaining: $100.00</div>
            <div class="budget-card-sub-info-progress-bar"></div>
            <div class="budget-card-sub-info-footer">
              <div class="budget-card-sub-info-percent">67% of budget</div>
              <div class="budget-card-sub-info-money-left">$100.00 left</div>
            </div>
          </div>
        </div>
      </div>
  `;
}

budgetsEl.addEventListener("click", loadBudgets);

//Reports Section

//button switch
const reportsEl = document.getElementById("reports-el");

//reports-chart-circle

function loadReports() {
  content.innerHTML = `
        <div class="budget-header">
          <div class="budget-title">Reports</div>
          <button id="add-budget-btn">June 2023</button>
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
      labels: ["Expenses", "Income"],
      datasets: [
        {
          label: "Income vs Expenses",
          data: [150, 12000],
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
