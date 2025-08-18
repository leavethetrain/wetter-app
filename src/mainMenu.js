import { rootElement } from "./main";
import { renderLoadingScreen } from "./loadingScreen";
import { loadDetailView } from "./detailView";
import { getForecastWeather } from "./api";
import { getConditionImagePath } from "./condition";
import { searchCities } from "./api";

export async function loadCities() {
  rootElement.classList.remove("show-background");
  renderLoadingScreen("Lade Übersicht...");
  await renderMainMenu();
}

async function renderMainMenu() {
  rootElement.classList.remove("show-background");
  const citiesHtml = await getCities();
  rootElement.innerHTML = `
    <div class="main-menu">
      ${getMenuHeaderHtml()}
      <div class="weather__fav">${citiesHtml}</div>
    </div>
  `;

  const editBtn = document.querySelector(".main-menu__edit");
  editBtn.addEventListener("click", () => {
    document.querySelectorAll(".main-menu__delete-button").forEach((btn) => {
      btn.classList.toggle("main-menu__delete-button--visible");
    });
  });

  eventListeners();
}

function eventListeners() {
  const cities = document.querySelectorAll(".main-menu__citys");
  const searchInput = document.querySelector(".main-menu__searchbar");
  const suggestionBox = document.querySelector(".main-menu__suggestions");

  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityName = city.getAttribute("data-city-name");
      loadDetailView(cityName);
    });
  });
  searchInput.addEventListener("input", async () => {
    const userinput = searchInput.value.trim();
    if (userinput.length < 1) {
      suggestionBox.innerHTML = "";
      return;
    }

    const results = await searchCities(userinput);

    suggestionBox.innerHTML = results
      .map(
        (city) =>
          `<div class="main-menu__suggestion" data-city="${city.name}">
           ${city.name}, ${city.country}
         </div>`
      )
      .join("");

    document
      .querySelectorAll(".main-menu__suggestion")
      .forEach((suggestion) => {
        suggestion.addEventListener("click", () => {
          const cityName = suggestion.getAttribute("data-city");
          loadDetailView(cityName);
          suggestionBox.innerHTML = "";
        });
      });
    document.addEventListener("click", (e) => {
      if (
        !searchInput.contains(e.target) &&
        !suggestionBox.contains(e.target)
      ) {
        suggestionBox.innerHTML = "";
      }
    });
  });

  document.querySelectorAll(".main-menu__delete-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cityDiv = btn.nextElementSibling;
      const cityName = cityDiv.getAttribute("data-city-name");

      const favoriteCities = getFavoriteCities();
      const newFavoriteCities = favoriteCities.filter(
        (city) => city !== cityName
      );
      saveFavoriteCities(newFavoriteCities);
      renderMainMenu();
    });
  });
}

function getMenuHeaderHtml() {
  return `<div class="main-menu__header">
           <h1>Wetter</h1>
           <button class="main-menu__edit">bearbeiten</button>
          </div>
          <div class="main-menu__search">
           <input class="main-menu__searchbar" type="text" placeholder="City..." />
          <div class="main-menu__suggestions"></div>
         </div>
         `;
}

export function getFavoriteCities() {
  const stored = localStorage.getItem("favoriteCities");
  return stored ? JSON.parse(stored) : [];
}

export function saveFavoriteCities(cities) {
  localStorage.setItem("favoriteCities", JSON.stringify(cities));
}

async function getCities() {
  const favoriteCities = getFavoriteCities();
  const favoriteCityEl = [];

  for (let city of favoriteCities) {
    const weatherData = await getForecastWeather(city, 1);

    const { location, current, forecast } = weatherData;
    const currentDay = forecast.forecastday[0];

    const conditionImage = getConditionImagePath(
      weatherData.current.condition.code,
      weatherData.current.is_day !== 1
    );

    const cityHtml = `<div class="main-menu__cities-wrapper">
                        <button class="main-menu__delete-button "> 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                      </button>
                      <div class="main-menu__citys" data-city-name="${city}" ${
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
                      </div></div>`;

    favoriteCityEl.push(cityHtml);
  }

  return favoriteCityEl.join("");
}
