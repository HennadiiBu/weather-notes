"use client";

import { getSavedCities } from "../../lib/storage";

export default function SavedPage() {
  const saved = getSavedCities();
  const cities = Object.keys(saved);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Saved cities</h1>

      {cities.length === 0 && <p>No saved cities.</p>}

      {cities.map((city) => (
        <div
          key={city}
          className="border p-3 mb-2 rounded flex justify-between"
        >
          <div>
            <strong>{city}</strong> — {saved[city].temp}°C
          </div>
          <button
            className="p-2 bg-blue-600 text-white rounded  cursor-pointer"
            onClick={() => (window.location.href = `/?city=${city}`)}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}
