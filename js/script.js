const apikey = "de14dd081d5edaa5d8c7b092f5dd6bca";
const apiCountryURL = "https://flagsapi.com";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  const countryCode = data.sys.country; // Código do país vindo da API
  countryElement.setAttribute(
    "src",
    `${apiCountryURL}/${countryCode}/flat/64.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});
