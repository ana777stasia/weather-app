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
  console.log(response);
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#current-temp-data");
  document.querySelector("#sky-weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon-element");
  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconElement.setAttribute("src", iconUrl);
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function changeCityName(city) {
  let apiKey = "f26f7a1bde9f9ef7818f1bda2d4d548a";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeatherData);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-field").value;
  changeCityName(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchButton);
changeCityName("Berlin");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-data");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = Math.round(celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-data");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#temp-in-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#temp-in-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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
