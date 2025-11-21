"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Input } from "@/app/components/ui/Input";
import { MapPin, MessageCircle, Heart, Plus, Search } from "lucide-react";

const MOCK_POSTS = [
    {
        id: 1,
        user: "Sarah M.",
        distance: "0.5 miles",
        item: "Sourdough Starter",
        description: "I have too much active starter! Happy to share with anyone who wants to bake.",
        tags: ["Baking", "Free"],
        likes: 12,
        comments: 3,
        image: "bg-amber-100",
    },
    {
        id: 2,
        user: "Mike T.",
        distance: "1.2 miles",
        item: "Fresh Basil",
        description: "My garden is exploding with basil. Come grab a bunch!",
        tags: ["Herbs", "Garden"],
        likes: 8,
        comments: 1,
        image: "bg-emerald-100",
    },
    {
        id: 3,
        user: "Jessica L.",
        distance: "2.0 miles",
        item: "Canned Chickpeas",
        description: "Bought a bulk pack and won't use them all. 3 cans available.",
        tags: ["Pantry", "Canned"],
        likes: 4,
        comments: 0,
        image: "bg-orange-100",
    },
];

export default function CommunityPage() {
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [isPosting, setIsPosting] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Community Leftovers</h1>
                    <p className="text-muted-foreground">Share surplus food with neighbors and reduce waste.</p>
                </div>
                <Button className="gap-2" onClick={() => setIsPosting(!isPosting)}>
                    <Plus className="w-4 h-4" />
                    Post Item
                </Button>
            </div>

            {isPosting && (
                <Card className="glass-panel border-primary/20 animate-slide-up">
                    <CardHeader>
                        <CardTitle>Share an Item</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input placeholder="What are you sharing? (e.g., Extra Lemons)" />
                        <Input placeholder="Description (e.g., From my tree, picked today)" />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsPosting(false)}>Cancel</Button>
                            <Button onClick={() => setIsPosting(false)}>Post</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Card key={post.id} className="hover:border-primary/50 transition-all hover:shadow-lg">
                        <div className={`h-48 w-full ${post.image} rounded-t-xl opacity-80`} />
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{post.item}</h3>
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {post.distance} • {post.user}
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                    Available
                                </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground">{post.description}</p>

                            <div className="flex gap-2 flex-wrap">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-[10px]">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive gap-1">
                                    <Heart className="w-4 h-4" />
                                    {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    {post.comments}
                                </Button>
                                <Button size="sm" variant="secondary">Request</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
