"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useParams } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"

// Mock data for demo (in real apps this would come from an API or server)
const acts = [
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
]


export default function ActDetail() {
    const params = useParams()

    const username = params?.username
    const actId = params?.id


    const act = acts.find((a) => a.id === Number(actId))
    const [commentText, setCommentText] = useState("")
    const [comments, setComments] = useState([
        {
            id: 1,
            name: "John Doe",
            avatar: "/placeholder-user.jpg",
            timeAgo: "1h ago",
            message: "This is an amazing initiative! 👏",
        },
        {
            id: 2,
            name: "Lina Amara",
            avatar: "/placeholder-user.jpg",
            timeAgo: "30m ago",
            message: "So proud of this work, especially the sustainable angle!",
        },
    ])

    if (!act) return notFound()

    const handleCommentSubmit = () => {
        if (!commentText.trim()) return
        setComments([
            ...comments,
            {
                id: comments.length + 1,
                name: "You",
                avatar: "/placeholder-user.jpg",
                timeAgo: "Just now",
                message: commentText.trim(),
            },
        ])
        setCommentText("")
    }

    return (
        <ProtectedRoute>
             <Navigation />
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={act.user.avatar} />
                        <AvatarFallback>{act.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="text-base font-semibold">{act.user.name}</h3>
                        <p className="text-sm text-muted-foreground">{act.user.location} • {act.timeAgo}</p>
                    </div>
                    <Badge>{act.privacy}</Badge>
                </div>



                {/* Content */}
                <h1 className="text-xl font-bold mb-2">{act.title}</h1>
                <p className="text-muted-foreground text-sm mb-4">{act.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {act.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Image */}
                {act.image && (
                    <div className="mb-4 rounded-md overflow-hidden border">
                        <img src={act.image} alt={act.title} className="w-full  h-96 object-cover" />
                    </div>
                )}

                {/* Interactions */}
                <div className="flex items-center space-x-4 border-t pt-4 mb-8">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{act.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{comments.length}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">{act.shares}</span>
                    </Button>
                </div>

                {/* Comment Form */}
                <div className="mb-6">
                    <Textarea
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="min-h-[80px]"
                    />
                    <div className="flex justify-end mt-2">
                        <Button size="sm" onClick={handleCommentSubmit}>
                            Post Comment
                        </Button>
                    </div>
                </div>

                {/* Comment List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>
                                    {comment.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-sm">{comment.name}</div>
                                <div className="text-muted-foreground text-xs mb-1">{comment.timeAgo}</div>
                                <p className="text-sm">{comment.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    )
}
