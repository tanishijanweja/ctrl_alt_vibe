"use client";

import { useUser } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Leaf, DollarSign } from "lucide-react";

export default function DashboardPage() {
    const { preferences } = useUser();

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between pt-2">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        Hello, {preferences.name || "Chef"}!
                    </h1>
                    <p className="text-lg text-muted-foreground">Here's what's happening in your kitchen today.</p>
                </div>
                <Link href="/planner">
                    <Button size="lg" className="h-14 px-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-300 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 text-base font-semibold tracking-wide">
                        Generate Meal Plan
                        <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 p-2">
                    <CardHeader className="pb-2 pt-6 px-8">
                        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-muted-foreground/80">
                            <div className="p-2 bg-emerald-50 rounded-xl">
                                <Leaf className="w-4 h-4 text-emerald-500" />
                            </div>
                            Waste Saved
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="text-5xl font-bold text-foreground mb-3 tracking-tight">
                            2.4 <span className="text-2xl text-muted-foreground font-medium">kg</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+12%</span>
                            <span className="text-muted-foreground/80">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 p-2">
                    <CardHeader className="pb-2 pt-6 px-8">
                        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-muted-foreground/80">
                            <div className="p-2 bg-amber-50 rounded-xl">
                                <DollarSign className="w-4 h-4 text-amber-500" />
                            </div>
                            Money Saved
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="text-5xl font-bold text-foreground mb-3 tracking-tight">
                            $145
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full">On track</span>
                            <span className="text-muted-foreground/80">to save $200</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 p-2">
                    <CardHeader className="pb-2 pt-6 px-8">
                        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-muted-foreground/80">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                            </div>
                            Health Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="text-5xl font-bold text-foreground mb-3 tracking-tight">
                            92
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Excellent</span>
                            <span className="text-muted-foreground/80">Top 5% of users</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Activity - Spans 2 columns */}
                <Card className="lg:col-span-2 border-none rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-2">
                    <CardHeader className="pt-6 px-8">
                        <CardTitle className="text-xl font-bold text-foreground/80">Weekly Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="h-72 flex items-end justify-between gap-4 pt-8">
                            {/* Placeholder for cleaner line chart visualization using CSS shapes */}
                            <div className="w-full h-full relative flex items-end justify-between px-4">
                                {/* Background Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-full h-px bg-border border-dashed" />
                                    ))}
                                </div>

                                {/* Bars (kept as bars but cleaner, per "clean line chart placeholder" request I will make them very thin rounded bars to mimic a clean look, or actual SVG line if I could, but sticking to CSS bars is safer for now unless I use a library. User asked for "clean line chart placeholder". I'll simulate a line chart with SVG points and lines if possible, or just very clean bars. Let's stick to the previous implementation but refined as requested "clean line chart placeholder" - I will use a simple SVG polyline for a true line chart look). */}
                                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F9B74D" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#F9B74D" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,180 L50,200 L150,100 L250,150 L350,50 L450,30 L550,120 L650,180"
                                        fill="none"
                                        stroke="#F9B74D"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="drop-shadow-lg"
                                        style={{ vectorEffect: "non-scaling-stroke" }}
                                    />
                                    <path
                                        d="M0,180 L50,200 L150,100 L250,150 L350,50 L450,30 L550,120 L650,180 V300 H0 Z"
                                        fill="url(#lineGradient)"
                                        className="opacity-20"
                                        style={{ vectorEffect: "non-scaling-stroke" }}
                                    />
                                </svg>

                                {/* X-Axis Labels */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-muted-foreground font-medium translate-y-8">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-none rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-2">
                    <CardHeader className="pt-6 px-8">
                        <CardTitle className="text-xl font-bold text-foreground/80">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-8">
                        {[
                            { text: "Added Quinoa to pantry", time: "2h ago", icon: "🥗", bg: "bg-emerald-50 text-emerald-600" },
                            { text: "Planned meals for the week", time: "5h ago", icon: "📅", bg: "bg-blue-50 text-blue-600" },
                            { text: "Shared lemons with community", time: "1d ago", icon: "🍋", bg: "bg-amber-50 text-amber-600" },
                            { text: "Completed onboarding", time: "1d ago", icon: "✨", bg: "bg-purple-50 text-purple-600" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-5 group cursor-pointer">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${item.bg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1 py-1">
                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.text}</p>
                                    <p className="text-sm text-muted-foreground mt-1 font-medium">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
