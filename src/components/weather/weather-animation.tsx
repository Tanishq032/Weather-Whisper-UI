
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

interface ParticleProps {
  condition: string
  count: number
  className?: string
}

function Particles({ condition, count, className }: ParticleProps) {
  const { theme } = useTheme()
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; delay: number; speed: number; blur: number }>>([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      speed: Math.random() * 5 + 10,
      blur: Math.random() * 2
    }))
    
    setParticles(newParticles)
  }, [count])
  
  if (condition !== "rainy" && condition !== "snowy") return null
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-full will-change-transform",
            condition === "rainy" 
              ? "bg-blue-100 animate-rain" 
              : "bg-white animate-snow"
          )}
          style={{
            width: condition === "rainy" ? "1px" : `${particle.size}px`,
            height: condition === "rainy" ? `${particle.size * 10}px` : `${particle.size}px`,
            left: `${particle.left}%`,
            top: `-20px`,
            opacity: theme === 'dark' ? 0.7 : 0.5,
            filter: `blur(${particle.blur}px)`,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

interface CloudProps {
  className?: string
}

function Clouds({ className }: CloudProps) {
  const clouds = [
    { left: "10%", top: "10%", width: "300px", opacity: 0.5, delay: 0 },
    { left: "30%", top: "15%", width: "200px", opacity: 0.3, delay: 4 },
    { left: "60%", top: "8%", width: "250px", opacity: 0.4, delay: 8 },
    { left: "80%", top: "12%", width: "180px", opacity: 0.2, delay: 12 },
  ]
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 blur-xl animate-float"
          style={{
            width: cloud.width,
            height: "60px",
            left: cloud.left,
            top: cloud.top,
            opacity: cloud.opacity,
            animationDelay: `${cloud.delay}s`,
            animationDuration: "20s"
          }}
        />
      ))}
    </div>
  )
}

interface WeatherAnimationProps {
  condition: string
  className?: string
}

export function WeatherAnimation({ condition, className }: WeatherAnimationProps) {
  const particleCount = condition === "rainy" ? 100 : condition === "snowy" ? 50 : 0
  
  return (
    <div className={cn("fixed inset-0 z-[-1] pointer-events-none", className)}>
      <Clouds />
      <Particles condition={condition} count={particleCount} />
    </div>
  )
}
