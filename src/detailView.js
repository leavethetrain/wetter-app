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
  const forecastCondition =
    weatherData.forecast.forecastday[0].day.condition.text;
  const maxWind = weatherData.forecast.forecastday[0].day.maxwind_mph;
  const currentIcon = weatherData.current.condition.icon;

  rootElement.innerHTML = getHeaderHtml(
    location,
    temp,
    condition,
    maxTemp,
    minTemp,
    forecastCondition,
    maxWind,
    currentIcon
  );

  getForecastHours(weatherData);

  const scrollEl = rootElement.querySelector(".scrollable");
  dragScrolling(scrollEl);
  console.log(scrollEl);
}

function getForecastHours(weatherData) {
  let html = "";
  const currentHour = new Date().getHours();
  const todayHours = weatherData.forecast.forecastday[0].hour.slice(
    currentHour + 1
  );
  const tomorrowHours = weatherData.forecast.forecastday[1].hour || [];
  const allHours = [...todayHours, ...tomorrowHours].slice(0, 24);

  allHours.forEach((hours) => {
    const upcomingTime = hours.time.split(" ")[1].split(":")[0];
    const upcomingTemp = Math.round(hours.temp_c);
    const upcomingIcon = hours.condition.icon;

    html += `
        <div class="weather-day-forecast__time">
          <p class="time">${upcomingTime} Uhr</p>
          <p class="icon"><img src="https:${upcomingIcon}"/></p>
          <p class="temp">${upcomingTemp}°C</p>
        </div>`;
  });

  const container = rootElement.querySelector(
    ".weather-day-forecast__overview"
  );
  if (container) {
    container.innerHTML += html;
  }
}

function getHeaderHtml(
  location,
  temp,
  condition,
  maxTemp,
  minTemp,
  forecastCondition,
  maxWind,
  currentIcon
) {
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
              Heute ${forecastCondition}. Wind bis zu ${maxWind} km/h.
              </p>
             </div>

            <div class="weather-day-forecast__overview scrollable">
              <div class="weather-day-forecast__time">
              <p class="time">Aktuell</p>
              <p class="icon"><img src="https:${currentIcon}"/></p>
              <p class="temp">${temp}°C</p>
            </div>
          </div>

         
       
       
       
       
       
       
          </div>
           <div class ="weather-forecast-days"> 
            <div class="weather-forecast-days__header">
              <p>Vohersage für die nächsten 3 Tage</p>
            </div>

            <div class ="weather-forecast-days__overview">
            <div class ="weather-forecast-days__today"><p>Heute</p></div>
            <div class ="weather-forecast-days__tomorrow"><p>DI</p></div>
            <div class ="weather-forecast-days__aftertomorrow"><p>MI</p></div>

            </div>
       
      
         
      </div>
    </div>
      `;
}

function getForecastDays() {}

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
    document.body.style.userSelect = "none";
  });

  scrollEl.addEventListener("mouseleave", () => {
    isDown = false;
    document.body.style.userSelect = "none";
  });
  scrollEl.addEventListener("mousemove", (x) => {
    if (!isDown) return;
    x.preventDefault();
    const distance = x.pageX - startX;
    scrollEl.scrollLeft = scrollX - distance;
  });
}
