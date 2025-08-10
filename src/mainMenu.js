import { rootElement } from "./main";
import { renderLoadingScreen } from "./loadingScreen";
import { loadDetailView } from "./detailView";
import { getForecastWeather } from "./api";
import { getConditionImagePath } from "./condition";

export async function loadCities() {
  rootElement.classList.remove("show-background");
  renderLoadingScreen("Lade Übersicht...");
  await renderMainMenu();
}

async function renderMainMenu() {
  rootElement.innerHTML = `
  <div class="main-menu">${getMenuHeaderHtml()}
  ${await getCities()}</div>
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
  return `<div class="main-menu__header">
           <h1>Wetter</h1>
           <button class="main-menu__edit">bearbeiten</button>
          </div>
          <input class="main-menu__searchbar" type="text" placeholder="City..." />
 `;
}

async function getCities() {
  const favoriteCities = ["Mannheim", "Muenchen", "Peking"];
  const favoriteCityEl = [];

  for (let city of favoriteCities) {
    const weatherData = await getForecastWeather(city, 1);

    const { location, current, forecast } = weatherData;
    const currentDay = forecast.forecastday[0];

    const conditionImage = getConditionImagePath(
      weatherData.current.condition.code,
      weatherData.current.is_day !== 1
    );

    const cityHtml = `<div class="main-menu__citys" data-city-name="${city}" ${
      conditionImage ? `style="--condition-image: url(${conditionImage})"` : ""
    }>
                        <div class="main-menu__cityleft">
                            <h2 class="main-menu__cityleft--location">${
                              location.name
                            }</h2>
                            <p class="main-menu__cityleft--country">${
                              location.country
                            }</p>
                            <p class="main-menu__cityleft--condition">${
                              current.condition.text
                            }</p>
                         </div>
                         <div class="main-menu__cityright">
                            <p class="main-menu__cityright--currenttemp">${Math.round(
                              current.temp_c
                            )}°</p>
                            <p class="main-menu__cityright--maxmintemp">H:${Math.round(
                              currentDay.day.maxtemp_c
                            )}° T:${Math.round(currentDay.day.mintemp_c)}°</p>
                         </div>
                      </div>`;

    favoriteCityEl.push(cityHtml);
  }

  const favoriteCitiesHtml = favoriteCityEl.join("");

  return `<div class="main-menu__city-container">
 ${favoriteCitiesHtml}
</div>`;
}
