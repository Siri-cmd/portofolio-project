//weather app

const url = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "appid=207414ebaee9e5ea84e2cf27cf0d1235";
const unitsButton = document.querySelector("button");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const weather = {};
let units = localStorage.getItem("units");
localStorage.setItem("units", "metric");

let unitsCookie = getCookie("units");

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

navigator.geolocation.getCurrentPosition(getWether, showError);

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWether(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  let api = "";

  const celsius = "units=metric";
  const fahrenheit = "units=imperial";

  if (unitsCookie !== "imperial") {
    api = `${url}&lat=${lat}&lon=${long}&${celsius}&${apiKey}`;
  } else {
    api = `${url}&lat=${lat}&lon=${long}&${fahrenheit}&${apiKey}`;
  }

  fetch(api)
    .then((respose) => respose.json())
    .then((data) => {
      weather.temperature = data.main.temp;
      weather.description = data.weather[0].description;
      weather.location = data.name;
      weather.iconId = data.weather[0].icon;
    })
    .then(() => displayWeather());
}
function displayWeather() {
  iconElement.innerHTML = `<img src="img/${weather.iconId}.png">`;
  if (unitsCookie === "metric") {
    tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
  } else {
    tempElement.innerHTML = `${weather.temperature}°<span>F</span>`;
  }
  descElement.innerHTML = `${weather.description}`;
  locationElement.innerHTML = `${weather.location}`;
}

unitsButton.addEventListener("click", () => {
  units = localStorage.getItem("units");
  unitsCookie = getCookie("units");
  console.log(unitsCookie);

  if (unitsCookie === "metric") {
    setCookie("units", "imperial", 100);
    unitsCookie = getCookie("units");
    console.log(unitsCookie);
    navigator.geolocation.getCurrentPosition(getWether, showError);
  } else {
    setCookie("units", "metric", 100);
    unitsCookie = getCookie("units");
    console.log(unitsCookie);
    navigator.geolocation.getCurrentPosition(getWether, showError);
  }
});

// send mail
var email_regex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
);

function sendEmail() {
  var $name_input = document.querySelector('input[name="name"]');
  var $email_input = document.querySelector('input[name="email"]');
  var $subject_input = document.querySelector('input[name="subject"]');
  var $subject_message = document.querySelector('textarea[name="message"]');

  if (email_regex.test($email_input.value)) {
    Email.send({
      Host: "smtp.mailtrap.io",
      Port: 587,
      Username: "9a48516cb2a536",
      Password: "58d1ed89426934",
      To: "bogdan_siriteanu@yahoo.com",
      From: $email_input.value,
      Subject:
        "Mail from: " +
        $name_input.value +
        ", " +
        "Title: " +
        $subject_input.value,
      Body: $subject_message.value,
    }).then(() => swal("Yuhuu!", "mail sent successfully", "success"));
  } else {
    swal("Oops!", "Please insert a valid e-mail", "error");
  }
}
