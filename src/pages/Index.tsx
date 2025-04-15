
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
import { useEffect, useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentLocation, setCurrentLocation] = useState("New York");
  const [weatherCondition, setWeatherCondition] = useState("Sunny");

  // Mock data for demo purposes
  const mockCurrentWeather = {
    city: currentLocation,
    temperature: 23,
    condition: "Partly Cloudy",
    feelsLike: 25,
    wind: 15,
    humidity: 68,
    uvIndex: 4,
    pressure: 1012,
  };

  const mockHourlyForecast = [
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
  ];

  const mockWeeklyForecast = [
    { day: "Today", date: "Apr 15", minTemp: 18, maxTemp: 25, condition: "Partly Cloudy", humidity: 68, precipitation: 10, wind: 15 },
    { day: "Tomorrow", date: "Apr 16", minTemp: 17, maxTemp: 23, condition: "Rainy", humidity: 75, precipitation: 40, wind: 20 },
    { day: "Wednesday", date: "Apr 17", minTemp: 16, maxTemp: 22, condition: "Rainy", humidity: 80, precipitation: 60, wind: 25 },
    { day: "Thursday", date: "Apr 18", minTemp: 15, maxTemp: 20, condition: "Rainy", humidity: 85, precipitation: 70, wind: 30 },
    { day: "Friday", date: "Apr 19", minTemp: 14, maxTemp: 21, condition: "Cloudy", humidity: 70, precipitation: 30, wind: 15 },
    { day: "Saturday", date: "Apr 20", minTemp: 16, maxTemp: 23, condition: "Partly Cloudy", humidity: 65, precipitation: 10, wind: 10 },
    { day: "Sunday", date: "Apr 21", minTemp: 18, maxTemp: 25, condition: "Sunny", humidity: 60, precipitation: 0, wind: 5 },
  ];

  const mockTemperatureData = [
    { time: "6AM", temp: 18 },
    { time: "9AM", temp: 20 },
    { time: "12PM", temp: 23 },
    { time: "3PM", temp: 25 },
    { time: "6PM", temp: 22 },
    { time: "9PM", temp: 19 },
  ];

  const mockWindData = [
    { time: "6AM", speed: 8 },
    { time: "9AM", speed: 10 },
    { time: "12PM", speed: 15 },
    { time: "3PM", speed: 12 },
    { time: "6PM", speed: 10 },
    { time: "9PM", speed: 8 },
  ];

  const mockHumidityData = [
    { time: "6AM", humidity: 75 },
    { time: "9AM", humidity: 70 },
    { time: "12PM", humidity: 65 },
    { time: "3PM", humidity: 68 },
    { time: "6PM", humidity: 72 },
    { time: "9PM", humidity: 78 },
  ];

  const mockUvIndexData = [
    { time: "6AM", index: 1 },
    { time: "9AM", index: 3 },
    { time: "12PM", index: 6 },
    { time: "3PM", index: 4 },
    { time: "6PM", index: 2 },
    { time: "9PM", index: 0 },
  ];

  useEffect(() => {
    // Update weather condition based on location change
    // In a real app, this would fetch data from an API
    switch(currentLocation) {
      case "New York":
        setWeatherCondition("Partly Cloudy");
        break;
      case "London":
        setWeatherCondition("Rainy");
        break;
      case "Tokyo":
        setWeatherCondition("Sunny");
        break;
      case "Sydney":
        setWeatherCondition("Cloudy");
        break;
      case "Paris":
        setWeatherCondition("Clear");
        break;
      default:
        setWeatherCondition("Sunny");
    }
  }, [currentLocation]);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    setActiveTab("home");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <CurrentWeatherCard
              city={mockCurrentWeather.city}
              temperature={mockCurrentWeather.temperature}
              condition={mockCurrentWeather.condition}
              feelsLike={mockCurrentWeather.feelsLike}
              wind={mockCurrentWeather.wind}
              humidity={mockCurrentWeather.humidity}
              uvIndex={mockCurrentWeather.uvIndex}
              pressure={mockCurrentWeather.pressure}
            />
            <HourlyForecast forecastData={mockHourlyForecast} />
          </div>
        );
      case "weekly":
        return (
          <div className="space-y-6">
            <DailyForecast forecastData={mockWeeklyForecast} />
            <WeatherStats
              temperatureData={mockTemperatureData}
              windData={mockWindData}
              humidityData={mockHumidityData}
              uvIndexData={mockUvIndexData}
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
        onChange={setActiveTab} 
        className="max-w-md mx-auto"
      />
    </div>
  );
};

export default Index;
