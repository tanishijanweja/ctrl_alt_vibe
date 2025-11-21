"use client";

import { useState } from "react";
import { useUser } from "@/lib/store";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Check, ShoppingCart, Plus, Trash2, Share2 } from "lucide-react";
import { Input } from "@/app/components/ui/Input";

// Mock initial grocery list based on "missing items"
const INITIAL_GROCERY_LIST = [
    { name: "Greek Yogurt", category: "Dairy", checked: false },
    { name: "Spinach", category: "Produce", checked: false },
    { name: "Chicken Breast", category: "Meat", checked: false },
    { name: "Almonds", category: "Pantry", checked: true },
];

export default function GroceryPage() {
    const [items, setItems] = useState(INITIAL_GROCERY_LIST);
    const [newItem, setNewItem] = useState("");

    const toggleItem = (index: number) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    };

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, { name: newItem.trim(), category: "Other", checked: false }]);
            setNewItem("");
        }
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const categories = Array.from(new Set(items.map((i) => i.category)));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Grocery List</h1>
                    <p className="text-muted-foreground">Smart list generated from your meal plan.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share List
                </Button>
            </div>

            <Card className="glass-panel border-white/5">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Add Item
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g., Milk, Eggs, Bread"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addItem()}
                        />
                        <Button onClick={addItem}>Add</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                    <Card key={category} className="h-fit">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-primary">{category}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {items
                                .map((item, originalIndex) => ({ ...item, originalIndex }))
                                .filter((item) => item.category === category)
                                .map((item) => (
                                    <div
                                        key={item.originalIndex}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleItem(item.originalIndex)}
                                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked
                                                        ? "bg-primary border-primary text-primary-foreground"
                                                        : "border-muted-foreground"
                                                    }`}
                                            >
                                                {item.checked && <Check className="w-3 h-3" />}
                                            </button>
                                            <span className={item.checked ? "text-muted-foreground line-through" : ""}>
                                                {item.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.originalIndex)}
                                            className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-1 rounded transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
