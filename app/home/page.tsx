"use client"

import { useState } from "react"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Calendar,
    Globe,
    Heart,
    MessageCircle,
    Share2,
    TrendingUp,
    Users,
    Plus
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const router = useRouter()
    const [internationalDay] = useState({
        title: "International Day of Peace",
        date: "September 21, 2024",
        description: "Join millions worldwide in promoting peace and non-violence",
    })

    const recentActs = [
        {
            id: 1,
            user: { name: "Sarah Johnson", avatar: "/placeholder-user.jpg", location: "Ghana" },
            title: "Community Garden Project",
            description: "Started a community garden to provide fresh vegetables for 50 families in our neighborhood.",
            tags: ["SDG 2: Zero Hunger", "SDG 11: Sustainable Cities", "Africa Agenda 2063: Aspiration 1"],
            likes: 24,
            comments: 8,
            shares: 3,
            timeAgo: "2 hours ago",
            privacy: "public",
            image: "/acts/2.jpg",
        },
        {
            id: 2,
            user: { name: "Michael Chen", avatar: "/placeholder-user.jpg", location: "USA" },
            title: "Tech Skills Workshop",
            description: "Organized a free coding workshop for 30 underprivileged youth in my community.",
            tags: ["SDG 4: Quality Education", "SDG 8: Decent Work", "UNESCO AI Ethics"],
            likes: 45,
            comments: 12,
            shares: 7,
            timeAgo: "5 hours ago",
            privacy: "public",
            image: "/acts/1.jpg",
        },
        {
            id: 3,
            user: { name: "Amara Okafor", avatar: "/placeholder-user.jpg", location: "Nigeria" },
            title: "Clean Water Initiative",
            description: "Installed water purification systems in 3 rural villages, providing clean water to 500+ people.",
            tags: ["SDG 6: Clean Water", "SDG 3: Good Health", "Community Development"],
            likes: 67,
            comments: 15,
            shares: 12,
            timeAgo: "1 day ago",
            privacy: "public",
            image: "/acts/3.jpg",
        },
    ]

    const stats = {
        totalActs: 1247,
        activeUsers: 8934,
    }

    const upcomingEvents = [
        { title: "World Food Day", date: "October 16, 2024" },
        { title: "International Day for Poverty Eradication", date: "October 17, 2024" },
        { title: "World Development Information Day", date: "October 24, 2024" },
    ]

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <Navigation />

                <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
                    {/* Highlight Day */}
                    <Card className="mb-6 lg:mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-start space-x-3">
                                    <Globe className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <CardTitle className="text-blue-800 text-lg sm:text-xl">{internationalDay.title}</CardTitle>
                                        <CardDescription className="text-blue-700 text-sm sm:text-base">
                                            {internationalDay.date}
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Share Your Peace Act
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-blue-800 text-sm sm:text-base">{internationalDay.description}</p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                        {/* Feed */}
                        <div className="xl:col-span-2 space-y-6">
                            <Tabs defaultValue="feed" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 h-auto">
                                    <TabsTrigger value="feed" className="text-xs sm:text-sm">Recent Acts</TabsTrigger>
                                    <TabsTrigger value="trending" className="text-xs sm:text-sm">Trending</TabsTrigger>
                                    <TabsTrigger value="following" className="text-xs sm:text-sm">Following</TabsTrigger>
                                </TabsList>

                                <TabsContent value="feed" className="space-y-4 sm:space-y-6 mt-4">
                                    {recentActs.map((act) => (
                                        <Card key={act.id} className="w-full">
                                            <CardHeader className="pb-4 cursor-pointer" onClick={() => router.push(`/${act.user.name}/act/${act.id}`)}>
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={act.user.avatar || "/placeholder.svg"} alt={act.user.name} />
                                                            <AvatarFallback>{act.user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-semibold text-sm sm:text-base truncate">{act.user.name}</p>
                                                            <p className="text-xs sm:text-sm text-muted-foreground">{act.user.location} • {act.timeAgo}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant={act.privacy === "public" ? "default" : "secondary"}>{act.privacy}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                               
                                                <div>
                                                    <h3 className="font-semibold text-base sm:text-lg mb-2 leading-tight">{act.title}</h3>
                                                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                                        {act.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {act.tags.map((tag, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                                                    ))}
                                                </div>

                                                {act.image && (
                                                    <div
                                                        onClick={() => setSelectedImage(act.image)}
                                                        className="cursor-pointer overflow-hidden rounded-md border border-muted"
                                                    >
                                                        <img
                                                            src={act.image}
                                                            alt={act.title}
                                                            className="w-full h-96 object-cover transition-transform duration-200 hover:scale-105"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                                                    <div className="flex items-center space-x-4">
                                                        <Button variant="ghost" size="sm" className="p-2">
                                                            <Heart className="h-4 w-4" />
                                                            <span className="text-xs sm:text-sm">{act.likes}</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="p-2">
                                                            <MessageCircle className="h-4 w-4" />
                                                            <span className="text-xs sm:text-sm">{act.comments}</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="p-2">
                                                            <Share2 className="h-4 w-4" />
                                                            <span className="text-xs sm:text-sm">{act.shares}</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                              

                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>

                                <TabsContent value="trending" className="mt-4">
                                    <Card>
                                        <CardContent className="pt-6 text-center py-8">
                                            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                            <p className="text-muted-foreground">Trending acts will appear here</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="following" className="mt-4">
                                    <Card>
                                        <CardContent className="pt-6 text-center py-8">
                                            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                            <p className="text-muted-foreground">Acts from people you follow will appear here</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Platform Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-lg">
                                        <TrendingUp className="h-5 w-5" />
                                        <span>Platform Impact</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                                        <div className="text-2xl font-bold text-primary">{stats.totalActs.toLocaleString()}</div>
                                        <div className="text-xs text-muted-foreground">Total Acts</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                                        <div className="text-2xl font-bold text-primary">{stats.activeUsers.toLocaleString()}</div>
                                        <div className="text-xs text-muted-foreground">Active Users</div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Upcoming Events */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-lg">
                                        <Calendar className="h-5 w-5" />
                                        <span>Upcoming Events</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {upcomingEvents.map((event, index) => (
                                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                                            <p className="font-medium text-sm">{event.title}</p>
                                            <p className="text-xs text-muted-foreground">{event.date}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Lightbox for image preview */}
                {selectedImage && (
                    <Lightbox
                        mainSrc={selectedImage}
                        onCloseRequest={() => setSelectedImage(null)}
                    />
                )}
            </div>
        </ProtectedRoute>
    )
}
