"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
    SDG_GOALS,
    AFRICA_AGENDA_2063,
    OTHER_INTERNATIONAL_TARGETS,
    PRIVACY_OPTIONS,
    ACT_CATEGORIES,
} from "@/lib/constants"
import { Upload, MapPin, Calendar, Users, Sparkles, Plus, BookOpen, ImageIcon } from "lucide-react"

export default function PostAct() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        date: "",
        privacy: "public",
        participants: "",
        impact: "",
        challenges: "",
        resources: "",
        includeInBiography: false,
        customBiographyDescription: "",
        biographyOrder: 1,
    })

    const [selectedSDGs, setSelectedSDGs] = useState<number[]>([])
    const [selectedAgenda2063, setSelectedAgenda2063] = useState<number[]>([])
    const [selectedOtherTargets, setSelectedOtherTargets] = useState<number[]>([])
    const [aiSuggestions, setAiSuggestions] = useState({
        sdgs: [1, 2, 11],
        agenda2063: [1, 6],
        others: [1, 3],
    })
    const [showAiSuggestions, setShowAiSuggestions] = useState(false)

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Simulate AI analysis when description changes
        if (field === "description" && typeof value === "string" && value.length > 50) {
            setShowAiSuggestions(true)
        }
    }

    const toggleSDG = (id: number) => {
        setSelectedSDGs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    }

    const toggleAgenda2063 = (id: number) => {
        setSelectedAgenda2063((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    }

    const toggleOtherTarget = (id: number) => {
        setSelectedOtherTargets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    }

    const acceptAiSuggestion = (type: "sdgs" | "agenda2063" | "others", id: number) => {
        if (type === "sdgs") {
            toggleSDG(id)
        } else if (type === "agenda2063") {
            toggleAgenda2063(id)
        } else {
            toggleOtherTarget(id)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl sm:text-2xl">Share Your Act</CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Document your positive impact and connect it with global goals
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Act Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Give your act a compelling title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ACT_CATEGORIES.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your act in detail. What did you do? What was the impact? What challenges did you face?"
                                    className="min-h-[120px] resize-none"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">{formData.description.length}/1000 characters</p>
                            </div>

                            {/* AI Suggestions */}
                            {showAiSuggestions && (
                                <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                                            <Sparkles className="h-5 w-5 text-blue-600" />
                                            <span>AI Suggestions</span>
                                        </CardTitle>
                                        <CardDescription className="text-sm sm:text-base">
                                            Based on your description, we suggest these relevant goals:
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2 text-sm sm:text-base">Suggested SDGs:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {aiSuggestions.sdgs.map((id) => {
                                                    const sdg = SDG_GOALS.find((s) => s.id === id)
                                                    return (
                                                        <Button
                                                            key={id}
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => acceptAiSuggestion("sdgs", id)}
                                                            className="text-xs h-auto py-2 px-3"
                                                        >
                                                            <Plus className="h-3 w-3 mr-1" />
                                                            <span className="hidden sm:inline">SDG {sdg?.id}: </span>
                                                            <span className="sm:hidden">SDG {sdg?.id}</span>
                                                            <span className="hidden md:inline">{sdg?.title}</span>
                                                        </Button>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium mb-2 text-sm sm:text-base">Suggested Africa's Agenda 2063:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {aiSuggestions.agenda2063.map((id) => {
                                                    const aspiration = AFRICA_AGENDA_2063.find((a) => a.id === id)
                                                    return (
                                                        <Button
                                                            key={id}
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => acceptAiSuggestion("agenda2063", id)}
                                                            className="text-xs h-auto py-2 px-3"
                                                        >
                                                            <Plus className="h-3 w-3 mr-1" />
                                                            Aspiration {aspiration?.id}
                                                        </Button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Goal Selection Tabs */}
                            <Tabs defaultValue="sdgs" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 h-auto">
                                    <TabsTrigger value="sdgs" className="text-xs sm:text-sm">
                                        SDGs ({selectedSDGs.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="agenda2063" className="text-xs sm:text-sm">
                                        <span className="hidden sm:inline">Africa 2063</span>
                                        <span className="sm:hidden">A2063</span> ({selectedAgenda2063.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="others" className="text-xs sm:text-sm">
                                        <span className="hidden sm:inline">Other Targets</span>
                                        <span className="sm:hidden">Others</span> ({selectedOtherTargets.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="sdgs" className="space-y-4 mt-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {SDG_GOALS.map((sdg) => (
                                            <div
                                                key={sdg.id}
                                                className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedSDGs.includes(sdg.id)
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                                onClick={() => toggleSDG(sdg.id)}
                                            >
                                                <div className="flex items-start space-x-2">
                                                    <Checkbox checked={selectedSDGs.includes(sdg.id)} onChange={() => toggleSDG(sdg.id)} />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-medium text-sm">SDG {sdg.id}</p>
                                                        <p className="text-xs text-muted-foreground leading-tight">{sdg.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="agenda2063" className="space-y-4 mt-4">
                                    <div className="space-y-3">
                                        {AFRICA_AGENDA_2063.map((aspiration) => (
                                            <div
                                                key={aspiration.id}
                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedAgenda2063.includes(aspiration.id)
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                                onClick={() => toggleAgenda2063(aspiration.id)}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <Checkbox
                                                        checked={selectedAgenda2063.includes(aspiration.id)}
                                                        onChange={() => toggleAgenda2063(aspiration.id)}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-medium text-sm sm:text-base">Aspiration {aspiration.id}</p>
                                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                            {aspiration.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="others" className="space-y-4 mt-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {OTHER_INTERNATIONAL_TARGETS.map((target) => (
                                            <div
                                                key={target.id}
                                                className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedOtherTargets.includes(target.id)
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                                onClick={() => toggleOtherTarget(target.id)}
                                            >
                                                <div className="flex items-start space-x-2">
                                                    <Checkbox
                                                        checked={selectedOtherTargets.includes(target.id)}
                                                        onChange={() => toggleOtherTarget(target.id)}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <Badge variant="secondary" className="text-xs mb-1">
                                                            {target.category}
                                                        </Badge>
                                                        <p className="text-sm font-medium leading-tight">{target.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Additional Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            placeholder="City, Country"
                                            className="pl-10"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange("location", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Date of Act</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="date"
                                            type="date"
                                            className="pl-10"
                                            value={formData.date}
                                            onChange={(e) => handleInputChange("date", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="participants">Number of People Involved</Label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="participants"
                                        placeholder="e.g., 25 volunteers, 100 beneficiaries"
                                        className="pl-10"
                                        value={formData.participants}
                                        onChange={(e) => handleInputChange("participants", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Impact and Challenges */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="impact">Impact Achieved</Label>
                                    <Textarea
                                        id="impact"
                                        placeholder="Describe the positive impact and outcomes of your act..."
                                        value={formData.impact}
                                        onChange={(e) => handleInputChange("impact", e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="challenges">Challenges Faced</Label>
                                    <Textarea
                                        id="challenges"
                                        placeholder="What challenges did you encounter and how did you overcome them?"
                                        value={formData.challenges}
                                        onChange={(e) => handleInputChange("challenges", e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {/* Biography Settings */}
                            <Card className="bg-green-50 border-green-200">
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                                        <BookOpen className="h-5 w-5 text-green-600" />
                                        <span>Biography Settings</span>
                                    </CardTitle>
                                    <CardDescription>Control how this act appears in your public biography</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="include-biography">Include in Biography</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Add this act to your chronological biography story
                                            </p>
                                        </div>
                                        <Switch
                                            id="include-biography"
                                            checked={formData.includeInBiography}
                                            onCheckedChange={(checked) => handleInputChange("includeInBiography", checked)}
                                        />
                                    </div>

                                    {formData.includeInBiography && (
                                        <div className="space-y-4 pt-4 border-t border-green-200">
                                            <div className="space-y-2">
                                                <Label htmlFor="bio-description">Custom Biography Description</Label>
                                                <Textarea
                                                    id="bio-description"
                                                    placeholder="How should this act be described in your biography? (Leave blank to use the main description)"
                                                    value={formData.customBiographyDescription}
                                                    onChange={(e) => handleInputChange("customBiographyDescription", e.target.value)}
                                                    rows={3}
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    This custom description will be used in your biography instead of the main description
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bio-order">Biography Order</Label>
                                                <Input
                                                    id="bio-order"
                                                    type="number"
                                                    min="1"
                                                    placeholder="1"
                                                    value={formData.biographyOrder}
                                                    onChange={(e) => handleInputChange("biographyOrder", Number.parseInt(e.target.value) || 1)}
                                                    className="w-32"
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    Lower numbers appear first in your biography (1 = first)
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Privacy Settings */}
                            <div className="space-y-3">
                                <Label>Who can see this act?</Label>
                                <RadioGroup value={formData.privacy} onValueChange={(value) => handleInputChange("privacy", value)}>
                                    {PRIVACY_OPTIONS.map((option) => (
                                        <div key={option.value} className="flex items-start space-x-2">
                                            <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                                            <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">{option.label}</p>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">{option.description}</p>
                                                </div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            {/* Media Upload */}
                            <div className="space-y-2">
                                <Label>Add Photos or Videos</Label>
                                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 sm:p-8 text-center">
                                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                        <Button variant="outline" size="sm">
                                            <ImageIcon className="h-4 w-4 mr-2" />
                                            Choose Files
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href="/upload-artwork">
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload to Gallery
                                            </a>
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Supported formats: JPG, PNG, MP4, MOV (Max 10MB)</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Save as Draft
                                </Button>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Preview
                                    </Button>
                                    <Button className="w-full sm:w-auto">Share Act</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
