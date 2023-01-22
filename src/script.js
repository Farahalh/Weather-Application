function displayDate(display) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  //let currentDay = now.getDay();
  let date = now.getDate();

  let months = [
    "Jan",
    "Feb",
    "March",
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
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  //let seconds = now.getSeconds();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${date} ${month} ${year} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
//console.log(document.querySelector("#current-date"));
let now = new Date();
currentDate.innerHTML = displayDate(now);

function form(event) {
  event.preventDefault();
  let test = document.querySelector("#input-city");
  let currentCity = document.querySelector("#current-city");
  console.log(
    "function form is running currently input is " +
      test.value +
      ", before is " +
      currentCity.innerHTML
  );
  currentCity.innerHTML = test.value;
}

function displayWeather(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function loadSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", form);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", loadSubmit);

let currentLocationButton = document.querySelector("#my-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Gothenburg");

function celsius(event) {
  event.preventDefault();
  console.log("celsius is working");
  let temperature = displayWeather;
  temperature.innerHTML = "#temperature";
}

let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  console.log("fahrenheit is working");
  let temperature = Math.round(4 * (9 / 5) + 32);
  temperature.innerHTML = celsius;
  console.log(temperature);
}

let fah = document.querySelector("#fahrenheit-link");
fah.addEventListener("click", fahrenheit);

console.log(fahrenheit);

/*function convertToF(celsius) {
  let fahrenheit = "#temperature" * (9 / 5) + 32;
  return fahrenheit;
}

let far = document.querySelector("fahrenheit-link");
far.addEventListener("click", convertToF)*/
//convertToF(displayWeather);
