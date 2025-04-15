
import { AnimatedBackground } from "@/components/weather/animated-background";
import { BottomNav } from "@/components/weather/bottom-nav";
import { CelestialBackground } from "@/components/weather/celestial-background";
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { DailyForecast } from "@/components/weather/daily-forecast";
import { Header } from "@/components/weather/header";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { LocationSearch } from "@/components/weather/location-search";
import { SettingsPanel } from "@/components/weather/settings-panel";
import { WeatherAnimation } from "@/components/weather/weather-animation";
import { WeatherStats } from "@/components/weather/weather-stats";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { useEffect, useState } from "react";

// Define weather data types
interface CityWeatherData {
  city: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  wind: number;
  humidity: number;
  uvIndex: number;
  pressure: number;
  hourlyForecast: {
    time: string;
    temperature: number;
    condition: string;
  }[];
  weeklyForecast: {
    day: string;
    date: string;
    minTemp: number;
    maxTemp: number;
    condition: string;
    humidity: number;
    precipitation: number;
    wind: number;
  }[];
  temperatureData: {
    time: string;
    temp: number;
  }[];
  windData: {
    time: string;
    speed: number;
  }[];
  humidityData: {
    time: string;
    humidity: number;
  }[];
  uvIndexData: {
    time: string;
    index: number;
  }[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentLocation, setCurrentLocation] = useState("New York");
  const [weatherCondition, setWeatherCondition] = useState("Partly Cloudy");
  const { play } = useSoundEffects();

  // Create city-specific data
  const cityWeatherData: Record<string, CityWeatherData> = {
    "New York": {
      city: "New York",
      temperature: 23,
      condition: "Partly Cloudy",
      feelsLike: 25,
      wind: 15,
      humidity: 68,
      uvIndex: 4,
      pressure: 1012,
      hourlyForecast: [
        { time: "Now", temperature: 23, condition: "Partly Cloudy" },
        { time: "1PM", temperature: 24, condition: "Sunny" },
        { time: "2PM", temperature: 25, condition: "Sunny" },
        { time: "3PM", temperature: 25, condition: "Sunny" },
        { time: "4PM", temperature: 24, condition: "Partly Cloudy" },
        { time: "5PM", temperature: 23, condition: "Cloudy" },
        { time: "6PM", temperature: 22, condition: "Cloudy" },
        { time: "7PM", temperature: 21, condition: "Cloudy" },
        { time: "8PM", temperature: 20, condition: "Cloudy" },
        { time: "9PM", temperature: 19, condition: "Cloudy" },
        { time: "10PM", temperature: 18, condition: "Cloudy" },
        { time: "11PM", temperature: 18, condition: "Cloudy" },
      ],
      weeklyForecast: [
        { day: "Today", date: "Apr 15", minTemp: 18, maxTemp: 25, condition: "Partly Cloudy", humidity: 68, precipitation: 10, wind: 15 },
        { day: "Tomorrow", date: "Apr 16", minTemp: 17, maxTemp: 23, condition: "Rainy", humidity: 75, precipitation: 40, wind: 20 },
        { day: "Wednesday", date: "Apr 17", minTemp: 16, maxTemp: 22, condition: "Rainy", humidity: 80, precipitation: 60, wind: 25 },
        { day: "Thursday", date: "Apr 18", minTemp: 15, maxTemp: 20, condition: "Rainy", humidity: 85, precipitation: 70, wind: 30 },
        { day: "Friday", date: "Apr 19", minTemp: 14, maxTemp: 21, condition: "Cloudy", humidity: 70, precipitation: 30, wind: 15 },
        { day: "Saturday", date: "Apr 20", minTemp: 16, maxTemp: 23, condition: "Partly Cloudy", humidity: 65, precipitation: 10, wind: 10 },
        { day: "Sunday", date: "Apr 21", minTemp: 18, maxTemp: 25, condition: "Sunny", humidity: 60, precipitation: 0, wind: 5 },
      ],
      temperatureData: [
        { time: "6AM", temp: 18 },
        { time: "9AM", temp: 20 },
        { time: "12PM", temp: 23 },
        { time: "3PM", temp: 25 },
        { time: "6PM", temp: 22 },
        { time: "9PM", temp: 19 },
      ],
      windData: [
        { time: "6AM", speed: 8 },
        { time: "9AM", speed: 10 },
        { time: "12PM", speed: 15 },
        { time: "3PM", speed: 12 },
        { time: "6PM", speed: 10 },
        { time: "9PM", speed: 8 },
      ],
      humidityData: [
        { time: "6AM", humidity: 75 },
        { time: "9AM", humidity: 70 },
        { time: "12PM", humidity: 65 },
        { time: "3PM", humidity: 68 },
        { time: "6PM", humidity: 72 },
        { time: "9PM", humidity: 78 },
      ],
      uvIndexData: [
        { time: "6AM", index: 1 },
        { time: "9AM", index: 3 },
        { time: "12PM", index: 6 },
        { time: "3PM", index: 4 },
        { time: "6PM", index: 2 },
        { time: "9PM", index: 0 },
      ],
    },
    "London": {
      city: "London",
      temperature: 14,
      condition: "Rainy",
      feelsLike: 12,
      wind: 20,
      humidity: 85,
      uvIndex: 2,
      pressure: 1008,
      hourlyForecast: [
        { time: "Now", temperature: 14, condition: "Rainy" },
        { time: "1PM", temperature: 15, condition: "Rainy" },
        { time: "2PM", temperature: 15, condition: "Cloudy" },
        { time: "3PM", temperature: 14, condition: "Cloudy" },
        { time: "4PM", temperature: 14, condition: "Cloudy" },
        { time: "5PM", temperature: 13, condition: "Cloudy" },
        { time: "6PM", temperature: 13, condition: "Cloudy" },
        { time: "7PM", temperature: 12, condition: "Cloudy" },
        { time: "8PM", temperature: 12, condition: "Cloudy" },
        { time: "9PM", temperature: 11, condition: "Cloudy" },
        { time: "10PM", temperature: 11, condition: "Cloudy" },
        { time: "11PM", temperature: 10, condition: "Cloudy" },
      ],
      weeklyForecast: [
        { day: "Today", date: "Apr 15", minTemp: 10, maxTemp: 15, condition: "Rainy", humidity: 85, precipitation: 70, wind: 20 },
        { day: "Tomorrow", date: "Apr 16", minTemp: 9, maxTemp: 14, condition: "Rainy", humidity: 80, precipitation: 65, wind: 18 },
        { day: "Wednesday", date: "Apr 17", minTemp: 8, maxTemp: 13, condition: "Rainy", humidity: 75, precipitation: 60, wind: 15 },
        { day: "Thursday", date: "Apr 18", minTemp: 9, maxTemp: 15, condition: "Cloudy", humidity: 70, precipitation: 30, wind: 12 },
        { day: "Friday", date: "Apr 19", minTemp: 10, maxTemp: 16, condition: "Cloudy", humidity: 65, precipitation: 20, wind: 10 },
        { day: "Saturday", date: "Apr 20", minTemp: 11, maxTemp: 17, condition: "Partly Cloudy", humidity: 60, precipitation: 10, wind: 8 },
        { day: "Sunday", date: "Apr 21", minTemp: 12, maxTemp: 18, condition: "Partly Cloudy", humidity: 55, precipitation: 5, wind: 5 },
      ],
      temperatureData: [
        { time: "6AM", temp: 10 },
        { time: "9AM", temp: 12 },
        { time: "12PM", temp: 14 },
        { time: "3PM", temp: 15 },
        { time: "6PM", temp: 13 },
        { time: "9PM", temp: 11 },
      ],
      windData: [
        { time: "6AM", speed: 18 },
        { time: "9AM", speed: 19 },
        { time: "12PM", speed: 20 },
        { time: "3PM", speed: 18 },
        { time: "6PM", speed: 15 },
        { time: "9PM", speed: 12 },
      ],
      humidityData: [
        { time: "6AM", humidity: 88 },
        { time: "9AM", humidity: 86 },
        { time: "12PM", humidity: 85 },
        { time: "3PM", humidity: 84 },
        { time: "6PM", humidity: 86 },
        { time: "9PM", humidity: 89 },
      ],
      uvIndexData: [
        { time: "6AM", index: 0 },
        { time: "9AM", index: 1 },
        { time: "12PM", index: 2 },
        { time: "3PM", index: 2 },
        { time: "6PM", index: 1 },
        { time: "9PM", index: 0 },
      ],
    },
    "Tokyo": {
      city: "Tokyo",
      temperature: 28,
      condition: "Sunny",
      feelsLike: 30,
      wind: 8,
      humidity: 55,
      uvIndex: 7,
      pressure: 1014,
      hourlyForecast: [
        { time: "Now", temperature: 28, condition: "Sunny" },
        { time: "1PM", temperature: 29, condition: "Sunny" },
        { time: "2PM", temperature: 30, condition: "Sunny" },
        { time: "3PM", temperature: 30, condition: "Sunny" },
        { time: "4PM", temperature: 29, condition: "Sunny" },
        { time: "5PM", temperature: 28, condition: "Partly Cloudy" },
        { time: "6PM", temperature: 27, condition: "Partly Cloudy" },
        { time: "7PM", temperature: 26, condition: "Clear" },
        { time: "8PM", temperature: 25, condition: "Clear" },
        { time: "9PM", temperature: 24, condition: "Clear" },
        { time: "10PM", temperature: 23, condition: "Clear" },
        { time: "11PM", temperature: 22, condition: "Clear" },
      ],
      weeklyForecast: [
        { day: "Today", date: "Apr 15", minTemp: 21, maxTemp: 30, condition: "Sunny", humidity: 55, precipitation: 0, wind: 8 },
        { day: "Tomorrow", date: "Apr 16", minTemp: 22, maxTemp: 31, condition: "Sunny", humidity: 50, precipitation: 0, wind: 9 },
        { day: "Wednesday", date: "Apr 17", minTemp: 23, maxTemp: 32, condition: "Sunny", humidity: 45, precipitation: 0, wind: 10 },
        { day: "Thursday", date: "Apr 18", minTemp: 23, maxTemp: 31, condition: "Partly Cloudy", humidity: 50, precipitation: 10, wind: 12 },
        { day: "Friday", date: "Apr 19", minTemp: 22, maxTemp: 30, condition: "Partly Cloudy", humidity: 55, precipitation: 20, wind: 10 },
        { day: "Saturday", date: "Apr 20", minTemp: 21, maxTemp: 29, condition: "Partly Cloudy", humidity: 60, precipitation: 30, wind: 8 },
        { day: "Sunday", date: "Apr 21", minTemp: 20, maxTemp: 28, condition: "Cloudy", humidity: 65, precipitation: 40, wind: 7 },
      ],
      temperatureData: [
        { time: "6AM", temp: 21 },
        { time: "9AM", temp: 25 },
        { time: "12PM", temp: 28 },
        { time: "3PM", temp: 30 },
        { time: "6PM", temp: 27 },
        { time: "9PM", temp: 24 },
      ],
      windData: [
        { time: "6AM", speed: 5 },
        { time: "9AM", speed: 6 },
        { time: "12PM", speed: 8 },
        { time: "3PM", speed: 9 },
        { time: "6PM", speed: 7 },
        { time: "9PM", speed: 5 },
      ],
      humidityData: [
        { time: "6AM", humidity: 65 },
        { time: "9AM", humidity: 60 },
        { time: "12PM", humidity: 55 },
        { time: "3PM", humidity: 50 },
        { time: "6PM", humidity: 55 },
        { time: "9PM", humidity: 60 },
      ],
      uvIndexData: [
        { time: "6AM", index: 2 },
        { time: "9AM", index: 5 },
        { time: "12PM", index: 7 },
        { time: "3PM", index: 8 },
        { time: "6PM", index: 4 },
        { time: "9PM", index: 1 },
      ],
    },
    "Sydney": {
      city: "Sydney",
      temperature: 21,
      condition: "Cloudy",
      feelsLike: 22,
      wind: 12,
      humidity: 70,
      uvIndex: 3,
      pressure: 1016,
      hourlyForecast: [
        { time: "Now", temperature: 21, condition: "Cloudy" },
        { time: "1PM", temperature: 22, condition: "Cloudy" },
        { time: "2PM", temperature: 22, condition: "Partly Cloudy" },
        { time: "3PM", temperature: 23, condition: "Partly Cloudy" },
        { time: "4PM", temperature: 22, condition: "Partly Cloudy" },
        { time: "5PM", temperature: 21, condition: "Cloudy" },
        { time: "6PM", temperature: 20, condition: "Cloudy" },
        { time: "7PM", temperature: 19, condition: "Cloudy" },
        { time: "8PM", temperature: 18, condition: "Cloudy" },
        { time: "9PM", temperature: 18, condition: "Cloudy" },
        { time: "10PM", temperature: 17, condition: "Cloudy" },
        { time: "11PM", temperature: 17, condition: "Cloudy" },
      ],
      weeklyForecast: [
        { day: "Today", date: "Apr 15", minTemp: 17, maxTemp: 23, condition: "Cloudy", humidity: 70, precipitation: 20, wind: 12 },
        { day: "Tomorrow", date: "Apr 16", minTemp: 16, maxTemp: 22, condition: "Partly Cloudy", humidity: 65, precipitation: 10, wind: 10 },
        { day: "Wednesday", date: "Apr 17", minTemp: 15, maxTemp: 21, condition: "Sunny", humidity: 60, precipitation: 0, wind: 8 },
        { day: "Thursday", date: "Apr 18", minTemp: 14, maxTemp: 20, condition: "Sunny", humidity: 55, precipitation: 0, wind: 7 },
        { day: "Friday", date: "Apr 19", minTemp: 15, maxTemp: 21, condition: "Partly Cloudy", humidity: 60, precipitation: 10, wind: 9 },
        { day: "Saturday", date: "Apr 20", minTemp: 16, maxTemp: 22, condition: "Cloudy", humidity: 65, precipitation: 20, wind: 11 },
        { day: "Sunday", date: "Apr 21", minTemp: 17, maxTemp: 23, condition: "Rainy", humidity: 70, precipitation: 30, wind: 13 },
      ],
      temperatureData: [
        { time: "6AM", temp: 17 },
        { time: "9AM", temp: 19 },
        { time: "12PM", temp: 21 },
        { time: "3PM", temp: 23 },
        { time: "6PM", temp: 20 },
        { time: "9PM", temp: 18 },
      ],
      windData: [
        { time: "6AM", speed: 9 },
        { time: "9AM", speed: 10 },
        { time: "12PM", speed: 12 },
        { time: "3PM", speed: 13 },
        { time: "6PM", speed: 11 },
        { time: "9PM", speed: 8 },
      ],
      humidityData: [
        { time: "6AM", humidity: 75 },
        { time: "9AM", humidity: 72 },
        { time: "12PM", humidity: 70 },
        { time: "3PM", humidity: 68 },
        { time: "6PM", humidity: 70 },
        { time: "9PM", humidity: 74 },
      ],
      uvIndexData: [
        { time: "6AM", index: 1 },
        { time: "9AM", index: 2 },
        { time: "12PM", index: 3 },
        { time: "3PM", index: 3 },
        { time: "6PM", index: 2 },
        { time: "9PM", index: 0 },
      ],
    },
    "Paris": {
      city: "Paris",
      temperature: 19,
      condition: "Clear",
      feelsLike: 20,
      wind: 10,
      humidity: 60,
      uvIndex: 5,
      pressure: 1015,
      hourlyForecast: [
        { time: "Now", temperature: 19, condition: "Clear" },
        { time: "1PM", temperature: 20, condition: "Clear" },
        { time: "2PM", temperature: 21, condition: "Sunny" },
        { time: "3PM", temperature: 21, condition: "Sunny" },
        { time: "4PM", temperature: 20, condition: "Sunny" },
        { time: "5PM", temperature: 19, condition: "Clear" },
        { time: "6PM", temperature: 18, condition: "Clear" },
        { time: "7PM", temperature: 17, condition: "Clear" },
        { time: "8PM", temperature: 16, condition: "Clear" },
        { time: "9PM", temperature: 15, condition: "Clear" },
        { time: "10PM", temperature: 14, condition: "Clear" },
        { time: "11PM", temperature: 14, condition: "Clear" },
      ],
      weeklyForecast: [
        { day: "Today", date: "Apr 15", minTemp: 14, maxTemp: 21, condition: "Clear", humidity: 60, precipitation: 0, wind: 10 },
        { day: "Tomorrow", date: "Apr 16", minTemp: 13, maxTemp: 20, condition: "Sunny", humidity: 55, precipitation: 0, wind: 8 },
        { day: "Wednesday", date: "Apr 17", minTemp: 12, maxTemp: 19, condition: "Sunny", humidity: 50, precipitation: 0, wind: 7 },
        { day: "Thursday", date: "Apr 18", minTemp: 13, maxTemp: 20, condition: "Partly Cloudy", humidity: 55, precipitation: 10, wind: 9 },
        { day: "Friday", date: "Apr 19", minTemp: 14, maxTemp: 21, condition: "Partly Cloudy", humidity: 60, precipitation: 20, wind: 11 },
        { day: "Saturday", date: "Apr 20", minTemp: 15, maxTemp: 22, condition: "Cloudy", humidity: 65, precipitation: 30, wind: 12 },
        { day: "Sunday", date: "Apr 21", minTemp: 14, maxTemp: 21, condition: "Rainy", humidity: 70, precipitation: 40, wind: 13 },
      ],
      temperatureData: [
        { time: "6AM", temp: 14 },
        { time: "9AM", temp: 16 },
        { time: "12PM", temp: 19 },
        { time: "3PM", temp: 21 },
        { time: "6PM", temp: 18 },
        { time: "9PM", temp: 15 },
      ],
      windData: [
        { time: "6AM", speed: 7 },
        { time: "9AM", speed: 8 },
        { time: "12PM", speed: 10 },
        { time: "3PM", speed: 11 },
        { time: "6PM", speed: 9 },
        { time: "9PM", speed: 7 },
      ],
      humidityData: [
        { time: "6AM", humidity: 70 },
        { time: "9AM", humidity: 65 },
        { time: "12PM", humidity: 60 },
        { time: "3PM", humidity: 55 },
        { time: "6PM", humidity: 60 },
        { time: "9PM", humidity: 65 },
      ],
      uvIndexData: [
        { time: "6AM", index: 1 },
        { time: "9AM", index: 3 },
        { time: "12PM", index: 5 },
        { time: "3PM", speed: 5 },
        { time: "6PM", index: 3 },
        { time: "9PM", index: 0 },
      ],
    },
  };

  // Get the current city's weather data
  const currentCityData = cityWeatherData[currentLocation];

  useEffect(() => {
    // Update weather condition based on location change
    if (currentCityData) {
      setWeatherCondition(currentCityData.condition);
    }
  }, [currentLocation, currentCityData]);

  const handleLocationSelect = (location: string) => {
    if (cityWeatherData[location]) {
      setCurrentLocation(location);
      play("click");
      setActiveTab("home");
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    play("click");
  };

  const renderActiveTab = () => {
    if (!currentCityData) return null;

    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <CurrentWeatherCard
              city={currentCityData.city}
              temperature={currentCityData.temperature}
              condition={currentCityData.condition}
              feelsLike={currentCityData.feelsLike}
              wind={currentCityData.wind}
              humidity={currentCityData.humidity}
              uvIndex={currentCityData.uvIndex}
              pressure={currentCityData.pressure}
            />
            <HourlyForecast forecastData={currentCityData.hourlyForecast} />
          </div>
        );
      case "weekly":
        return (
          <div className="space-y-6">
            <DailyForecast forecastData={currentCityData.weeklyForecast} />
            <WeatherStats
              temperatureData={currentCityData.temperatureData}
              windData={currentCityData.windData}
              humidityData={currentCityData.humidityData}
              uvIndexData={currentCityData.uvIndexData}
            />
          </div>
        );
      case "search":
        return (
          <div className="space-y-6">
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <SettingsPanel />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <CelestialBackground />
      <AnimatedBackground weatherCondition={weatherCondition} />
      <WeatherAnimation condition={weatherCondition.toLowerCase()} />
      
      <Header currentLocation={currentLocation} />
      
      <main className="max-w-md mx-auto px-4 pt-4">
        {renderActiveTab()}
      </main>
      
      <BottomNav 
        activeTab={activeTab} 
        onChange={handleTabChange} 
        className="max-w-md mx-auto"
      />
    </div>
  );
};

export default Index;
