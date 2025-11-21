"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Refrigerator, CalendarDays, Users, LogOut, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pantry", href: "/pantry", icon: Refrigerator },
    { label: "Meal Plan", href: "/planner", icon: CalendarDays },
    { label: "Grocery List", href: "/grocery", icon: ShoppingCart },
    { label: "Community", href: "/community", icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/50 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gradient">MealAI</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4">
                    <Link href="/">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Mobile Nav (Bottom) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
                <div className="flex justify-around p-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="flex-1">
                                <div
                                    className={cn(
                                        "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 md:pl-64 pb-20 md:pb-0">
                <div className="max-w-6xl mx-auto p-6 animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
