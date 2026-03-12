// DOM elements
const temperatureEl = document.getElementById("temperature-el");
const skyConditionEl = document.getElementById("sky-condition-el");
const cityNameEl = document.getElementById("city-name-el");
const countryNameEl = document.getElementById("country-name-el");
const humidityPercentEl = document.getElementById("humidity-el");
const windSpeedEl = document.getElementById("wind-speed-el");
const displayLogoEl = document.getElementById("logo-el");
const inputEl = document.getElementById("city-input-el");
const searchBtnEl = document.getElementById("button-search-el");

// remember to delete this
// Go to this site sign up and get your api key https://www.weatherapi.com/
const weatherAPIKEY = "Your api key put here";

const weatherIcons = {
  // ☀️ Sunny / Clear
  1000: "sunny-logo",

  // 🌧 Rain
  1063: "rainy-logo",
  1180: "rainy-logo",
  1183: "rainy-logo",
  1186: "rainy-logo",
  1189: "rainy-logo",
  1192: "rainy-logo",
  1195: "rainy-logo",
  1240: "rainy-logo",
  1243: "rainy-logo",
  1246: "rainy-logo",

  // ❄️ Cold / Snow
  1066: "cold-logo",
  1069: "cold-logo",
  1072: "cold-logo",
  1114: "cold-logo",
  1117: "cold-logo",
  1210: "cold-logo",
  1213: "cold-logo",
  1216: "cold-logo",
  1219: "cold-logo",
  1222: "cold-logo",
  1225: "cold-logo",
  1237: "cold-logo",
  1255: "cold-logo",
  1258: "cold-logo",
  1261: "cold-logo",
  1264: "cold-logo",

  // 🌙 Night (you will control using is_day)
  night: "night-logo",
};

async function getData(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKEY}&q=${city}&aqi=yes
`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    const cityName = result.location.name;
    const countryName = result.location.country;
    const countryTemperature = Math.floor(result.current.temp_c);
    const countryHumidity = result.current.humidity;
    const countryWindSpeed = Math.floor(result.current.wind_kph);
    const countryConditionText = result.current.condition.text;
    const countryConditionCode = result.current.condition.code;
    const countryIsDay = result.current.is_day;

    return {
      cityName,
      countryName,
      countryTemperature,
      countryHumidity,
      countryWindSpeed,
      countryConditionText,
      countryConditionCode,
      countryIsDay,
    };
  } catch (error) {
    console.error(error.message);
  }
}

async function renderPage(city) {
  const data = await getData(city);

  const conditionCode = data.countryConditionCode;
  const isDay = data.countryIsDay;

  let icon;

  if (!isDay) {
    icon = "night-logo";
  } else {
    icon = weatherIcons[conditionCode] || "sunny-logo";
  }

  displayLogoEl.src = `./images/${icon}.png`;

  temperatureEl.textContent = data.countryTemperature + "° C";
  skyConditionEl.textContent = data.countryConditionText;
  cityNameEl.textContent = data.cityName + ",";
  countryNameEl.textContent = data.countryName;
  humidityPercentEl.textContent = data.countryHumidity + "%";
  windSpeedEl.textContent = data.countryWindSpeed + " Km/h ";
}

async function main() {
  searchBtnEl.addEventListener("click", function () {
    const cityName = inputEl.value;
    renderPage(cityName);
  });
}

main();
