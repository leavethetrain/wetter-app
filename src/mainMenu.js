import { rootElement } from "./main";
import { renderLoadingScreen } from "./loadingScreen";
import { loadDetailView } from "./detailView";

export function loadCities() {
  rootElement.classList.remove("show-background");
  renderLoadingScreen("Lade Übersicht...");
  renderMainMenu();
}

function renderMainMenu(weatherData) {
  rootElement.innerHTML = `
  <div class="main-menu">${getMenuHeaderHtml()}
  ${getCities()}</div>
  `;

  eventListeners();
}

function eventListeners() {
  const cities = document.querySelectorAll(".main-menu__citys");
  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityName = city.getAttribute("data-city-name");
      loadDetailView(cityName);
    });
  });
}

function getMenuHeaderHtml() {
  return `<div class="main-menu__header"><h1>Wetter</h1><button class="main-menu__edit">bearbeiten</button></div>
  <input class="main-menu__searchbar" type="text" placeholder="City..." />
 `;
}

function getCities() {
  const favoriteCities = ["Mannheim", "Muenchen", "Peking"];
  const favoriteCityEl = [];

  for (let city of favoriteCities) {
    const cityHtml = `<div class="main-menu__citys" data-city-name="${city}">
  <p class="main-menu__city"><span class="main-menu__city--location">${city}</span>
  <span class="main-menu__city--temp-location">88°</span></p>
  <p class="main-menu__weather"><span class="main-menu__weather--condition">sonnig</span>
  <span class="main-menu__weather--condition">H:33° T:33°</span></p>
</div>`;

    favoriteCityEl.push(cityHtml);
  }

  const favoriteCitiesHtml = favoriteCityEl.join("");

  return `<div class="main-menu__city-container">
 ${favoriteCitiesHtml}
</div>`;
}

/*export function renderCities(weatherData) {
  const location = weatherData.location.name;
  const temp = Math.round(weatherData.current.temp_c);
  const condition = weatherData.current.condition.text;
  const maxTemp = Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c);
  const minTemp = Math.round(weatherData.forecast.forecastday[0].day.mintemp_c);

  html += `
  <div class="main-menu__citys">
  <p class="main-menu__city"><span class="main-menu__city--location">${location}</span>
  <span class="main-menu__city--temp-location">${temp}°</span></p>
  <p class="main-menu__weather"><span class="main-menu__weather--condition">${condition}</span>
  <span class="main-menu__weather--condition">H:${maxTemp}° T:${minTemp}°</span></p>
</div>`;

  const container = rootElement.querySelector(".main-menu");
  if (container) {
    container.innerHTML = html;
  }
  renderBackgroundMainMenu();
}*/
