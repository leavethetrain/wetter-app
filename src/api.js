const API_BASE_URL = " http://api.weatherapi.com/v1";
const API_KEY = "f2de29d4f86544338fd200623252606";

export async function getCurrentWeather(location) {
  const response = await fetch(
    `${API_BASE_URL}/current.json?key=${API_KEY}&q=${location}$lang=de`
  );

  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}
