import Image from "next/image";

type Props = {
  weather: {
    temp: number;
    description: string;
    icon: string;
  };
  city: string;
};

export default function WeatherCard({ weather, city }: Props) {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold">{city}</h2>
      <p>
        {weather.temp}°C — {weather.description}
      </p>
      <Image width={100} height={100} src={weather.icon} alt="Weather Icon" />
    </div>
  );
}
