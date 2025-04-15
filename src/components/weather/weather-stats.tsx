
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droplet, Sun, Thermometer, Wind } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
  return (
    <Card className={cn("bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in", className)}>
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
            <div className="h-[180px] w-full p-1 animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--weather-sunny)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--weather-sunny)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="var(--weather-sunny)" 
                    fillOpacity={1}
                    fill="url(#tempGradient)" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={1200}
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
            <div className="h-[180px] w-full p-1 animate-fade-in">
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
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar 
                    dataKey="speed" 
                    fill="var(--weather-cloudy)" 
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1200}
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
            <div className="h-[180px] w-full p-1 animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={humidityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--weather-rainy)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--weather-rainy)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="var(--weather-rainy)" 
                    fillOpacity={1}
                    fill="url(#humidityGradient)" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={1200}
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
            <div className="h-[180px] w-full p-1 animate-fade-in flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={uvIndexData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="index"
                    isAnimationActive={true}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  >
                    {uvIndexData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.index > 8 ? '#ef4444' : entry.index > 5 ? '#f97316' : entry.index > 2 ? '#eab308' : '#22c55e'}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
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
