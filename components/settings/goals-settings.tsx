"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useSettings } from "@/lib/settings-context"
import { SDG_GOALS, AFRICA_AGENDA_2063, OTHER_INTERNATIONAL_TARGETS } from "@/lib/constants"
import { Target, Globe, Star } from "lucide-react"

export function GoalsSettings() {
  const { settings, updateSettings } = useSettings()

  const handleSDGToggle = (sdgId: number) => {
    const currentSDGs = settings.preferredGoals.sdgs
    const newSDGs = currentSDGs.includes(sdgId) ? currentSDGs.filter((id) => id !== sdgId) : [...currentSDGs, sdgId]

    updateSettings({
      preferredGoals: {
        ...settings.preferredGoals,
        sdgs: newSDGs,
      },
    })
  }

  const handleAgenda2063Toggle = (aspirationId: number) => {
    const currentAspirations = settings.preferredGoals.agenda2063
    const newAspirations = currentAspirations.includes(aspirationId)
      ? currentAspirations.filter((id) => id !== aspirationId)
      : [...currentAspirations, aspirationId]

    updateSettings({
      preferredGoals: {
        ...settings.preferredGoals,
        agenda2063: newAspirations,
      },
    })
  }

  const handleOtherTargetToggle = (targetId: number) => {
    const currentTargets = settings.preferredGoals.otherTargets
    const newTargets = currentTargets.includes(targetId)
      ? currentTargets.filter((id) => id !== targetId)
      : [...currentTargets, targetId]

    updateSettings({
      preferredGoals: {
        ...settings.preferredGoals,
        otherTargets: newTargets,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* SDGs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>UN Sustainable Development Goals</span>
          </CardTitle>
          <CardDescription>Select the SDGs you're most interested in to personalize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SDG_GOALS.map((sdg) => (
              <div
                key={sdg.id}
                className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  settings.preferredGoals.sdgs.includes(sdg.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleSDGToggle(sdg.id)}
              >
                <Checkbox
                  checked={settings.preferredGoals.sdgs.includes(sdg.id)}
                  onChange={() => handleSDGToggle(sdg.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" style={{ borderColor: sdg.color, color: sdg.color }}>
                      SDG {sdg.id}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{sdg.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Africa's Agenda 2063 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Africa's Agenda 2063</span>
          </CardTitle>
          <CardDescription>Select the aspirations that align with your interests and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {AFRICA_AGENDA_2063.map((aspiration) => (
              <div
                key={aspiration.id}
                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  settings.preferredGoals.agenda2063.includes(aspiration.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleAgenda2063Toggle(aspiration.id)}
              >
                <Checkbox
                  checked={settings.preferredGoals.agenda2063.includes(aspiration.id)}
                  onChange={() => handleAgenda2063Toggle(aspiration.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Aspiration {aspiration.id}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{aspiration.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other International Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Other International Targets</span>
          </CardTitle>
          <CardDescription>Select additional international frameworks and targets you're interested in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OTHER_INTERNATIONAL_TARGETS.map((target) => (
              <div
                key={target.id}
                className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  settings.preferredGoals.otherTargets.includes(target.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleOtherTargetToggle(target.id)}
              >
                <Checkbox
                  checked={settings.preferredGoals.otherTargets.includes(target.id)}
                  onChange={() => handleOtherTargetToggle(target.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {target.category}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{target.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
