const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type WeatherData = {
  temp: number;
  description: string;
  icon: string;
};

export async function fetchWeather(city: string): Promise<WeatherData> {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("City not found");

  const data = await res.json();

  return {
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
  };
}
