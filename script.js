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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 weekly-weather-data">${formatDay(
          forecastDay.dt
        )} <div class="col">${Math.round(forecastDay.temp.max)}°|${Math.round(
          forecastDay.temp.min
        )}°</div>
          <div class="col">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="cloudy"
              class="weekly-weather-icon"
            />
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f26f7a1bde9f9ef7818f1bda2d4d548a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherData(response) {
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
  getForecast(response.data.coord);
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
