"use client";

import { useState } from "react";
import { useUser } from "@/lib/store";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Badge } from "@/app/components/ui/Badge";
import { Plus, Trash2, Search, AlertCircle } from "lucide-react";

export default function PantryPage() {
    const { preferences, addPantryItem, removePantryItem } = useUser();
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");

    const handleAdd = () => {
        if (newItem.trim()) {
            addPantryItem(newItem.trim());
            setNewItem("");
        }
    };

    const filteredItems = preferences.pantryItems.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
    );

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

            <Card className="glass-panel border-white/5">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Add New Item
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g., Quinoa, Almond Milk, Spinach"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        />
                        <Button onClick={handleAdd}>Add</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                        <Card key={`${item}-${idx}`} className="group hover:border-primary/50 transition-colors">
                            <CardContent className="p-4 flex items-center justify-between">
                                <span className="font-medium">{item}</span>
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
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
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
