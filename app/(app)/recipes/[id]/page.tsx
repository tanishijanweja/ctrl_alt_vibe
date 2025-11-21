import { getRecipeById } from "@/lib/mock-ai";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Clock, Flame, ChevronLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/planner">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Back to Plan</h1>
            </div>

            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <div className={`absolute inset-0 ${recipe.image} opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                    <div className="flex gap-2 mb-4">
                        {recipe.tags.map((tag) => (
                            <Badge key={tag} className="bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-md">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{recipe.title}</h1>
                    <p className="text-white/80 text-lg max-w-2xl">{recipe.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                        <div className="space-y-6">
                            {recipe.instructions.map((step, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        {i + 1}
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed pt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <Card className="glass-panel sticky top-6">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex justify-between items-center pb-6 border-b border-border">
                                <div className="flex flex-col items-center">
                                    <Clock className="w-5 h-5 text-primary mb-1" />
                                    <span className="text-sm font-medium">{recipe.time}</span>
                                    <span className="text-xs text-muted-foreground">Time</span>
                                </div>
                                <div className="w-px h-8 bg-border" />
                                <div className="flex flex-col items-center">
                                    <Flame className="w-5 h-5 text-orange-500 mb-1" />
                                    <span className="text-sm font-medium">{recipe.calories}</span>
                                    <span className="text-xs text-muted-foreground">Calories</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">Ingredients</h3>
                                <ul className="space-y-3">
                                    {recipe.ingredients.map((ing, i) => (
                                        <li key={i} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{ing.name}</span>
                                            <span className="font-medium">{ing.amount}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button className="w-full gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Add Missing to List
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
