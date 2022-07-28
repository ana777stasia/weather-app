let currentDate = document.querySelector("#current-day");
let time = document.querySelector("#current-time");
let date = new Date();
let months = [
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
let currentMonth = months[date.getMonth()];
let currentDay = date.getDate();
let currentYear = date.getFullYear();
let currentMinutes = date.getMinutes();
let currentHours = date.getHours();

if (currentMinutes < 10) {
  currentMinutes = "0".concat(currentMinutes);
}

currentDate.innerHTML = `${currentDay} ${currentMonth} ${currentYear}`;
time.innerHTML = `${currentHours}:${currentMinutes}`;

function showWeatherData(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp-data").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#sky-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

function changeCityName(event) {
  event.preventDefault();
  let apiKey = "f26f7a1bde9f9ef7818f1bda2d4d548a";
  let cityName = document.querySelector("#search-field").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherData);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCityName);

function fahrenheitConverter(event) {
  event.preventDefault();
  let tempInCelsius = document.querySelector("#current-temp-data");
  tempInCelsius.innerHTML = 89;
}

let convertToFahrenheit = document.querySelector("#temp-in-fahrenheit");
convertToFahrenheit.addEventListener("click", fahrenheitConverter);

function celsiusConverter(event) {
  event.preventDefault();
  let tempInFahrenheit = document.querySelector("#current-temp-data");
  tempInFahrenheit.innerHTML = 31;
}

let convertToCelsius = document.querySelector("#temp-in-celsius");
convertToCelsius.addEventListener("click", celsiusConverter);

function showCurrentWeather(response) {
  let cityName = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#current-temp-data");
  let temp = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = temp;
}

function currentPosition(position) {
  let apiKey = "f26f7a1bde9f9ef7818f1bda2d4d548a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", showPosition);
