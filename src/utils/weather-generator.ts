// Weather data generator utility
// This simulates an API that would provide real weather data

import { format } from "date-fns";

// Types
export interface CityWeatherData {
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

// List of possible weather conditions
const weatherConditions = [
  "Sunny", "Clear", "Partly Cloudy", "Cloudy", 
  "Rainy", "Thunderstorm", "Snowy", "Windy", "Foggy"
];

// Weather condition probability weights (for more realistic distribution)
const conditionWeights = {
  "Sunny": 0.2,
  "Clear": 0.15,
  "Partly Cloudy": 0.25,
  "Cloudy": 0.15,
  "Rainy": 0.1,
  "Thunderstorm": 0.05,
  "Snowy": 0.05,
  "Windy": 0.03,
  "Foggy": 0.02
};

// Generate random number between min and max
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random weather condition based on weights
const randomWeatherCondition = (): string => {
  const rand = Math.random();
  let sum = 0;
  
  for (const condition in conditionWeights) {
    sum += conditionWeights[condition as keyof typeof conditionWeights];
    if (rand < sum) return condition;
  }
  
  return "Partly Cloudy"; // Default fallback
};

// Get day of week from date
const getDayOfWeek = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

// Generate realistic hourly forecast with smooth transitions
const generateHourlyForecast = (currentTemp: number, currentCondition: string): any[] => {
  const forecast = [];
  let temp = currentTemp;
  let condition = currentCondition;
  
  // First entry is current time
  forecast.push({
    time: "Now",
    temperature: temp,
    condition: condition
  });
  
  // Generate for next 11 hours
  for (let i = 1; i <= 11; i++) {
    // Get hour in 12-hour format
    const hour = new Date(Date.now() + i * 60 * 60 * 1000).getHours();
    const hourFormatted = hour === 0 ? "12AM" : hour === 12 ? "12PM" : hour > 12 ? `${hour-12}PM` : `${hour}AM`;
    
    // Temperature varies more during day, less at night
    const isDaytime = hour > 6 && hour < 18;
    const tempVariation = isDaytime ? randomBetween(-2, 2) : randomBetween(-1, 1);
    temp = Math.round(temp + tempVariation);
    
    // Condition has 15% chance to change each hour
    if (Math.random() < 0.15) {
      condition = randomWeatherCondition();
    }
    
    forecast.push({
      time: hourFormatted,
      temperature: temp,
      condition: condition
    });
  }
  
  return forecast;
};

// Generate 7-day forecast starting from today
const generateWeeklyForecast = (currentTemp: number): any[] => {
  const forecast = [];
  let baseTemp = currentTemp;
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : getDayOfWeek(date);
    const dateFormatted = format(date, "MMM d");
    
    // Temperature varies more as we go further in time
    const variance = Math.min(i * 1.5, 10);
    const minTemp = Math.round(baseTemp - randomBetween(2, 4 + i) - variance / 2);
    const maxTemp = Math.round(baseTemp + randomBetween(1, 3 + i) + variance / 2);
    
    // Weather has more chance to be different as we go further in time
    const condition = randomWeatherCondition();
    
    // Other stats are partially correlated with the condition
    let humidity, precipitation, wind;
    
    switch(condition) {
      case "Rainy":
        humidity = randomBetween(70, 90);
        precipitation = randomBetween(40, 80);
        wind = randomBetween(10, 25);
        break;
      case "Thunderstorm":
        humidity = randomBetween(75, 95);
        precipitation = randomBetween(60, 90);
        wind = randomBetween(20, 35);
        break;
      case "Snowy":
        humidity = randomBetween(65, 85);
        precipitation = randomBetween(50, 70);
        wind = randomBetween(15, 30);
        break;
      case "Cloudy":
        humidity = randomBetween(60, 80);
        precipitation = randomBetween(20, 40);
        wind = randomBetween(8, 20);
        break;
      case "Partly Cloudy":
        humidity = randomBetween(50, 70);
        precipitation = randomBetween(5, 25);
        wind = randomBetween(5, 15);
        break;
      case "Sunny":
      case "Clear":
        humidity = randomBetween(30, 60);
        precipitation = randomBetween(0, 10);
        wind = randomBetween(3, 12);
        break;
      case "Windy":
        humidity = randomBetween(40, 70);
        precipitation = randomBetween(0, 30);
        wind = randomBetween(25, 45);
        break;
      case "Foggy":
        humidity = randomBetween(75, 95);
        precipitation = randomBetween(0, 20);
        wind = randomBetween(0, 10);
        break;
      default:
        humidity = randomBetween(50, 70);
        precipitation = randomBetween(10, 30);
        wind = randomBetween(5, 15);
    }
    
    forecast.push({
      day: dayName,
      date: dateFormatted,
      minTemp: minTemp,
      maxTemp: maxTemp,
      condition: condition,
      humidity: humidity,
      precipitation: precipitation,
      wind: wind
    });
    
    // Adjust base temperature for trend
    baseTemp += randomBetween(-2, 2);
  }
  
  return forecast;
};

// Generate time-series data for temperature
const generateTemperatureData = (currentTemp: number): any[] => {
  const timePoints = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"];
  
  // Temperature curve that peaks in afternoon
  const tempCurve = [-4, -2, 2, 3, 0, -3];
  
  return timePoints.map((time, i) => ({
    time,
    temp: Math.round(currentTemp + tempCurve[i] + randomBetween(-1, 1))
  }));
};

// Generate time-series data for wind
const generateWindData = (avgWind: number): any[] => {
  const timePoints = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"];
  
  return timePoints.map(time => ({
    time,
    speed: Math.round(avgWind + randomBetween(-4, 4))
  }));
};

// Generate time-series data for humidity
const generateHumidityData = (avgHumidity: number): any[] => {
  const timePoints = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"];
  
  // Humidity typically decreases during day and increases at night
  const humidityCurve = [5, 0, -7, -5, 2, 7];
  
  return timePoints.map((time, i) => ({
    time,
    humidity: Math.min(100, Math.max(0, Math.round(avgHumidity + humidityCurve[i] + randomBetween(-3, 3))))
  }));
};

// Generate time-series data for UV index
const generateUVIndexData = (maxUV: number): any[] => {
  const timePoints = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"];
  
  // UV curve that peaks at noon
  const uvCurve = [0.1, 0.4, 1.0, 0.7, 0.3, 0];
  
  return timePoints.map((time, i) => ({
    time,
    index: Math.round(maxUV * uvCurve[i] * (1 + randomBetween(-10, 10) / 100))
  }));
};

// Main function to generate weather data for a city
export const generateWeatherData = (cityName: string): CityWeatherData => {
  // Use city name as seed for pseudo-randomization
  // This ensures the same city always gets similar (but not identical) weather
  let seed = 0;
  for (let i = 0; i < cityName.length; i++) {
    seed += cityName.charCodeAt(i);
  }
  
  // Adjust random seed with date to get variation day-to-day
  const today = new Date();
  seed += today.getDate() + today.getMonth() * 30;
  
  // Use seed to get a base temperature (varies by city)
  const seedRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Generate base temperature (5-35°C)
  const baseTemp = Math.round(5 + seedRandom() * 30);
  
  // Generate current weather condition
  const condition = randomWeatherCondition();
  
  // Feels like temp (adjust based on humidity and wind)
  const humidity = Math.round(40 + seedRandom() * 40);
  const wind = Math.round(5 + seedRandom() * 25);
  const feelsLike = Math.round(baseTemp + (humidity > 70 ? 2 : -1) + (wind > 20 ? -2 : 0));
  
  // Pressure (1000-1030 hPa)
  const pressure = Math.round(1000 + seedRandom() * 30);
  
  // UV index (0-10)
  const maxUV = Math.round(seedRandom() * 10);
  
  // Generate all the forecast data
  const hourlyForecast = generateHourlyForecast(baseTemp, condition);
  const weeklyForecast = generateWeeklyForecast(baseTemp);
  const temperatureData = generateTemperatureData(baseTemp);
  const windData = generateWindData(wind);
  const humidityData = generateHumidityData(humidity);
  const uvIndexData = generateUVIndexData(maxUV);
  
  // Return the complete weather data
  return {
    city: cityName,
    temperature: baseTemp,
    condition,
    feelsLike,
    wind,
    humidity,
    uvIndex: maxUV,
    pressure,
    hourlyForecast,
    weeklyForecast,
    temperatureData,
    windData,
    humidityData,
    uvIndexData
  };
};
