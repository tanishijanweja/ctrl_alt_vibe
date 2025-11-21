"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type DietType = "Omnivore" | "Vegetarian" | "Vegan" | "Keto" | "Paleo";
type GoalType = "Save Money" | "Eat Healthy" | "Reduce Waste" | "Learn to Cook";

interface UserPreferences {
    name: string;
    diet: DietType;
    allergies: string[];
    goals: GoalType[];
    pantryItems: string[];
    isOnboarded: boolean;
}

interface UserContextType {
    preferences: UserPreferences;
    updatePreferences: (updates: Partial<UserPreferences>) => void;
    addPantryItem: (item: string) => void;
    removePantryItem: (item: string) => void;
}

const defaultPreferences: UserPreferences = {
    name: "",
    diet: "Omnivore",
    allergies: [],
    goals: [],
    pantryItems: [],
    isOnboarded: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("ctrl_alt_vibe_prefs");
        if (stored) {
            try {
                setPreferences(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("ctrl_alt_vibe_prefs", JSON.stringify(preferences));
    }, [preferences]);

    const updatePreferences = (updates: Partial<UserPreferences>) => {
        setPreferences((prev) => ({ ...prev, ...updates }));
    };

    const addPantryItem = (item: string) => {
        setPreferences((prev) => ({
            ...prev,
            pantryItems: [...prev.pantryItems, item],
        }));
    };

    const removePantryItem = (item: string) => {
        setPreferences((prev) => ({
            ...prev,
            pantryItems: prev.pantryItems.filter((i) => i !== item),
        }));
    };

    return (
        <UserContext.Provider
            value={{ preferences, updatePreferences, addPantryItem, removePantryItem }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
