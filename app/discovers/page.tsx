"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Heart, MessageCircle, Share2, Users, Building2 } from "lucide-react"
import Link from "next/link"

export default function Discover() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [selectedSDG, setSelectedSDG] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")

    const discoverItems = [
        {
            id: 1,
            type: "act",
            user: { name: "Amara Okafor", avatar: "/placeholder-user.jpg", location: "Lagos, Nigeria" },
            title: "Solar Panel Installation for Rural School",
            description: "Installed solar panels providing electricity to 200 students in a remote village school.",
            tags: ["SDG 7: Clean Energy", "SDG 4: Quality Education", "Africa Agenda 2063: Aspiration 1"],
            likes: 89,
            comments: 23,
            shares: 15,
            timeAgo: "1 day ago",

        },
        {
            id: 2,
            type: "user",
            name: "Dr. James Mitchell",
            bio: "Healthcare advocate working on maternal health in East Africa",
            location: "Nairobi, Kenya",
            actsCount: 47,
            followers: 1234,
            tags: ["SDG 3: Good Health", "Maternal Health", "Community Medicine"],
        },
        
    ]

    const filteredItems = discoverItems.filter((item) => {
        if (selectedFilter !== "all" && item.type !== selectedFilter) return false
        if (
            searchQuery &&
            !item.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
            return false
        return true
    })

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 lg:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Discover</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Find inspiring acts, connect with like-minded people, and join organizations making a difference
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <Card className="mb-6 lg:mb-8">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search acts, users, organizations, or groups..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Filter Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                                        <SelectTrigger>
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Filter by type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            <SelectItem value="act">Acts</SelectItem>
                                            <SelectItem value="user">Users</SelectItem>
                                            <SelectItem value="organization">Organizations</SelectItem>
                                            <SelectItem value="group">Groups</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select value={selectedSDG} onValueChange={setSelectedSDG}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by SDG" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all_sdgs">All SDGs</SelectItem>
                                            <SelectItem value="sdg1">SDG 1: No Poverty</SelectItem>
                                            <SelectItem value="sdg2">SDG 2: Zero Hunger</SelectItem>
                                            <SelectItem value="sdg3">SDG 3: Good Health</SelectItem>
                                            <SelectItem value="sdg4">SDG 4: Quality Education</SelectItem>
                                            <SelectItem value="sdg7">SDG 7: Clean Energy</SelectItem>
                                            <SelectItem value="sdg13">SDG 13: Climate Action</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all_locations">All Locations</SelectItem>
                                            <SelectItem value="ghana">Ghana</SelectItem>
                                            <SelectItem value="nigeria">Nigeria</SelectItem>
                                            <SelectItem value="kenya">Kenya</SelectItem>
                                            <SelectItem value="south-africa">South Africa</SelectItem>
                                            <SelectItem value="usa">United States</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button variant="outline" className="w-full">
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 h-auto mb-6">
                            <TabsTrigger value="all" className="text-xs sm:text-sm">
                                All ({filteredItems.length})
                            </TabsTrigger>
                            <TabsTrigger value="acts" className="text-xs sm:text-sm">
                                Acts
                            </TabsTrigger>
                            <TabsTrigger value="users" className="text-xs sm:text-sm">
                                Users
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                {filteredItems.map((item) => (
                                    <Card key={item.id} className="w-full">
                                        {item.type === "act" && (
                                            <Link href={`/${item.user?.name}/act/${item.id}`} className="block">
                                                <CardHeader className="pb-4">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                                                            <Avatar className="h-10 w-10 flex-shrink-0">
                                                                <AvatarImage src={item.user?.avatar || "/placeholder.svg"} alt={item.user?.name} />
                                                                <AvatarFallback>
                                                                    {item.user?.name?.split(" ").map((n) => n[0]).join("")}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="font-semibold text-sm sm:text-base truncate">{item.user?.name}</p>
                                                                <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                                                                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                                                    <span className="truncate">
                                                                        {item.user?.location} • {item.timeAgo}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge className="flex-shrink-0">Act</Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <h3 className="font-semibold text-base sm:text-lg mb-2 leading-tight">{item.title}</h3>
                                                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        {item.tags?.map((tag, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                                                        <div className="flex items-center space-x-4">
                                                            <Button variant="ghost" size="sm" className="flex items-center space-x-1 p-2">
                                                                <Heart className="h-4 w-4" />
                                                                <span className="text-xs sm:text-sm">{item.likes}</span>
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="flex items-center space-x-1 p-2">
                                                                <MessageCircle className="h-4 w-4" />
                                                                <span className="text-xs sm:text-sm">{item.comments}</span>
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="flex items-center space-x-1 p-2">
                                                                <Share2 className="h-4 w-4" />
                                                                <span className="text-xs sm:text-sm">{item.shares}</span>
                                                            </Button>
                                                        </div>
                                                        
                                                    </div>
                                                </CardContent>
                                            </Link>
                                   )}
                                        {item.type === "user" && (
                                            <CardContent className="pt-6">
                                                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                                                    <Avatar className="h-16 w-16 mx-auto sm:mx-0 flex-shrink-0">
                                                        <AvatarImage src="/placeholder-user.jpg" alt={item.name} />
                                                        <AvatarFallback>
                                                            {item.name
                                                                ?.split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                                            <Badge variant="secondary" className="mt-2 sm:mt-0">
                                                                User
                                                            </Badge>
                                                        </div>
                                                        <p className="text-muted-foreground mb-2 text-sm sm:text-base">{item.bio}</p>
                                                        <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start mb-3">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {item.location}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                                                            {item.tags?.map((tag, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                            <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-muted-foreground">
                                                                <span>{item.actsCount} acts</span>
                                                                <span>{item.followers} followers</span>
                                                            </div>
                                                            <Button size="sm" className="w-full sm:w-auto">
                                                                Follow
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        )}
                                        
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
