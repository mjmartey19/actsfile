"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/lib/settings-context"
import { Shield, Eye, EyeOff, Phone, Mail, MapPin, Search, Lock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PrivacySettings() {
  const { settings, updateSettings } = useSettings()
  const { toast } = useToast()

  const handleProfileVisibilityChange = async (profileVisibility: "public" | "friends" | "private") => {
    console.log("👁️ Profile visibility change requested:", profileVisibility)
    const result = await updateSettings({ profileVisibility })
    if (result.success) {
      toast({
        title: "Profile Visibility Updated",
        description: `Profile is now ${profileVisibility}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update profile visibility",
        variant: "destructive",
      })
    }
  }

  const handleToggle = async (key: keyof typeof settings, value: boolean) => {
    console.log(`🔒 Privacy setting change requested: ${key} = ${value}`)
    const result = await updateSettings({ [key]: value })
    if (result.success) {
      toast({
        title: "Privacy Setting Updated",
        description: `${key} ${value ? "enabled" : "disabled"}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update privacy setting",
        variant: "destructive",
      })
    }
  }

  const handleTwoFactorToggle = async (enabled: boolean) => {
    console.log("🔐 Two-factor authentication change requested:", enabled)
    const result = await updateSettings({ twoFactorEnabled: enabled })
    if (result.success) {
      toast({
        title: "Two-Factor Authentication",
        description: `Two-factor authentication ${enabled ? "enabled" : "disabled"}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update two-factor authentication",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Profile Visibility</span>
          </CardTitle>
          <CardDescription>Control who can see your profile and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profile-visibility">Who can see your profile</Label>
            <Select value={settings.profileVisibility} onValueChange={handleProfileVisibilityChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-sm text-muted-foreground">Anyone can see your profile</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="friends">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Friends Only</p>
                      <p className="text-sm text-muted-foreground">Only people you follow can see your profile</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Private</p>
                      <p className="text-sm text-muted-foreground">Only you can see your profile</p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Current setting: <strong>{settings.profileVisibility}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contact Information Visibility</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Show Email Address</span>
                </Label>
                <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
              </div>
              <Switch checked={settings.showEmail} onCheckedChange={(value) => handleToggle("showEmail", value)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Show Phone Number</span>
                </Label>
                <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
              </div>
              <Switch checked={settings.showPhone} onCheckedChange={(value) => handleToggle("showPhone", value)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Show Location</span>
                </Label>
                <p className="text-sm text-muted-foreground">Allow others to see your location</p>
              </div>
              <Switch
                checked={settings.showLocation}
                onCheckedChange={(value) => handleToggle("showLocation", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Discovery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search & Discovery</span>
          </CardTitle>
          <CardDescription>Control how others can find you on ActsFile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow search by email</Label>
              <p className="text-sm text-muted-foreground">Let others find you using your email address</p>
            </div>
            <Switch
              checked={settings.allowSearchByEmail}
              onCheckedChange={(value) => handleToggle("allowSearchByEmail", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow search by phone</Label>
              <p className="text-sm text-muted-foreground">Let others find you using your phone number</p>
            </div>
            <Switch
              checked={settings.allowSearchByPhone}
              onCheckedChange={(value) => handleToggle("allowSearchByPhone", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Security</span>
          </CardTitle>
          <CardDescription>Additional security measures for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={settings.twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
              {settings.twoFactorEnabled && (
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              )}
            </div>
          </div>

          {!settings.twoFactorEnabled && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Recommended</p>
                <p className="text-yellow-700">
                  Enable two-factor authentication to better protect your account from unauthorized access.
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Current Privacy Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Profile Visibility:</p>
                <p className="font-medium">{settings.profileVisibility}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Two-Factor Auth:</p>
                <p className="font-medium">{settings.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email Visible:</p>
                <p className="font-medium">{settings.showEmail ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location Visible:</p>
                <p className="font-medium">{settings.showLocation ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
