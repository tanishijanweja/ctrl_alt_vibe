"use client";

import { useUser } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Leaf, DollarSign } from "lucide-react";

export default function DashboardPage() {
    const { preferences } = useUser();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Hello, {preferences.name || "Chef"}! 👋
                    </h1>
                    <p className="text-muted-foreground">Here's your impact summary.</p>
                </div>
                <Link href="/planner">
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        Generate Meal Plan
                        <Sparkles className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-panel border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Leaf className="w-24 h-24" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-emerald-500" />
                            Waste Saved
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-emerald-400 mb-1">
                            2.4 kg
                        </div>
                        <p className="text-sm text-muted-foreground">This month</p>
                        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[70%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-amber-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <DollarSign className="w-24 h-24" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-amber-500" />
                            Money Saved
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-amber-400 mb-1">
                            $145
                        </div>
                        <p className="text-sm text-muted-foreground">Estimated savings</p>
                        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[45%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="w-24 h-24" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            Health Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-blue-400 mb-1">
                            92
                        </div>
                        <p className="text-sm text-muted-foreground">Based on recent meals</p>
                        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[92%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-panel">
                    <CardHeader>
                        <CardTitle>Weekly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2 pt-4">
                            {[65, 40, 75, 50, 85, 90, 60].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-lg transition-all duration-500 group-hover:bg-primary/40 relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {h}% Goal
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-panel">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { text: "Added Quinoa to pantry", time: "2h ago", icon: "🥗" },
                            { text: "Planned meals for the week", time: "5h ago", icon: "📅" },
                            { text: "Shared lemons with community", time: "1d ago", icon: "🍋" },
                            { text: "Completed onboarding", time: "1d ago", icon: "✨" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
