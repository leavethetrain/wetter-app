const API_BASE_URL = " https://api.weatherapi.com/v1";
const API_KEY = "f2de29d4f86544338fd200623252606";

export async function getForecastWeather(location, days = 3) {
  const response = await fetch(
    `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&lang=de&days=${days}`
  );

  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}
