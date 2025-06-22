"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSettings } from "@/lib/settings-context"
import { Mail, Smartphone, Heart, MessageCircle, Share2, Users, TrendingUp, Shield } from "lucide-react"

export function NotificationSettings() {
  const { settings, updateSettings } = useSettings()

  const handleEmailNotificationChange = (key: keyof typeof settings.emailNotifications, value: boolean) => {
    updateSettings({
      emailNotifications: {
        ...settings.emailNotifications,
        [key]: value,
      },
    })
  }

  const handlePushNotificationChange = (key: keyof typeof settings.pushNotifications, value: boolean) => {
    updateSettings({
      pushNotifications: {
        ...settings.pushNotifications,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>Choose which email notifications you'd like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Activity</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>New Follower</span>
                </Label>
                <p className="text-sm text-muted-foreground">When someone starts following you</p>
              </div>
              <Switch
                checked={settings.emailNotifications.newFollower}
                onCheckedChange={(value) => handleEmailNotificationChange("newFollower", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Act Liked</span>
                </Label>
                <p className="text-sm text-muted-foreground">When someone likes your act</p>
              </div>
              <Switch
                checked={settings.emailNotifications.actLiked}
                onCheckedChange={(value) => handleEmailNotificationChange("actLiked", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Act Commented</span>
                </Label>
                <p className="text-sm text-muted-foreground">When someone comments on your act</p>
              </div>
              <Switch
                checked={settings.emailNotifications.actCommented}
                onCheckedChange={(value) => handleEmailNotificationChange("actCommented", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Act Shared</span>
                </Label>
                <p className="text-sm text-muted-foreground">When someone shares your act</p>
              </div>
              <Switch
                checked={settings.emailNotifications.actShared}
                onCheckedChange={(value) => handleEmailNotificationChange("actShared", value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Digest & Reports</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Weekly Digest</span>
                </Label>
                <p className="text-sm text-muted-foreground">Weekly summary of platform activity</p>
              </div>
              <Switch
                checked={settings.emailNotifications.weeklyDigest}
                onCheckedChange={(value) => handleEmailNotificationChange("weeklyDigest", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Monthly Report</Label>
                <p className="text-sm text-muted-foreground">Your monthly impact report</p>
              </div>
              <Switch
                checked={settings.emailNotifications.monthlyReport}
                onCheckedChange={(value) => handleEmailNotificationChange("monthlyReport", value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">System</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-muted-foreground">Important platform updates and new features</p>
              </div>
              <Switch
                checked={settings.emailNotifications.systemUpdates}
                onCheckedChange={(value) => handleEmailNotificationChange("systemUpdates", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Security Alerts</span>
                </Label>
                <p className="text-sm text-muted-foreground">Important security notifications (recommended)</p>
              </div>
              <Switch
                checked={settings.emailNotifications.securityAlerts}
                onCheckedChange={(value) => handleEmailNotificationChange("securityAlerts", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Push Notifications</span>
          </CardTitle>
          <CardDescription>Manage real-time notifications on your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>New Follower</span>
              </Label>
              <p className="text-sm text-muted-foreground">Instant notification for new followers</p>
            </div>
            <Switch
              checked={settings.pushNotifications.newFollower}
              onCheckedChange={(value) => handlePushNotificationChange("newFollower", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Act Liked</span>
              </Label>
              <p className="text-sm text-muted-foreground">When someone likes your act</p>
            </div>
            <Switch
              checked={settings.pushNotifications.actLiked}
              onCheckedChange={(value) => handlePushNotificationChange("actLiked", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Act Commented</span>
              </Label>
              <p className="text-sm text-muted-foreground">When someone comments on your act</p>
            </div>
            <Switch
              checked={settings.pushNotifications.actCommented}
              onCheckedChange={(value) => handlePushNotificationChange("actCommented", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Act Shared</span>
              </Label>
              <p className="text-sm text-muted-foreground">When someone shares your act</p>
            </div>
            <Switch
              checked={settings.pushNotifications.actShared}
              onCheckedChange={(value) => handlePushNotificationChange("actShared", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mentions</Label>
              <p className="text-sm text-muted-foreground">When someone mentions you</p>
            </div>
            <Switch
              checked={settings.pushNotifications.mentions}
              onCheckedChange={(value) => handlePushNotificationChange("mentions", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Group Activity</Label>
              <p className="text-sm text-muted-foreground">Activity in groups you've joined</p>
            </div>
            <Switch
              checked={settings.pushNotifications.groupActivity}
              onCheckedChange={(value) => handlePushNotificationChange("groupActivity", value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
