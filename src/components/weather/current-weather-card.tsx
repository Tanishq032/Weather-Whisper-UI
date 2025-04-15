
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Cloud, CloudDrizzle, CloudLightning, CloudSnow, Droplet, Snowflake, Sun, Thermometer, Wind } from "lucide-react"
import { ReactNode } from "react"

interface WeatherInfoProps {
  icon: ReactNode
  label: string
  value: string
  className?: string
}

const WeatherInfo = ({ icon, label, value, className }: WeatherInfoProps) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  </div>
)

interface CurrentWeatherCardProps {
  city: string
  temperature: number
  condition: string
  feelsLike: number
  wind: number
  humidity: number
  uvIndex: number
  pressure: number
  className?: string
}

export function CurrentWeatherCard({
  city,
  temperature,
  condition,
  feelsLike,
  wind,
  humidity,
  uvIndex,
  pressure,
  className,
}: CurrentWeatherCardProps) {
  let weatherIcon
  let bgClass = ""

  switch (condition?.toLowerCase()) {
    case "sunny":
    case "clear":
      weatherIcon = <Sun className="h-14 w-14 text-weather-sunny animate-pulse-gentle" />
      bgClass = "from-weather-sunny/20 to-transparent"
      break
    case "cloudy":
    case "partly cloudy":
      weatherIcon = <Cloud className="h-14 w-14 text-weather-cloudy animate-float" />
      bgClass = "from-weather-cloudy/20 to-transparent"
      break
    case "rainy":
    case "rain":
      weatherIcon = <CloudDrizzle className="h-14 w-14 text-weather-rainy animate-bounce-gentle" />
      bgClass = "from-weather-rainy/20 to-transparent"
      break
    case "snow":
    case "snowy":
      weatherIcon = <CloudSnow className="h-14 w-14 text-weather-snowy animate-bounce-gentle" />
      bgClass = "from-weather-snowy/20 to-transparent"
      break
    case "thunderstorm":
    case "thunder":
      weatherIcon = <CloudLightning className="h-14 w-14 text-weather-thunderstorm animate-pulse-gentle" />
      bgClass = "from-weather-thunderstorm/20 to-transparent"
      break
    default:
      weatherIcon = <Sun className="h-14 w-14 text-weather-sunny animate-pulse-gentle" />
      bgClass = "from-weather-sunny/20 to-transparent"
  }

  return (
    <Card className={cn("overflow-hidden bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", bgClass)} />
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <span>{city}</span>
          <div className="text-sm font-normal text-muted-foreground">Now</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-5xl font-bold tracking-tighter">
                {temperature}°
              </span>
              <span className="text-lg font-medium text-muted-foreground">
                {condition}
              </span>
              <span className="text-sm text-muted-foreground">
                Feels like {feelsLike}°
              </span>
            </div>
            {weatherIcon}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <WeatherInfo
              icon={<Wind className="h-4 w-4" />}
              label="Wind"
              value={`${wind} km/h`}
            />
            <WeatherInfo
              icon={<Droplet className="h-4 w-4" />}
              label="Humidity"
              value={`${humidity}%`}
            />
            <WeatherInfo
              icon={<Thermometer className="h-4 w-4" />}
              label="Pressure"
              value={`${pressure} hPa`}
            />
            <WeatherInfo
              icon={<Sun className="h-4 w-4" />}
              label="UV Index"
              value={`${uvIndex}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
