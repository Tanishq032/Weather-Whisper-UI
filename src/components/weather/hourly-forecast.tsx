
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Cloud, CloudDrizzle, CloudLightning, CloudSnow, Sun } from "lucide-react"
import { ReactNode } from "react"

interface HourlyForecastItemProps {
  time: string
  temperature: number
  condition: string
  className?: string
}

const HourlyForecastItem = ({ time, temperature, condition, className }: HourlyForecastItemProps) => {
  let weatherIcon: ReactNode

  switch (condition?.toLowerCase()) {
    case "sunny":
    case "clear":
      weatherIcon = <Sun className="h-6 w-6 text-weather-sunny" />
      break
    case "cloudy":
    case "partly cloudy":
      weatherIcon = <Cloud className="h-6 w-6 text-weather-cloudy" />
      break
    case "rainy":
    case "rain":
      weatherIcon = <CloudDrizzle className="h-6 w-6 text-weather-rainy" />
      break
    case "snow":
    case "snowy":
      weatherIcon = <CloudSnow className="h-6 w-6 text-weather-snowy" />
      break
    case "thunderstorm":
    case "thunder":
      weatherIcon = <CloudLightning className="h-6 w-6 text-weather-thunderstorm" />
      break
    default:
      weatherIcon = <Sun className="h-6 w-6 text-weather-sunny" />
  }

  return (
    <div className={cn("flex flex-col items-center p-3 rounded-xl hover:bg-primary/5 transition-colors", className)}>
      <span className="text-sm font-medium text-muted-foreground mb-2">{time}</span>
      <div className="my-1">{weatherIcon}</div>
      <span className="text-md font-bold">{temperature}°</span>
    </div>
  )
}

interface HourlyForecastProps {
  forecastData: {
    time: string
    temperature: number
    condition: string
  }[]
  className?: string
}

export function HourlyForecast({ forecastData, className }: HourlyForecastProps) {
  return (
    <Card className={cn("bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Today's Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative overflow-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max animate-slide-in">
            {forecastData.map((hourData, index) => (
              <HourlyForecastItem
                key={index}
                time={hourData.time}
                temperature={hourData.temperature}
                condition={hourData.condition}
                className={index === 0 ? "bg-primary/5" : ""}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
