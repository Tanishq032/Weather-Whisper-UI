
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

interface CelestialBackgroundProps {
  className?: string
}

export function CelestialBackground({ className }: CelestialBackgroundProps) {
  const { theme } = useTheme()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none z-[-2]", className)}>
      {/* Sun or Moon based on theme */}
      <div 
        className={cn(
          "absolute rounded-full blur-3xl opacity-30 transition-all duration-500 ease-out",
          theme === 'dark' 
            ? "bg-blue-100 w-52 h-52" 
            : "bg-yellow-200 w-72 h-72"
        )}
        style={{ 
          left: `calc(${position.x}% - 150px)`, 
          top: `calc(${position.y}% - 150px)`,
          transform: `translate(${(position.x - 50) * -0.2}px, ${(position.y - 50) * -0.2}px)`,
        }}
      />
      
      {/* Additional stars in dark mode */}
      {theme === 'dark' && (
        <>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white animate-pulse-gentle"
              style={{ 
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
