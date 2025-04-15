
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MapPin, Search, Star, XCircle } from "lucide-react"
import { useState } from "react"

interface LocationSearchProps {
  className?: string
  onLocationSelect: (location: string) => void
}

export function LocationSearch({ className, onLocationSelect }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "New York", "London", "Tokyo", "Sydney", "Paris"
  ])

  const handleSearch = () => {
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5))
    }
    onLocationSelect(searchQuery)
    setSearchQuery("")
  }

  const handleLocationClick = (location: string) => {
    onLocationSelect(location)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleRemoveLocation = (location: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRecentSearches(prev => prev.filter(item => item !== location))
  }

  // Mock data for popular cities
  const popularCities = [
    "New York", "London", "Tokyo", "Paris", "Sydney", 
    "Singapore", "Dubai", "Rome", "San Francisco", "Hong Kong",
    "Berlin", "Toronto"
  ]

  return (
    <Card className={cn("bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Search Location</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button variant="default" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => {
              navigator.geolocation?.getCurrentPosition(
                (position) => {
                  // In a real app, you'd convert coordinates to a location name
                  // For demo purposes, just use "Current Location"
                  onLocationSelect("Current Location")
                },
                (error) => {
                  console.error("Error getting location", error)
                }
              )
            }}
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>

        {recentSearches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
              {recentSearches.map((location, index) => (
                <div
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  className="flex items-center justify-between rounded-md border px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{location}</span>
                  </div>
                  <XCircle 
                    className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={(e) => handleRemoveLocation(location, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Popular Cities</h3>
          <div className="flex flex-wrap gap-2 animate-fade-in">
            {popularCities.map((city, index) => (
              <button
                key={index}
                onClick={() => handleLocationClick(city)}
                className="rounded-full bg-muted/50 px-3 py-1 text-sm hover:bg-primary/10 transition-colors animate-scale-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
