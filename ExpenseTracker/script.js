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

dashBoardEl.addEventListener("click", loadDashboard);

// Transaction Section
const transactionEl = document.getElementById("transactions-el");

// transactionEl.addEventListener("click", function () {});
