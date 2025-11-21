"use client";

import { useState, useMemo } from "react";
import { useUser } from "@/lib/store";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Badge } from "@/app/components/ui/Badge";
import { Plus, Trash2, Search, AlertCircle, Check } from "lucide-react";
import {
    isValidIngredient,
    validateIngredientOrError,
    recommendedIngredientsForDiet,
    filterIngredientsByDiet,
    INGREDIENT_INDEX
} from "@/lib/constants";

export default function PantryPage() {
    const { preferences, addPantryItem, removePantryItem } = useUser();
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAdd = (itemToAdd: string = newItem) => {
        const trimmed = itemToAdd.trim();
        if (!trimmed) return;

        try {
            const validatedName = validateIngredientOrError(trimmed);

            if (preferences.pantryItems.includes(validatedName)) {
                setError(`${validatedName} is already in your pantry.`);
                return;
            }

            addPantryItem(validatedName);
            setNewItem("");
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const filteredPantryItems = preferences.pantryItems.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    // Group items by foodGroup
    const groupedItems = useMemo(() => {
        const groups: Record<string, string[]> = {};

        filteredPantryItems.forEach(item => {
            const ingredient = INGREDIENT_INDEX[item.toLowerCase()];
            const group = ingredient ? ingredient.foodGroup : "other";

            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(item);
        });

        return groups;
    }, [filteredPantryItems]);

    // Get recommendations based on diet, excluding items already in pantry
    const recommendations = useMemo(() => {
        const dietItems = recommendedIngredientsForDiet(preferences.diet);
        return dietItems.filter(item => !preferences.pantryItems.includes(item));
    }, [preferences.diet, preferences.pantryItems]);

    // Filter recommendations based on input for autocomplete
    const suggestions = useMemo(() => {
        if (!newItem) return [];
        return recommendations.filter(item =>
            item.toLowerCase().includes(newItem.toLowerCase())
        ).slice(0, 5);
    }, [recommendations, newItem]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Pantry</h1>
                    <p className="text-muted-foreground">Manage your ingredients to get better recipe suggestions.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search pantry..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <Card className="glass-panel border-white/5 overflow-visible">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Add New Item
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2 relative">
                        <div className="w-full relative">
                            <Input
                                placeholder="e.g., Quinoa, Almond Milk, Spinach"
                                value={newItem}
                                onChange={(e) => {
                                    setNewItem(e.target.value);
                                    setError(null);
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                                className={error ? "border-destructive" : ""}
                            />
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                                    {suggestions.map(suggestion => (
                                        <button
                                            key={suggestion}
                                            className="w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors text-sm"
                                            onClick={() => handleAdd(suggestion)}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button onClick={() => handleAdd()}>Add</Button>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive flex items-center gap-2 animate-in slide-in-from-left-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </p>
                    )}

                    {!newItem && recommendations.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Recommended for your {preferences.diet} diet
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {recommendations.slice(0, 10).map(item => (
                                    <Badge
                                        key={item}
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                                        onClick={() => handleAdd(item)}
                                    >
                                        <Plus className="w-3 h-3 mr-1" />
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="space-y-8">
                {Object.keys(groupedItems).length > 0 ? (
                    Object.entries(groupedItems).map(([group, items]) => (
                        <div key={group} className="space-y-4">
                            <h2 className="text-xl font-semibold capitalize flex items-center gap-2">
                                <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                                {group}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((item, idx) => (
                                    <Card key={`${item}-${idx}`} className="group hover:border-primary/50 transition-colors">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <span className="font-medium capitalize">{item}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => removePantryItem(item)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center text-muted-foreground">
                        <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <p>No items found in your pantry.</p>
                        <p className="text-sm">Add some ingredients to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
