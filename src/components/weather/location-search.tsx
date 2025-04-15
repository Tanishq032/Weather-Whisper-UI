
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MapPin, Search, Star, XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { toast } from "sonner"

interface LocationSearchProps {
  className?: string
  onLocationSelect: (location: string) => void
  currentLocation?: string
}

export function LocationSearch({ className, onLocationSelect, currentLocation }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "New York", "London", "Tokyo", "Sydney", "Paris"
  ])
  
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [showCustomAdd, setShowCustomAdd] = useState(false)

  // Mock data for popular cities - in a real app, this would come from an API
  const popularCities = [
    "New York", "London", "Tokyo", "Paris", "Sydney", 
    "Singapore", "Dubai", "Rome", "San Francisco", "Hong Kong",
    "Berlin", "Toronto", "Barcelona", "Madrid", "Amsterdam",
    "Moscow", "Mumbai", "Seoul", "Bangkok", "Cairo",
    "Rio de Janeiro", "Buenos Aires", "Mexico City", "Cape Town", "Istanbul"
  ]

  // Filter cities based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCities([]);
      setShowCustomAdd(false);
      return;
    }
    
    const filtered = popularCities.filter(city => 
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered);
    
    // Show custom add option if no exact match and search has at least 3 characters
    const hasExactMatch = popularCities.some(
      city => city.toLowerCase() === searchQuery.toLowerCase()
    );
    setShowCustomAdd(!hasExactMatch && searchQuery.length >= 3);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      // Check if the query matches any of our known cities
      const matchedCity = popularCities.find(
        city => city.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (matchedCity) {
        setRecentSearches(prev => [matchedCity, ...prev].slice(0, 5));
        onLocationSelect(matchedCity);
      } else if (popularCities.some(city => 
        city.toLowerCase().includes(searchQuery.toLowerCase())
      )) {
        // If it's a partial match, use the first match
        const partialMatch = popularCities.find(city => 
          city.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (partialMatch) {
          setRecentSearches(prev => [partialMatch, ...prev].slice(0, 5));
          onLocationSelect(partialMatch);
        }
      } else {
        // If it's not in our list, we'll add it as a custom city
        setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
        onLocationSelect(searchQuery);
        toast.success(`Weather data for ${searchQuery} loaded successfully!`);
      }
    } else if (searchQuery) {
      onLocationSelect(searchQuery);
    }
    setSearchQuery("");
    setOpen(false);
  }

  const handleAddCustomCity = () => {
    if (searchQuery.trim()) {
      // Format the city name with proper capitalization
      const formattedCityName = searchQuery.trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      setRecentSearches(prev => [formattedCityName, ...prev].slice(0, 5));
      onLocationSelect(formattedCityName);
      toast.success(`Weather data for ${formattedCityName} loaded successfully!`);
      setSearchQuery("");
      setOpen(false);
    }
  }

  const handleLocationClick = (location: string) => {
    onLocationSelect(location);
  }

  const handleRemoveLocation = (location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(item => item !== location));
  }

  return (
    <Card className={cn(
      "bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in",
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Search Location</span>
          {currentLocation && (
            <span className="text-sm font-normal text-muted-foreground flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> Current: {currentLocation}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative">
          <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="flex-1 justify-between"
                >
                  {searchQuery ? searchQuery : "Select a city..."}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search city..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {showCustomAdd ? (
                        <div className="py-3 px-2">
                          <p className="text-sm text-muted-foreground mb-2">
                            No matching cities found. Add a custom city?
                          </p>
                          <Button 
                            onClick={handleAddCustomCity}
                            className="w-full"
                            size="sm"
                          >
                            Add "{searchQuery}"
                          </Button>
                        </div>
                      ) : (
                        "No city found. Type at least 3 characters to add custom city."
                      )}
                    </CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={(currentValue) => {
                              setSearchQuery(currentValue);
                              setOpen(false);
                              onLocationSelect(currentValue);
                              if (!recentSearches.includes(currentValue)) {
                                setRecentSearches(prev => [currentValue, ...prev].slice(0, 5));
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                currentLocation === city ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city}
                          </CommandItem>
                        ))
                      ) : (
                        popularCities.slice(0, 5).map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={(currentValue) => {
                              setSearchQuery(currentValue);
                              setOpen(false);
                              onLocationSelect(currentValue);
                              if (!recentSearches.includes(currentValue)) {
                                setRecentSearches(prev => [currentValue, ...prev].slice(0, 5));
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                currentLocation === city ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city}
                          </CommandItem>
                        ))
                      )}
                      
                      {showCustomAdd && (
                        <CommandItem
                          value={`add-${searchQuery}`}
                          onSelect={() => handleAddCustomCity()}
                          className="border-t border-border mt-1 pt-1"
                        >
                          <MapPin className="mr-2 h-4 w-4 text-primary" />
                          Add "{searchQuery}"
                        </CommandItem>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => {
                navigator.geolocation?.getCurrentPosition(
                  (position) => {
                    // In a real app, you'd convert coordinates to a location name
                    // For demo purposes, just use "Current Location"
                    onLocationSelect("Current Location");
                    toast.success("Using your current location!");
                  },
                  (error) => {
                    toast.error("Error getting location. Please search manually.");
                    console.error("Error getting location", error);
                  }
                );
              }}
              title="Use current location"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 animate-fade-in">
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
            {popularCities.slice(0, 15).map((city, index) => (
              <button
                key={index}
                onClick={() => handleLocationClick(city)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm transition-colors animate-scale-in",
                  currentLocation === city 
                    ? "bg-primary/20 font-medium" 
                    : "bg-muted/50 hover:bg-primary/10"
                )}
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
