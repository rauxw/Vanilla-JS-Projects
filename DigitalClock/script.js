const hoursEl = document.getElementById("digit-hours");
const minutesEl = document.getElementById("digit-minutes");
const secondsEl = document.getElementById("digit-seconds");
const displayEl = document.getElementById("display-date-month-year-el");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startClock() {
  const today = new Date();
  let day = today.getDate();
  let month = months[today.getMonth()];
  let year = today.getFullYear();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  hoursEl.textContent = `${hours} :`;
  minutesEl.textContent = `${minutes} :`;
  secondsEl.textContent = seconds;

  displayEl.textContent = `${day} ${month} ${year}`;
  // setInterval(startClock, 1000); uncomment to start clock
}

startClock();
