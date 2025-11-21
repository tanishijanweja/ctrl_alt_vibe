"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Badge } from "@/app/components/ui/Badge";
import { Check, ChevronRight, Leaf, Sparkles, Target } from "lucide-react";

const STEPS = ["Welcome", "Diet", "Goals", "Pantry"];

const DIETS = ["Omnivore", "Vegetarian", "Vegan", "Keto", "Paleo"];
const GOALS = ["Save Money", "Eat Healthy", "Reduce Waste", "Learn to Cook"];
const COMMON_PANTRY = ["Rice", "Pasta", "Beans", "Tomatoes", "Onions", "Garlic", "Olive Oil", "Salt", "Pepper"];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const { preferences, updatePreferences, addPantryItem, removePantryItem } = useUser();
    const router = useRouter();
    const [nameInput, setNameInput] = useState("");

    const handleNext = () => {
        if (step === STEPS.length - 1) {
            updatePreferences({ isOnboarded: true });
            router.push("/dashboard");
        } else {
            if (step === 0 && nameInput) {
                updatePreferences({ name: nameInput });
            }
            setStep(step + 1);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-emerald-900/20">
            <div className="w-full max-w-lg space-y-4">
                <div className="flex justify-between mb-8 px-2">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${i <= step
                                    ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/25"
                                    : "bg-secondary text-secondary-foreground"
                                    }`}
                            >
                                {i + 1}
                            </div>
                            <span className={`text-xs ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
                        </div>
                    ))}
                </div>

                <Card className="glass-panel border-white/10 animate-slide-up">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">
                            {step === 0 && "Welcome to Rasoyee"}
                            {step === 1 && "Dietary Preferences"}
                            {step === 2 && "Your Goals"}
                            {step === 3 && "Quick Pantry Setup"}
                        </CardTitle>
                        <CardDescription className="text-center text-lg">
                            {step === 0 && "Let's personalize your meal planning experience."}
                            {step === 1 && "What do you like to eat?"}
                            {step === 2 && "What are you aiming for?"}
                            {step === 3 && "Select items you already have."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {step === 0 && (
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                                        <Sparkles className="w-12 h-12 text-primary" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">What should we call you?</label>
                                    <Input
                                        placeholder="Enter your name"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        className="text-lg h-12"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-3">
                                {DIETS.map((diet) => (
                                    <button
                                        key={diet}
                                        onClick={() => updatePreferences({ diet: diet as any })}
                                        className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-[1.02] ${preferences.diet === diet
                                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                                            : "border-transparent bg-secondary/50 hover:bg-secondary"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{diet}</span>
                                            {preferences.diet === diet && <Check className="w-4 h-4 text-primary" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-3">
                                {GOALS.map((goal) => {
                                    const isSelected = preferences.goals.includes(goal as any);
                                    return (
                                        <button
                                            key={goal}
                                            onClick={() => {
                                                const newGoals = isSelected
                                                    ? preferences.goals.filter((g) => g !== goal)
                                                    : [...preferences.goals, goal];
                                                updatePreferences({ goals: newGoals as any });
                                            }}
                                            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${isSelected
                                                ? "border-primary bg-primary/10"
                                                : "border-transparent bg-secondary/50 hover:bg-secondary"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-full ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                                                <Target className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium flex-1 text-left">{goal}</span>
                                            {isSelected && <Check className="w-5 h-5 text-primary" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {COMMON_PANTRY.map((item) => {
                                        const isSelected = preferences.pantryItems.includes(item);
                                        return (
                                            <Badge
                                                key={item}
                                                variant={isSelected ? "default" : "secondary"}
                                                className="text-sm py-1 px-3 cursor-pointer hover:scale-105 transition-transform"
                                                onClick={() => isSelected ? removePantryItem(item) : addPantryItem(item)}
                                            >
                                                {item}
                                                {isSelected && <Check className="w-3 h-3 ml-1" />}
                                            </Badge>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    You can add more specific items later in your pantry.
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full h-12 text-lg"
                            onClick={handleNext}
                            disabled={step === 0 && !nameInput}
                        >
                            {step === STEPS.length - 1 ? "Get Started" : "Next Step"}
                            {step !== STEPS.length - 1 && <ChevronRight className="ml-2 w-5 h-5" />}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
