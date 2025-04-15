
import { ThemeToggle } from "../theme-toggle"
import { cn } from "@/lib/utils"
import { CloudDrizzle, CloudSun, MapPin, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

interface HeaderProps {
  currentLocation: string
  onMenuClick?: () => void
  className?: string
}

export function Header({ currentLocation, onMenuClick, className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 60000) // Update every minute
    
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })
  
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
  
  return (
    <header className={cn(
      "sticky top-0 z-40 transition-all duration-200",
      isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent",
      className
    )}>
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <CloudSun className="h-6 w-6 text-primary animate-pulse-gentle" />
          <h1 className="text-xl font-heading font-bold tracking-tight">Weather Whisper</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      
      <div className={cn(
        "px-4 pb-2 flex flex-col",
        isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
      )}>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{currentLocation}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </header>
  )
}
