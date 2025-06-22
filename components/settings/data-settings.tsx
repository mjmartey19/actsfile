"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/lib/settings-context"
import { Database, Shield, BarChart3, Mail, AlertTriangle, Download, Trash2 } from "lucide-react"

export function DataSettings() {
  const { settings, updateSettings } = useSettings()

  const handleDataRetentionChange = (dataRetention: "1year" | "2years" | "5years" | "forever") => {
    updateSettings({ dataRetention })
  }

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    updateSettings({ [key]: value })
  }

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
      )
    ) {
      // Implement account deletion logic
      console.log("Account deletion requested")
    }
  }

  const handleDownloadData = () => {
    // Implement data download logic
    console.log("Data download requested")
  }

  return (
    <div className="space-y-6">
      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Data Retention</span>
          </CardTitle>
          <CardDescription>Control how long your data is stored on ActsFile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Data Retention Period</Label>
            <Select value={settings.dataRetention} onValueChange={handleDataRetentionChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1year">
                  <div>
                    <p className="font-medium">1 Year</p>
                    <p className="text-sm text-muted-foreground">
                      Data older than 1 year will be automatically deleted
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="2years">
                  <div>
                    <p className="font-medium">2 Years</p>
                    <p className="text-sm text-muted-foreground">
                      Data older than 2 years will be automatically deleted
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="5years">
                  <div>
                    <p className="font-medium">5 Years</p>
                    <p className="text-sm text-muted-foreground">
                      Data older than 5 years will be automatically deleted
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="forever">
                  <div>
                    <p className="font-medium">Keep Forever</p>
                    <p className="text-sm text-muted-foreground">Your data will be stored indefinitely</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Analytics & Data Collection</span>
          </CardTitle>
          <CardDescription>Control how your data is used for analytics and improvements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Data Collection</Label>
              <p className="text-sm text-muted-foreground">Help improve ActsFile by sharing anonymous usage data</p>
            </div>
            <Switch
              checked={settings.allowDataCollection}
              onCheckedChange={(value) => handleToggle("allowDataCollection", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Enable analytics to help us understand how you use ActsFile
              </p>
            </div>
            <Switch
              checked={settings.allowAnalytics}
              onCheckedChange={(value) => handleToggle("allowAnalytics", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Communication Preferences</span>
          </CardTitle>
          <CardDescription>Manage how we communicate with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Newsletter</Label>
              <p className="text-sm text-muted-foreground">
                Receive our monthly newsletter with impact stories and updates
              </p>
            </div>
            <Switch checked={settings.newsletter} onCheckedChange={(value) => handleToggle("newsletter", value)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive promotional emails about new features and events</p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(value) => handleToggle("marketingEmails", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Survey Invitations</Label>
              <p className="text-sm text-muted-foreground">Participate in surveys to help improve ActsFile</p>
            </div>
            <Switch
              checked={settings.surveyInvitations}
              onCheckedChange={(value) => handleToggle("surveyInvitations", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Export & Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Account Management</span>
          </CardTitle>
          <CardDescription>Export your data or manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Download Your Data</Label>
              <p className="text-sm text-muted-foreground">
                Get a copy of all your data including acts, profile information, and settings
              </p>
            </div>
            <Button variant="outline" onClick={handleDownloadData}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-800">Danger Zone</h4>
                <p className="text-sm text-red-700 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
