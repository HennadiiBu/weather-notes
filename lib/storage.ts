import { WeatherData } from "./weatherApi";

export function saveWeatherToCache(city: string, data: WeatherData) {
  const cache = JSON.parse(localStorage.getItem("weatherCache") || "{}");
  cache[city.toLowerCase()] = data;
  localStorage.setItem("weatherCache", JSON.stringify(cache));
}

export function getCachedWeather(city: string) {
  const cache = JSON.parse(localStorage.getItem("weatherCache") || "{}");
  return cache[city.toLowerCase()];
}

export function getSavedCities() {
  return JSON.parse(localStorage.getItem("weatherCache") || "{}");
}

export function saveNote(city: string, note: string) {
  localStorage.setItem(`note_${city.toLocaleLowerCase()}`, note);
}

export function getNote(city: string) {
  return localStorage.getItem(`note_${city.toLocaleLowerCase()}`) || "";
}
