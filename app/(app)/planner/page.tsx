"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/store";
import { generateMealPlan, type MealPlan } from "@/lib/mock-ai";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Sparkles, RefreshCw, Calendar as CalendarIcon, Clock } from "lucide-react";
import Link from "next/link";

export default function PlannerPage() {
    const { preferences } = useUser();
    const [plan, setPlan] = useState<MealPlan[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const newPlan = await generateMealPlan(preferences.pantryItems, preferences.diet);
            setPlan(newPlan);
        } catch (error) {
            console.error("Failed to generate plan", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Meal Planner</h1>
                    <p className="text-muted-foreground">AI-curated meals based on your pantry.</p>
                </div>
                <Button onClick={handleGenerate} disabled={loading} className="gap-2">
                    {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4" />
                    )}
                    {plan ? "Regenerate Plan" : "Generate Plan"}
                </Button>
            </div>

            {!plan && !loading && (
                <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-card/30">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CalendarIcon className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Plan Generated Yet</h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        Let our AI analyze your pantry ingredients and dietary preferences to create the perfect weekly meal plan for you.
                    </p>
                    <Button size="lg" onClick={handleGenerate} className="gap-2">
                        <Sparkles className="w-5 h-5" />
                        Create My Plan
                    </Button>
                </div>
            )}

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-96 rounded-2xl bg-card/50 animate-pulse" />
                    ))}
                </div>
            )}

            {plan && (
                <div className="space-y-8 animate-fade-in">
                    {plan.map((dayPlan) => (
                        <div key={dayPlan.day} className="space-y-4">
                            <h3 className="text-xl font-semibold sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
                                {dayPlan.day}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {(["breakfast", "lunch", "dinner"] as const).map((type) => {
                                    const recipe = dayPlan.meals[type];
                                    return (
                                        <Link href={`/recipes/${recipe.id}`} key={type} className="block group">
                                            <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
                                                <div className={`h-32 w-full ${recipe.image} rounded-t-xl opacity-80 group-hover:opacity-100 transition-opacity`} />
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
                                                            {type}
                                                        </Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {recipe.time}
                                                        </div>
                                                    </div>
                                                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                                        {recipe.title}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {recipe.description}
                                                    </p>
                                                    <div className="flex gap-1 mt-3 flex-wrap">
                                                        {recipe.tags.slice(0, 2).map(tag => (
                                                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
