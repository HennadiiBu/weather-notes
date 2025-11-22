"use client";

import { useState, useEffect } from "react";
import { saveNote, getNote } from "../lib/storage";

export default function Note({ city }: { city: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(getNote(city));
  }, [city]);

  return (
    <div className="mt-4">
      <h3>Your note for {city}:</h3>
      <textarea
        className="border p-2 w-full"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-2 p-2 bg-blue-600 text-white rounded  cursor-pointer"
        onClick={() => saveNote(city, text)}
      >
        Save note
      </button>
    </div>
  );
}
