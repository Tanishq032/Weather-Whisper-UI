
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droplet, Sun, Thermometer, Wind } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

interface WeatherStatsProps {
  className?: string
  temperatureData: { time: string; temp: number }[]
  windData: { time: string; speed: number }[]
  humidityData: { time: string; humidity: number }[]
  uvIndexData: { time: string; index: number }[]
}

export function WeatherStats({
  className,
  temperatureData,
  windData,
  humidityData,
  uvIndexData,
}: WeatherStatsProps) {
  const { contrastMode } = useTheme()
  const isHighContrast = contrastMode === "high"
  
  // State to control animation
  const [animate, setAnimate] = useState(false)
  
  // Trigger animation on component mount
  useEffect(() => {
    // Short delay to ensure component is rendered before animation starts
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Colors for charts based on contrast mode
  const getColors = () => {
    if (isHighContrast) {
      return {
        temp: {
          stroke: "#FF5722", // Bright orange
          gradient: ["#FF5722", "rgba(255, 87, 34, 0)"],
        },
        wind: {
          fill: "#2196F3", // Bright blue
        },
        humidity: {
          stroke: "#4CAF50", // Bright green
          gradient: ["#4CAF50", "rgba(76, 175, 80, 0)"],
        },
        uvLow: "#00E676", // Bright green
        uvMedium: "#FFEB3B", // Bright yellow
        uvHigh: "#F44336", // Bright red
        uvVeryHigh: "#9C27B0", // Bright purple
      }
    }
    
    return {
      temp: {
        stroke: "var(--weather-sunny)", 
        gradient: ["var(--weather-sunny)", "rgba(255, 167, 38, 0)"],
      },
      wind: {
        fill: "var(--weather-cloudy)",
      },
      humidity: {
        stroke: "var(--weather-rainy)",
        gradient: ["var(--weather-rainy)", "rgba(79, 195, 247, 0)"],
      },
      uvLow: "#22c55e",
      uvMedium: "#eab308", 
      uvHigh: "#f97316",
      uvVeryHigh: "#ef4444",
    }
  }
  
  const colors = getColors()
  
  // Get UV index color based on value
  const getUvIndexColor = (value: number) => {
    if (value > 8) return colors.uvVeryHigh
    if (value > 5) return colors.uvHigh
    if (value > 2) return colors.uvMedium
    return colors.uvLow
  }
  
  // Animation duration based on state
  const animationDuration = animate ? 1500 : 0
  
  return (
    <Card className={cn(
      "bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-300",
      animate ? "animate-fade-in" : "opacity-0",
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weather Analytics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Temperature Trend</h3>
            </div>
            <div className="h-[180px] w-full p-1 transition-all duration-500">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.temp.gradient[0]} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={colors.temp.gradient[1]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontWeight: isHighContrast ? 'bold' : 'normal',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke={colors.temp.stroke} 
                    fillOpacity={1}
                    fill="url(#tempGradient)" 
                    strokeWidth={isHighContrast ? 3 : 2}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={animationDuration}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Wind Speed</h3>
            </div>
            <div className="h-[180px] w-full p-1 transition-all duration-500">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={windData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontWeight: isHighContrast ? 'bold' : 'normal',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                    cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                  />
                  <Bar 
                    dataKey="speed" 
                    fill={colors.wind.fill} 
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={animationDuration}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Humidity</h3>
            </div>
            <div className="h-[180px] w-full p-1 transition-all duration-500">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={humidityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.humidity.gradient[0]} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={colors.humidity.gradient[1]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontWeight: isHighContrast ? 'bold' : 'normal',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke={colors.humidity.stroke} 
                    fillOpacity={1}
                    fill="url(#humidityGradient)" 
                    strokeWidth={isHighContrast ? 3 : 2}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={animationDuration}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-primary" />
              <h3 className="font-medium">UV Index</h3>
            </div>
            <div className="h-[180px] w-full p-1 transition-all duration-500 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={uvIndexData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isHighContrast ? 45 : 50}
                    outerRadius={isHighContrast ? 75 : 70}
                    paddingAngle={isHighContrast ? 4 : 2}
                    dataKey="index"
                    isAnimationActive={true}
                    animationDuration={animationDuration}
                    animationEasing="ease-out"
                    animationBegin={300}
                    strokeWidth={isHighContrast ? 2 : 1}
                    stroke={isHighContrast ? "#000" : "rgba(0,0,0,0.1)"}
                  >
                    {uvIndexData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={getUvIndexColor(entry.index)}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontWeight: isHighContrast ? 'bold' : 'normal',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
