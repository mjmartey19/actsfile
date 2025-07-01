"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
    ArrowLeft, CalendarIcon, MapPin, ImageIcon, Video, Mic, Sparkles, Check, X, Plus, Users, BookOpen, Upload
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import {
    SDG_GOALS,
    AFRICA_AGENDA_2063,
    OTHER_INTERNATIONAL_TARGETS,
    PRIVACY_OPTIONS,
    ACT_CATEGORIES,
} from "@/lib/constants"
import { Navigation } from "@/components/navigation"

export default function PostActPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        date: new Date(),
        participants: "",
        impact: "",
        challenges: "",
        resources: "",
        includeInBiography: false,
        customBiographyDescription: "",
        biographyOrder: 1,
        privacy: "public",
    })

    const [selectedSDGs, setSelectedSDGs] = useState<number[]>([])
    const [selectedAgenda2063, setSelectedAgenda2063] = useState<number[]>([])
    const [selectedOtherTargets, setSelectedOtherTargets] = useState<number[]>([])

    const [suggestedSDGs, setSuggestedSDGs] = useState([
        { id: 3, name: "Good Health and Well-being", confidence: 0.92, confirmed: false },
        { id: 11, name: "Sustainable Cities and Communities", confidence: 0.78, confirmed: false },
        { id: 17, name: "Partnerships for the Goals", confidence: 0.65, confirmed: false },
    ])

    const [suggestedAgenda2063, setSuggestedAgenda2063] = useState([
        { id: 1, name: "A prosperous Africa based on inclusive growth and sustainable development", confidence: 0.85, confirmed: false },
    ])

    const [suggestedOtherTargets, setSuggestedOtherTargets] = useState([])

    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [showAiSuggestions, setShowAiSuggestions] = useState(false)

    const handleInputChange = (field: string, value: string | number | boolean | Date) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
      }

    const analyzeContent = async () => {
        if (!formData.title && !formData.description) return

        setIsAnalyzing(true)
        // Simulate AI analysis
        setTimeout(() => {
            setIsAnalyzing(false)
            setShowAiSuggestions(true)
            // Update suggested SDGs based on content
        }, 2000)
    }

    const confirmSDG = (sdgId: number) => {
        setSuggestedSDGs((prev) => prev.map((sdg) => (sdg.id === sdgId ? { ...sdg, confirmed: true } : sdg)))
        if (!selectedSDGs.includes(sdgId)) {
            setSelectedSDGs((prev) => [...prev, sdgId])
        }
    }

    const removeSDG = (sdgId: number) => {
        setSuggestedSDGs((prev) => prev.filter((sdg) => sdg.id !== sdgId))
    }

    const confirmAgenda2063 = (id: number) => {
        setSuggestedAgenda2063((prev) => prev.map((item) => (item.id === id ? { ...item, confirmed: true } : item)))
        if (!selectedAgenda2063.includes(id)) {
            setSelectedAgenda2063((prev) => [...prev, id])
        }
    }

    const removeAgenda2063 = (id: number) => {
        setSuggestedAgenda2063((prev) => prev.filter((item) => item.id !== id))
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting act:", {
            ...formData,
            sdgs: selectedSDGs,
            agenda2063: selectedAgenda2063,
            otherTargets: selectedOtherTargets
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Navigation />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Share Your Positive Act</CardTitle>
                                <CardDescription>
                                    Document your contribution to society and let our AI suggest relevant goals
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title and Category */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title *</Label>
                                            <Input
                                                id="title"
                                                placeholder="Give your act a descriptive title"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange("title", e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) => handleInputChange("category", value)}
                                            >
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

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe your act in detail. What did you do? Who did it help? What was the impact?"
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => handleInputChange("description", e.target.value)}
                                            required
                                        />
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">Be specific about the impact and beneficiaries</p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={analyzeContent}
                                                disabled={isAnalyzing || (!formData.title && !formData.description)}
                                            >
                                                <Sparkles className="h-4 w-4 mr-2" />
                                                {isAnalyzing ? "Analyzing..." : "Analyze Goals"}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Date and Location */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Date */}
                                        <div className="space-y-2">
                                            <Label>When did this act occur?</Label>
                                            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start">
                                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                                        {format(formData.date, "PPP")}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.date}
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                handleInputChange("date", date)
                                                              }
                                                            setShowCalendar(false)
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* Location */}
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location (Optional)</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="location"
                                                    placeholder="Where did this act take place?"
                                                    className="pl-10"
                                                    value={formData.location}
                                                    onChange={(e) => handleInputChange("location", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Participants */}
                                    <div className="space-y-2">
                                        <Label htmlFor="participants">Number of People Involved</Label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    {/* Media Upload */}
                                    <div className="space-y-2">
                                        <Label>Media (Optional)</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <div className="flex justify-center space-x-4 mb-4">
                                                <Button type="button" variant="outline" size="sm">
                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                    Choose Files
                                                </Button>
                                              
                                            </div>
                                            <p className="text-sm text-gray-500">Upload photos, videos, or audio to support your act</p>
                                        </div>
                                    </div>

                                    {/* Biography Settings */}
                                    <Card className="bg-green-50 border-green-200">
                                        <CardHeader className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <BookOpen className="h-5 w-5 text-green-600" />
                                                    <Label htmlFor="include-biography">Include in Biography</Label>
                                                </div>
                                                <Switch
                                                    id="include-biography"
                                                    checked={formData.includeInBiography}
                                                    onCheckedChange={(checked) => handleInputChange("includeInBiography", checked)}
                                                />
                                            </div>
                                        </CardHeader>
                                        {formData.includeInBiography && (
                                            <CardContent className="space-y-4 pt-0">
                                                <div className="space-y-2">
                                                    <Label htmlFor="bio-description">Custom Biography Description</Label>
                                                    <Textarea
                                                        id="bio-description"
                                                        placeholder="How should this act be described in your biography? (Leave blank to use the main description)"
                                                        value={formData.customBiographyDescription}
                                                        onChange={(e) => handleInputChange("customBiographyDescription", e.target.value)}
                                                        rows={3}
                                                    />
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
                                                    <p className="text-xs text-gray-500">
                                                        Lower numbers appear first in your biography (1 = first)
                                                    </p>
                                                </div>
                                            </CardContent>
                                        )}
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
                                                            <p className="font-medium text-sm">{option.label}</p>
                                                            <p className="text-xs text-gray-600">{option.description}</p>
                                                        </div>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    <div className="flex justify-between pt-4 border-t">
                                        <Button type="button" variant="outline">
                                            Save as Draft
                                        </Button>
                                        <div className="flex space-x-3">
                                            <Button type="button" variant="outline">
                                                Preview
                                            </Button>
                                            <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                                Post Act
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Goal Mapping Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                                    Goal Mapping
                                </CardTitle>
                                <CardDescription>AI-suggested Sustainable Development Goals</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isAnalyzing && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Analyzing content...</span>
                                            <span>75%</span>
                                        </div>
                                        <Progress value={75} className="h-2" />
                                    </div>
                                )}

                                {/* Suggested Goals */}
                                {showAiSuggestions && (
                                    <div className="space-y-4">
                                        {/* Suggested SDGs */}
                                        {suggestedSDGs.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Suggested SDGs</h4>
                                                {suggestedSDGs.map((sdg) => (
                                                    <div key={sdg.id} className="border rounded-lg p-3 space-y-2">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <p className="font-medium text-sm">SDG {sdg.id}</p>
                                                                <p className="text-xs text-gray-600">{sdg.name}</p>
                                                            </div>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {Math.round(sdg.confidence * 100)}%
                                                            </Badge>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant={sdg.confirmed ? "default" : "outline"}
                                                                onClick={() => confirmSDG(sdg.id)}
                                                                className="flex-1"
                                                            >
                                                                <Check className="h-3 w-3 mr-1" />
                                                                {sdg.confirmed ? "Confirmed" : "Confirm"}
                                                            </Button>
                                                            <Button type="button" size="sm" variant="outline" onClick={() => removeSDG(sdg.id)}>
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Suggested Agenda 2063 */}
                                        {suggestedAgenda2063.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Suggested Africa's Agenda 2063</h4>
                                                {suggestedAgenda2063.map((item) => (
                                                    <div key={item.id} className="border rounded-lg p-3 space-y-2">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <p className="font-medium text-sm">Aspiration {item.id}</p>
                                                                <p className="text-xs text-gray-600">{item.name}</p>
                                                            </div>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {Math.round(item.confidence * 100)}%
                                                            </Badge>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant={item.confirmed ? "default" : "outline"}
                                                                onClick={() => confirmAgenda2063(item.id)}
                                                                className="flex-1"
                                                            >
                                                                <Check className="h-3 w-3 mr-1" />
                                                                {item.confirmed ? "Confirmed" : "Confirm"}
                                                            </Button>
                                                            <Button type="button" size="sm" variant="outline" onClick={() => removeAgenda2063(item.id)}>
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Goal Selection Tabs */}
                                <Tabs defaultValue="sdgs">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="sdgs" className="text-xs">
                                            SDGs ({selectedSDGs.length})
                                        </TabsTrigger>
                                        <TabsTrigger value="agenda2063" className="text-xs">
                                            A2063 ({selectedAgenda2063.length})
                                        </TabsTrigger>
                                        <TabsTrigger value="others" className="text-xs">
                                            Others ({selectedOtherTargets.length})
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="sdgs" className="mt-4 space-y-2">
                                        {SDG_GOALS.map((sdg) => (
                                            <div
                                                key={sdg.id}
                                                className={`p-2 border rounded text-sm cursor-pointer ${selectedSDGs.includes(sdg.id)
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                                onClick={() => toggleSDG(sdg.id)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox checked={selectedSDGs.includes(sdg.id)} />
                                                    <span>SDG {sdg.id}: {sdg.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="agenda2063" className="mt-4 space-y-2">
                                        {AFRICA_AGENDA_2063.map((aspiration) => (
                                            <div
                                                key={aspiration.id}
                                                className={`p-2 border rounded text-sm cursor-pointer ${selectedAgenda2063.includes(aspiration.id)
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                                onClick={() => toggleAgenda2063(aspiration.id)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox checked={selectedAgenda2063.includes(aspiration.id)} />
                                                    <span>Aspiration {aspiration.id}: {aspiration.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="others" className="mt-4 space-y-2">
                                        {OTHER_INTERNATIONAL_TARGETS.map((target) => (
                                            <div
                                                key={target.id}
                                                className={`p-2 border rounded text-sm cursor-pointer ${selectedOtherTargets.includes(target.id)
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                                onClick={() => toggleOtherTarget(target.id)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox checked={selectedOtherTargets.includes(target.id)} />
                                                    <span>{target.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}