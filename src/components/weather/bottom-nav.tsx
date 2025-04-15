
import { cn } from "@/lib/utils"
import { Home, MapPin, Search, Settings } from "lucide-react"
import { ReactNode } from "react"

interface NavItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  onClick: () => void
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    className={cn(
      "flex flex-col items-center justify-center py-2 px-1 transition-colors",
      active 
        ? "text-primary" 
        : "text-muted-foreground hover:text-foreground"
    )}
    onClick={onClick}
  >
    <div className="relative">
      {icon}
      {active && (
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
      )}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </button>
)

interface BottomNavProps {
  activeTab: string
  onChange: (tab: string) => void
  className?: string
}

export function BottomNav({ activeTab, onChange, className }: BottomNavProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50 animate-slide-in-right",
      className
    )}>
      <div className="max-w-md mx-auto flex items-center justify-around">
        <NavItem 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          active={activeTab === "home"} 
          onClick={() => onChange("home")}
        />
        <NavItem 
          icon={<MapPin className="h-5 w-5" />} 
          label="Weekly" 
          active={activeTab === "weekly"} 
          onClick={() => onChange("weekly")}
        />
        <NavItem 
          icon={<Search className="h-5 w-5" />} 
          label="Search" 
          active={activeTab === "search"} 
          onClick={() => onChange("search")}
        />
        <NavItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
          active={activeTab === "settings"} 
          onClick={() => onChange("settings")}
        />
      </div>
    </div>
  )
}
