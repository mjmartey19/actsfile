"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSettings } from "@/lib/settings-context"
import { Monitor, Sun, Moon, Palette, Globe, Calendar, Minimize2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DisplaySettings() {
  const { settings, updateSettings } = useSettings()
  const { toast } = useToast()

  const handleThemeChange = async (theme: "light" | "dark" | "system") => {
    console.log("🎨 Theme change requested:", theme)
    const result = await updateSettings({ theme })
    if (result.success) {
      toast({
        title: "Theme Updated",
        description: `Theme changed to ${theme}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update theme",
        variant: "destructive",
      })
    }
  }

  const handleLanguageChange = async (language: string) => {
    console.log("🌐 Language change requested:", language)
    const result = await updateSettings({ language })
    if (result.success) {
      toast({
        title: "Language Updated",
        description: `Language changed to ${languages.find((l) => l.value === language)?.label}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update language",
        variant: "destructive",
      })
    }
  }

  const handleTimezoneChange = async (timezone: string) => {
    console.log("🕐 Timezone change requested:", timezone)
    const result = await updateSettings({ timezone })
    if (result.success) {
      toast({
        title: "Timezone Updated",
        description: `Timezone changed to ${timezones.find((t) => t.value === timezone)?.label}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update timezone",
        variant: "destructive",
      })
    }
  }

  const handleDateFormatChange = async (dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD") => {
    console.log("📅 Date format change requested:", dateFormat)
    const result = await updateSettings({ dateFormat })
    if (result.success) {
      toast({
        title: "Date Format Updated",
        description: `Date format changed to ${dateFormat}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update date format",
        variant: "destructive",
      })
    }
  }

  const handleCompactModeChange = async (compactMode: boolean) => {
    console.log("📱 Compact mode change requested:", compactMode)
    const result = await updateSettings({ compactMode })
    if (result.success) {
      toast({
        title: "Compact Mode Updated",
        description: `Compact mode ${compactMode ? "enabled" : "disabled"}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update compact mode",
        variant: "destructive",
      })
    }
  }

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "pt", label: "Português" },
    { value: "ar", label: "العربية" },
    { value: "sw", label: "Kiswahili" },
    { value: "ha", label: "Hausa" },
    { value: "yo", label: "Yorùbá" },
    { value: "ig", label: "Igbo" },
  ]

  const timezones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "Eastern Time (US & Canada)" },
    { value: "America/Chicago", label: "Central Time (US & Canada)" },
    { value: "America/Denver", label: "Mountain Time (US & Canada)" },
    { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
    { value: "Europe/London", label: "London" },
    { value: "Europe/Paris", label: "Paris" },
    { value: "Europe/Berlin", label: "Berlin" },
    { value: "Africa/Cairo", label: "Cairo" },
    { value: "Africa/Lagos", label: "Lagos" },
    { value: "Africa/Nairobi", label: "Nairobi" },
    { value: "Africa/Johannesburg", label: "Johannesburg" },
    { value: "Asia/Tokyo", label: "Tokyo" },
    { value: "Asia/Shanghai", label: "Shanghai" },
    { value: "Asia/Kolkata", label: "Mumbai" },
  ]

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize how ActsFile looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Theme</Label>
            <RadioGroup value={settings.theme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center space-x-2 cursor-pointer">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center space-x-2 cursor-pointer">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center space-x-2 cursor-pointer">
                  <Monitor className="h-4 w-4" />
                  <span>System</span>
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
              Current theme: <strong>{settings.theme}</strong>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium flex items-center space-x-2">
                <Minimize2 className="h-4 w-4" />
                <span>Compact Mode</span>
              </Label>
              <p className="text-sm text-muted-foreground">Use a more compact layout to fit more content</p>
            </div>
            <Switch checked={settings.compactMode} onCheckedChange={handleCompactModeChange} />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Language & Region</span>
          </CardTitle>
          <CardDescription>Set your preferred language and regional settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Current: {languages.find((l) => l.value === settings.language)?.label}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={handleTimezoneChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Current: {timezones.find((t) => t.value === settings.timezone)?.label}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date Format</span>
            </Label>
            <RadioGroup
              value={settings.dateFormat}
              onValueChange={handleDateFormatChange}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MM/DD/YYYY" id="us-date" />
                <Label htmlFor="us-date">MM/DD/YYYY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DD/MM/YYYY" id="eu-date" />
                <Label htmlFor="eu-date">DD/MM/YYYY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="YYYY-MM-DD" id="iso-date" />
                <Label htmlFor="iso-date">YYYY-MM-DD</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
              Current format: <strong>{settings.dateFormat}</strong> (Example:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: settings.dateFormat.startsWith("MM") ? "2-digit" : "2-digit",
                day: "2-digit",
              })}
              )
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
