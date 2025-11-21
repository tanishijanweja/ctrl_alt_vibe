// Removed uuid import


export interface Ingredient {
    name: string;
    amount: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string[];
    calories: number;
    time: string;
    tags: string[];
    image: string; // Placeholder color or pattern
}

export interface MealPlan {
    day: string;
    meals: {
        breakfast: Recipe;
        lunch: Recipe;
        dinner: Recipe;
    };
}

const MOCK_RECIPES: Recipe[] = [
    {
        id: "1",
        title: "Quinoa & Black Bean Bowl",
        description: "A protein-packed vegetarian bowl with fresh veggies.",
        ingredients: [
            { name: "Quinoa", amount: "1 cup" },
            { name: "Black Beans", amount: "1 can" },
            { name: "Corn", amount: "1/2 cup" },
            { name: "Avocado", amount: "1" },
        ],
        instructions: [
            "Cook quinoa according to package instructions.",
            "Rinse black beans and corn.",
            "Slice avocado.",
            "Assemble bowl and serve with lime.",
        ],
        calories: 450,
        time: "20 mins",
        tags: ["Vegetarian", "High Protein", "Gluten Free"],
        image: "bg-emerald-100",
    },
    {
        id: "2",
        title: "Lemon Herb Grilled Chicken",
        description: "Juicy chicken breast marinated in lemon and herbs.",
        ingredients: [
            { name: "Chicken Breast", amount: "2" },
            { name: "Lemon", amount: "1" },
            { name: "Rosemary", amount: "2 sprigs" },
            { name: "Olive Oil", amount: "2 tbsp" },
        ],
        instructions: [
            "Mix lemon juice, olive oil, and herbs.",
            "Marinate chicken for 30 mins.",
            "Grill for 6-8 mins per side.",
        ],
        calories: 320,
        time: "45 mins",
        tags: ["Keto", "High Protein"],
        image: "bg-amber-100",
    },
    {
        id: "3",
        title: "Spicy Tomato Pasta",
        description: "Quick and easy pasta with a kick.",
        ingredients: [
            { name: "Pasta", amount: "200g" },
            { name: "Tomato Sauce", amount: "1 cup" },
            { name: "Chili Flakes", amount: "1 tsp" },
            { name: "Garlic", amount: "2 cloves" },
        ],
        instructions: [
            "Boil pasta.",
            "Sauté garlic and chili flakes.",
            "Add tomato sauce and simmer.",
            "Toss pasta with sauce.",
        ],
        calories: 400,
        time: "15 mins",
        tags: ["Vegan", "Quick"],
        image: "bg-red-100",
    },
];

export async function generateMealPlan(pantryItems: string[], diet: string): Promise<MealPlan[]> {
    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return days.map((day) => ({
        day,
        meals: {
            breakfast: MOCK_RECIPES[0], // Simplified for demo
            lunch: MOCK_RECIPES[2],
            dinner: MOCK_RECIPES[1],
        },
    }));
}

export async function getRecipeById(id: string): Promise<Recipe | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_RECIPES.find((r) => r.id === id);
}
