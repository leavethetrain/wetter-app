import { rootElement } from "./main";
import { renderLoadingScreen } from "./loadingScreen";
import { loadDetailView } from "./detailView";

export function loadCities() {
  rootElement.classList.remove("show-background");
  renderLoadingScreen("Lade Übersicht...");
  renderMainMenu();
}

function renderMainMenu() {
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
  return `<div class="main-menu__header">
           <h1>Wetter</h1>
           <button class="main-menu__edit">bearbeiten</button>
          </div>
          <input class="main-menu__searchbar" type="text" placeholder="City..." />
 `;
}

function getCities() {
  const favoriteCities = ["Mannheim", "Muenchen", "Peking"];
  const favoriteCityEl = [];

  for (let city of favoriteCities) {
    const cityHtml = `<div class="main-menu__citys" data-city-name="${city}">
                        <div class="main-menu__cityleft">
                            <h2 class="main-menu__cityleft--location">${city}</h2>
                            <p class="main-menu__cityleft--country">germany</p>
                            <p class="main-menu__cityleft--condition">sonnig</p>
                         </div>
                         <div class="main-menu__cityright">
                            <p class="main-menu__cityright--currenttemp">88°</p>
                            <p class="main-menu__cityright--maxmintemp">H:22° T:22°</p>
                         </div>
                      </div>`;

    favoriteCityEl.push(cityHtml);
  }

  const favoriteCitiesHtml = favoriteCityEl.join("");

  return `<div class="main-menu__city-container">
 ${favoriteCitiesHtml}
</div>`;
}
