"use client";

import { useEffect, useState } from "react";
import { getSavedCities } from "@/lib/storage";

interface SavedCity {
  temp: number;
}

export default function SavedPage() {
  const [cities, setCities] = useState<string[]>([]);
  const [savedData, setSavedData] = useState<Record<string, SavedCity>>({});

  useEffect(() => {
    setTimeout(() => {
      const saved = getSavedCities();
      setSavedData(saved);
      setCities(Object.keys(saved));
    });
  }, []);

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
            <strong>{city}</strong> — {savedData[city].temp}°C
          </div>
          <button
            className="p-2 bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = `/?city=${city}`;
              }
            }}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}
