'use client';
import Link from "next/link";
import Note from "@/components/Note";
import WeatherCard from "@/components/WeatherCard";
import { useEffect, useState } from "react";
import { getCachedWeather, saveWeatherToCache } from "@/lib/storage";
import { fetchWeather, WeatherData } from "@/lib/weatherApi";

export default function Page() {
  // Получаем параметр city из URL вручную
  const getCityFromSearch = () => {
    if (typeof window === "undefined") return ""; // безопасность для SSR
    const params = new URLSearchParams(window.location.search);
    return params.get("city") || "";
  };

  const cityParam = getCityFromSearch();

  const [city, setCity] = useState(cityParam);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const search = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const data = await fetchWeather(city);
      setWeather(data);
      saveWeatherToCache(city, data);
      setHasSearched(true);
    } catch (err) {
      const cached = getCachedWeather(city);
      if (cached) {
        alert("Offline mode – showing cached data");
        setWeather(cached);
      } else {
        setError(`No cached data available. Error: ${(err as Error).message}`);
      }
    }

    setLoading(false);
  };

  // Твой useEffect оставляем без изменений
  useEffect(() => {
    if (!cityParam) return;
    const fetchInitial = async () => {
      await search();
    };
    fetchInitial();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setHasSearched(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Weather Notes</h1>
        <Link href="/saved" className="p-2 border-2 rounded-2xl">
          Saved
        </Link>
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Enter city..."
        value={city}
        onChange={handleInputChange}
      />
      <button
        className="mt-2 p-2 bg-green-600 text-white w-full rounded cursor-pointer"
        onClick={search}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {hasSearched && weather && (
        <>
          <WeatherCard city={city} weather={weather} />
          <Note city={city} />
        </>
      )}
    </div>
  );
}
