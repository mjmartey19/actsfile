"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSettings } from "@/lib/settings-context"
import { Bug, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

export function SettingsDebug() {
  const { settings, loading, updateSettings, resetSettings } = useSettings()
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  const runTests = async () => {
    console.log("🧪 Running settings functionality tests...")
    const results: Record<string, boolean> = {}

    // Test theme change
    try {
      const originalTheme = settings.theme
      const testTheme = originalTheme === "light" ? "dark" : "light"
      const result = await updateSettings({ theme: testTheme })
      results.themeChange = result.success
      // Revert
      await updateSettings({ theme: originalTheme })
    } catch (error) {
      results.themeChange = false
    }

    // Test privacy setting
    try {
      const originalVisibility = settings.profileVisibility
      const testVisibility = originalVisibility === "public" ? "private" : "public"
      const result = await updateSettings({ profileVisibility: testVisibility })
      results.privacyChange = result.success
      // Revert
      await updateSettings({ profileVisibility: originalVisibility })
    } catch (error) {
      results.privacyChange = false
    }

    // Test notification setting
    try {
      const originalSetting = settings.emailNotifications.newFollower
      const result = await updateSettings({
        emailNotifications: {
          ...settings.emailNotifications,
          newFollower: !originalSetting,
        },
      })
      results.notificationChange = result.success
      // Revert
      await updateSettings({
        emailNotifications: {
          ...settings.emailNotifications,
          newFollower: originalSetting,
        },
      })
    } catch (error) {
      results.notificationChange = false
    }

    // Test compact mode
    try {
      const originalCompact = settings.compactMode
      const result = await updateSettings({ compactMode: !originalCompact })
      results.compactModeChange = result.success
      // Revert
      await updateSettings({ compactMode: originalCompact })
    } catch (error) {
      results.compactModeChange = false
    }

    setTestResults(results)
    console.log("🧪 Test results:", results)
  }

  const testCount = Object.keys(testResults).length
  const passedCount = Object.values(testResults).filter(Boolean).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bug className="h-5 w-5" />
          <span>Settings Debug & Testing</span>
        </CardTitle>
        <CardDescription>Debug information and functionality tests for settings system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Settings Status */}
        <div className="space-y-3">
          <h4 className="font-medium">Current Settings Status</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Badge variant="outline">Loading: {loading ? "Yes" : "No"}</Badge>
            <Badge variant="outline">Theme: {settings.theme}</Badge>
            <Badge variant="outline">Language: {settings.language}</Badge>
            <Badge variant="outline">Privacy: {settings.profileVisibility}</Badge>
            <Badge variant="outline">Compact: {settings.compactMode ? "Yes" : "No"}</Badge>
            <Badge variant="outline">2FA: {settings.twoFactorEnabled ? "Yes" : "No"}</Badge>
          </div>
        </div>

        {/* Functionality Tests */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Functionality Tests</h4>
            <Button onClick={runTests} size="sm" disabled={loading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Tests
            </Button>
          </div>

          {testCount > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Tests passed: {passedCount}/{testCount}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(testResults).map(([test, passed]) => (
                  <div key={test} className="flex items-center space-x-2">
                    {passed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">{test}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Object Preview */}
        <div className="space-y-3">
          <h4 className="font-medium">Settings Object (Preview)</h4>
          <div className="bg-muted p-3 rounded-lg">
            <pre className="text-xs overflow-auto max-h-40">
              {JSON.stringify(
                {
                  theme: settings.theme,
                  language: settings.language,
                  profileVisibility: settings.profileVisibility,
                  compactMode: settings.compactMode,
                  twoFactorEnabled: settings.twoFactorEnabled,
                  emailNotifications: Object.keys(settings.emailNotifications).length,
                  pushNotifications: Object.keys(settings.pushNotifications).length,
                  preferredGoals: {
                    sdgs: settings.preferredGoals.sdgs.length,
                    agenda2063: settings.preferredGoals.agenda2063.length,
                    otherTargets: settings.preferredGoals.otherTargets.length,
                  },
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateSettings({ theme: settings.theme === "light" ? "dark" : "light" })}
            >
              Toggle Theme
            </Button>
            <Button variant="outline" size="sm" onClick={() => updateSettings({ compactMode: !settings.compactMode })}>
              Toggle Compact Mode
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateSettings({
                  profileVisibility: settings.profileVisibility === "public" ? "private" : "public",
                })
              }
            >
              Toggle Privacy
            </Button>
            <Button variant="destructive" size="sm" onClick={resetSettings}>
              Reset All Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
