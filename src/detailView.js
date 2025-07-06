import { getForecastWeather } from "./api";
import { rootElement } from "./main";
import { renderLoadingScreen } from "./loadingScreen";

export async function loadDetailView() {
  renderLoadingScreen("Lade Wetter für " + "München" + "...");
  const weatherData = await getForecastWeather("Muenchen");

  renderDetailView(weatherData);
}

function renderDetailView(weatherData) {
  const location = weatherData.location.name;
  const temp = Math.round(weatherData.current.temp_c);
  const condition = weatherData.current.condition.text;
  const maxTemp = Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c);
  const minTemp = Math.round(weatherData.forecast.forecastday[0].day.mintemp_c);
  rootElement.innerHTML = getHeaderHtml(
    location,
    temp,
    condition,
    maxTemp,
    minTemp
  );

  const scrollEl = rootElement.querySelector(".scrollable");
  dragScrolling(scrollEl);
  console.log(scrollEl);
}

function getHeaderHtml(location, temp, condition, maxTemp, minTemp) {
  return `<div class="weather">
        <div class="weather__nav">
          <i class="weather__back"></i>
          <button class="weather__fav">
            <svg
              class="weather__star"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="gold"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon
                points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10"
              />
            </svg>
           </button>
        </div>
        <div class="weather__overview">
          <h2 class="weather__city">${location}</h2>
          <h1 class="weather__temp">${temp}°C</h1>
          <p class="weather__status">${condition}</p>
          <div class="weather__day-temp">
            <span class="weather__high-temp">H:${maxTemp}°C</span
            ><span class="weather__low-temp">T:${minTemp}°C</span>
            
          </div>
        </div>
      </div>
      <div class="weather-day-forecast">
      <div class="weather-day-forecast__condition">
        <p class="weather-day-forecast__status">
          Heute sonnig. Wind bis zu kmh
        </p>
      </div>
      <div class="weather-day-forecast__overview scrollable">
        <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
         <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
         <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
         <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
         <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
         <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
         <div class="weather-day-forecast__time">
          <p class="time">jetzt</p>
          <p class="icon">icon</p>
          <p class="temp">temp</p>
        </div>
      </div>
    </div>
      `;
}

function dragScrolling(scrollEl) {
  let isDown = false;
  let startX;
  let scrollX;
  scrollEl.addEventListener("mousedown", (x) => {
    isDown = true;
    startX = x.pageX;
    scrollX = scrollEl.scrollLeft;
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    document.body.style.userSelect = "";
  });

  scrollEl.addEventListener("mouseleave", () => (isDown = false));
  scrollEl.addEventListener("mousemove", (x) => {
    if (!isDown) return;
    x.preventDefault();
    const distance = x.pageX - startX;
    scrollEl.scrollLeft = scrollX - distance;
  });
}
