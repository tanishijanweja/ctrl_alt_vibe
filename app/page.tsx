"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, Leaf, Sparkles, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />

        <div className="space-y-6 max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/10 backdrop-blur-sm text-sm font-medium text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Meal Planning</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient">
            Eat Smarter. <br /> Waste Less.
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent kitchen assistant. Plan meals based on what you have,
            automate grocery lists, and join a community fighting food waste.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/onboarding">
              <Button size="lg" className="text-lg px-8 h-14 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 rounded-2xl hover:bg-secondary/50">
                I have an account
              </Button>
            </SignInButton>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full px-4">
          {[
            {
              icon: <Leaf className="w-6 h-6 text-emerald-400" />,
              title: "Zero Waste",
              desc: "Smart recipes that use up your pantry ingredients before they expire."
            },
            {
              icon: <Sparkles className="w-6 h-6 text-amber-400" />,
              title: "AI Chef",
              desc: "Personalized meal plans adapted to your diet, goals, and taste."
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
              title: "Track Progress",
              desc: "Visualize your savings and health goals with beautiful charts."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl hover:bg-white/10 transition-colors text-left">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
