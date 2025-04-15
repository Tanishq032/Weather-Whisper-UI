
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { BellRing, CircleUser, CloudSun, Contact, Eye, HeartHandshake, Volume2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface SettingItemProps {
  icon: React.ReactNode
  title: string
  description: string
  control: React.ReactNode
}

const SettingItem = ({ icon, title, description, control }: SettingItemProps) => (
  <div className="flex items-start justify-between space-y-0 pb-4">
    <div className="flex gap-2">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    {control}
  </div>
)

interface SettingsPanelProps {
  className?: string
}

export function SettingsPanel({ className }: SettingsPanelProps) {
  const { contrastMode, setContrastMode } = useTheme()
  const { enabled: soundEnabled, setEnabled: setSoundEnabled, play } = useSoundEffects()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [voiceoverEnabled, setVoiceoverEnabled] = useState(false)
  const [tempUnit, setTempUnit] = useState("celsius")
  
  // Function to handle switch toggle with sound
  const handleToggleWithSound = (
    currentValue: boolean,
    setter: (value: boolean) => void
  ) => {
    play("switch")
    setter(!currentValue)
  }

  // Handle high contrast toggle
  const handleContrastToggle = () => {
    play("switch")
    setContrastMode(contrastMode === "normal" ? "high" : "normal")
  }
  
  return (
    <Card className={cn("bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Settings</span>
          <ThemeToggle />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Preferences</h3>
            
            <SettingItem
              icon={<CloudSun className="h-4 w-4" />}
              title="Temperature Unit"
              description="Choose your preferred temperature unit"
              control={
                <RadioGroup 
                  defaultValue={tempUnit} 
                  onValueChange={(value) => {
                    setTempUnit(value)
                    play("click")
                  }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="celsius" id="celsius" />
                    <Label htmlFor="celsius" className="text-sm">°C</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="fahrenheit" id="fahrenheit" />
                    <Label htmlFor="fahrenheit" className="text-sm">°F</Label>
                  </div>
                </RadioGroup>
              }
            />

            <SettingItem
              icon={<BellRing className="h-4 w-4" />}
              title="Notifications"
              description="Receive weather alerts and updates"
              control={
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={() => handleToggleWithSound(notificationsEnabled, setNotificationsEnabled)}
                  className="animate-pulse-gentle"
                />
              }
            />

            <SettingItem
              icon={<Volume2 className="h-4 w-4" />}
              title="Sound Effects"
              description="Play ambient sounds based on weather"
              control={
                <Switch 
                  checked={soundEnabled} 
                  onCheckedChange={() => handleToggleWithSound(soundEnabled, setSoundEnabled)}
                  className={soundEnabled ? "animate-pulse-gentle" : ""}
                />
              }
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Accessibility</h3>
            
            <SettingItem
              icon={<Eye className="h-4 w-4" />}
              title="High Contrast Mode"
              description="Increase visibility and contrast"
              control={
                <Switch 
                  checked={contrastMode === "high"} 
                  onCheckedChange={handleContrastToggle}
                  className={contrastMode === "high" ? "animate-pulse-gentle" : ""}
                />
              }
            />

            <SettingItem
              icon={<HeartHandshake className="h-4 w-4" />}
              title="VoiceOver Support"
              description="Enable screen reader compatibility"
              control={
                <Switch 
                  checked={voiceoverEnabled} 
                  onCheckedChange={() => handleToggleWithSound(voiceoverEnabled, setVoiceoverEnabled)}
                />
              }
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Account</h3>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => play("click")}
              >
                <CircleUser className="mr-2 h-4 w-4" />
                Manage Profile
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => play("click")}
              >
                <Contact className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-center text-muted-foreground mt-4">
            Weather Whisper v1.0.0
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
