
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  weatherCondition: string
  className?: string
}

export function AnimatedBackground({ weatherCondition, className }: AnimatedBackgroundProps) {
  const { theme } = useTheme()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }>>([])
  
  useEffect(() => {
    const condition = weatherCondition.toLowerCase()
    let particleCount = 0
    let particleType = ""
    
    if (condition.includes("rain") || condition.includes("drizzle")) {
      particleCount = 50
      particleType = "rain"
    } else if (condition.includes("snow")) {
      particleCount = 30
      particleType = "snow"
    } else if (condition.includes("cloud")) {
      particleCount = 8
      particleType = "cloud"
    } else if (condition.includes("sunny") || condition.includes("clear")) {
      particleCount = 5
      particleType = "sun"
    }
    
    if (particleCount > 0) {
      const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        size: particleType === "cloud" 
          ? 60 + Math.random() * 40 
          : particleType === "sun" 
            ? 10 + Math.random() * 15 
            : 2 + Math.random() * 3,
        speed: particleType === "cloud" 
          ? 0.05 + Math.random() * 0.05 
          : particleType === "snow" 
            ? 0.2 + Math.random() * 0.3 
            : 0.8 + Math.random() * 0.4,
        opacity: particleType === "cloud" 
          ? 0.2 + Math.random() * 0.3 
          : particleType === "sun" 
            ? 0.4 + Math.random() * 0.2 
            : 0.7 + Math.random() * 0.3
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [weatherCondition])
  
  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-[-1]", className)}>
      {/* Gradient background based on weather condition */}
      {weatherCondition.toLowerCase().includes("rain") && (
        <div className="absolute inset-0 bg-gradient-to-b from-weather-rainy/30 to-weather-rainy/5" />
      )}
      {weatherCondition.toLowerCase().includes("snow") && (
        <div className="absolute inset-0 bg-gradient-to-b from-weather-snowy/30 to-weather-snowy/5" />
      )}
      {weatherCondition.toLowerCase().includes("cloud") && (
        <div className="absolute inset-0 bg-gradient-to-b from-weather-cloudy/30 to-weather-cloudy/5" />
      )}
      {(weatherCondition.toLowerCase().includes("sunny") || weatherCondition.toLowerCase().includes("clear")) && (
        <div className="absolute inset-0 bg-gradient-to-b from-weather-sunny/30 to-weather-sunny/5" />
      )}
      {weatherCondition.toLowerCase().includes("thunder") && (
        <div className="absolute inset-0 bg-gradient-to-b from-weather-thunderstorm/30 to-weather-thunderstorm/5" />
      )}
      
      {/* Animated particles */}
      {particles.map((particle) => {
        const condition = weatherCondition.toLowerCase()
        let particleStyle: React.CSSProperties = {
          position: 'absolute',
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          opacity: particle.opacity,
        }
        
        if (condition.includes("rain") || condition.includes("drizzle")) {
          particleStyle = {
            ...particleStyle,
            width: '1px',
            height: `${particle.size * 10}px`,
            backgroundColor: theme === 'dark' ? 'rgba(220, 230, 240, 0.8)' : 'rgba(100, 150, 200, 0.6)',
            animation: `rain ${1/particle.speed}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 5px rgba(100, 150, 200, 0.3)',
          }
        } else if (condition.includes("snow")) {
          particleStyle = {
            ...particleStyle,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: theme === 'dark' ? 'rgba(220, 230, 240, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            animation: `snow ${3/particle.speed}s linear infinite`,
            animationDelay: `${Math.random() * 4}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }
        } else if (condition.includes("cloud")) {
          particleStyle = {
            ...particleStyle,
            width: `${particle.size}px`,
            height: `${particle.size * 0.6}px`,
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? 'rgba(180, 180, 200, 0.2)' : 'rgba(255, 255, 255, 0.7)',
            animation: `float ${10/particle.speed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: theme === 'dark' ? '0 0 40px rgba(180, 180, 200, 0.3)' : '0 0 40px rgba(255, 255, 255, 0.5)',
          }
        } else if (condition.includes("sunny") || condition.includes("clear")) {
          particleStyle = {
            ...particleStyle,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? 'rgba(255, 210, 120, 0.3)' : 'rgba(255, 200, 100, 0.4)',
            boxShadow: '0 0 40px rgba(255, 200, 100, 0.6)',
            animation: `pulse-gentle ${3/particle.speed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }
        }
        
        return <div key={particle.id} style={particleStyle} />
      })}
    </div>
  )
}
