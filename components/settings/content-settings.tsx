"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSettings } from "@/lib/settings-context"
import { FileText, Eye, EyeOff, Play, TrendingUp, Clock } from "lucide-react"

export function ContentSettings() {
  const { settings, updateSettings } = useSettings()

  const handleDefaultPrivacyChange = (defaultActPrivacy: "public" | "friends" | "private") => {
    updateSettings({ defaultActPrivacy })
  }

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    updateSettings({ [key]: value })
  }

  const handleFeedAlgorithmChange = (feedAlgorithm: "chronological" | "recommended") => {
    updateSettings({ feedAlgorithm })
  }

  return (
    <div className="space-y-6">
      {/* Default Act Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Default Act Settings</span>
          </CardTitle>
          <CardDescription>Set default preferences for when you post new acts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Privacy Level</Label>
            <Select value={settings.defaultActPrivacy} onValueChange={handleDefaultPrivacyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-sm text-muted-foreground">Everyone can see your acts</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="friends">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Friends Only</p>
                      <p className="text-sm text-muted-foreground">Only people you follow can see your acts</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Private</p>
                      <p className="text-sm text-muted-foreground">Only you can see your acts</p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Content Display</span>
          </CardTitle>
          <CardDescription>Control how content is displayed in your feed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Sensitive Content</Label>
              <p className="text-sm text-muted-foreground">Display content that may be sensitive or controversial</p>
            </div>
            <Switch
              checked={settings.showSensitiveContent}
              onCheckedChange={(value) => handleToggle("showSensitiveContent", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Auto-play Videos</span>
              </Label>
              <p className="text-sm text-muted-foreground">Automatically play videos in your feed</p>
            </div>
            <Switch
              checked={settings.autoPlayVideos}
              onCheckedChange={(value) => handleToggle("autoPlayVideos", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Feed Algorithm */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Feed Algorithm</span>
          </CardTitle>
          <CardDescription>Choose how your feed is organized</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-base font-medium">Feed Order</Label>
            <RadioGroup value={settings.feedAlgorithm} onValueChange={handleFeedAlgorithmChange} className="space-y-3">
              <div className="flex items-start space-x-3 border rounded-lg p-4">
                <RadioGroupItem value="recommended" id="recommended" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="recommended" className="flex items-center space-x-2 cursor-pointer">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">Recommended</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    See acts based on your interests, interactions, and trending content
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border rounded-lg p-4">
                <RadioGroupItem value="chronological" id="chronological" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="chronological" className="flex items-center space-x-2 cursor-pointer">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Chronological</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">See acts in the order they were posted, newest first</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
