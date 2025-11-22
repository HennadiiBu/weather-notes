'use client';

import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import Note from "../components/Note";
import { fetchWeather, WeatherData } from "../lib/weatherApi";
import { getCachedWeather, saveWeatherToCache } from "../lib/storage";
import { useSearchParams } from "next/navigation";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city") || "";

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

  useEffect(() => {
    if (!cityParam) return;
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setHasSearched(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
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
