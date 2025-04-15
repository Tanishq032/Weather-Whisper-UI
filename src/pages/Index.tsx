
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
import { CityWeatherData, generateWeatherData } from "@/utils/weather-generator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentLocation, setCurrentLocation] = useState("New York");
  const [weatherCondition, setWeatherCondition] = useState("Partly Cloudy");
  const [cityWeatherData, setCityWeatherData] = useState<Record<string, CityWeatherData>>({});
  const { play } = useSoundEffects();

  // Generate or retrieve weather data for the current location
  useEffect(() => {
    if (!cityWeatherData[currentLocation]) {
      // Generate new weather data for this city
      const newWeatherData = generateWeatherData(currentLocation);
      
      // Update the cityWeatherData with the new city
      setCityWeatherData(prev => ({
        ...prev,
        [currentLocation]: newWeatherData
      }));
    }
    
    // Set the current weather condition
    if (cityWeatherData[currentLocation]) {
      setWeatherCondition(cityWeatherData[currentLocation].condition);
    }
  }, [currentLocation, cityWeatherData]);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    play("click");
    setActiveTab("home");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    play("click");
  };

  // Get current weather data or generate if not available
  const getCurrentCityData = (): CityWeatherData | null => {
    if (!cityWeatherData[currentLocation]) {
      return null;
    }
    return cityWeatherData[currentLocation];
  };

  const currentCityData = getCurrentCityData();

  const renderActiveTab = () => {
    if (!currentCityData) return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-pulse text-muted-foreground">
          Loading weather data...
        </div>
      </div>
    );

    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-8 lg:space-y-10">
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
            <LocationSearch 
              onLocationSelect={handleLocationSelect} 
              currentLocation={currentLocation}
            />
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
      
      <main className="container mx-auto px-4 pt-4 md:pt-8 max-w-screen-xl">
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          {renderActiveTab()}
        </div>
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
