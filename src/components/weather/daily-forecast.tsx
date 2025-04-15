
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Cloud, CloudDrizzle, CloudLightning, CloudSnow, Droplet, Sun, Thermometer } from "lucide-react"
import { ReactNode } from "react"

interface DailyForecastItemProps {
  day: string
  date: string
  minTemp: number
  maxTemp: number
  condition: string
  humidity: number
  precipitation: number
  wind: number
  expanded?: boolean
  className?: string
}

const DailyForecastItem = ({
  day,
  date,
  minTemp,
  maxTemp,
  condition,
  humidity,
  precipitation,
  wind,
  className,
}: DailyForecastItemProps) => {
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

  const tempRange = Math.abs(maxTemp - minTemp)
  const rangeStart = (minTemp / (minTemp + maxTemp)) * 100
  const rangeWidth = (tempRange / (minTemp + maxTemp)) * 100

  return (
    <AccordionItem value={day} className={cn("border-b", className)}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full px-1">
          <div className="flex items-center gap-3">
            <div className="w-10">
              {weatherIcon}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{day}</span>
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ArrowDown className="h-3 w-3 text-blue-500" />
              <span className="text-sm">{minTemp}°</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-red-500" />
              <span className="text-sm">{maxTemp}°</span>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="animate-fade-in">
        <div className="px-1 py-2 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Temperature Range</span>
              <div className="flex gap-2">
                <span className="text-blue-500">{minTemp}°</span>
                <span className="text-red-500">{maxTemp}°</span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full" 
                   style={{ left: `${rangeStart}%`, width: `${rangeWidth}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
              <Droplet className="h-4 w-4 mb-1 text-blue-400" />
              <span className="text-xs text-muted-foreground">Humidity</span>
              <span className="font-medium">{humidity}%</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
              <CloudDrizzle className="h-4 w-4 mb-1 text-blue-400" />
              <span className="text-xs text-muted-foreground">Precip.</span>
              <span className="font-medium">{precipitation}%</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
              <Thermometer className="h-4 w-4 mb-1 text-orange-400" />
              <span className="text-xs text-muted-foreground">Wind</span>
              <span className="font-medium">{wind} km/h</span>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

interface DailyForecastProps {
  forecastData: {
    day: string
    date: string
    minTemp: number
    maxTemp: number
    condition: string
    humidity: number
    precipitation: number
    wind: number
  }[]
  className?: string
}

export function DailyForecast({ forecastData, className }: DailyForecastProps) {
  return (
    <Card className={cn("bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <Accordion type="single" collapsible className="w-full animate-slide-in">
          {forecastData.map((dayData, index) => (
            <DailyForecastItem
              key={index}
              day={dayData.day}
              date={dayData.date}
              minTemp={dayData.minTemp}
              maxTemp={dayData.maxTemp}
              condition={dayData.condition}
              humidity={dayData.humidity}
              precipitation={dayData.precipitation}
              wind={dayData.wind}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
