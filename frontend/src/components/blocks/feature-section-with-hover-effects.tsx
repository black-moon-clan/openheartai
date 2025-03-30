"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lock, BookOpen, Clock } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: "Private & Confidential",
    description: "Ask sensitive questions without fear of judgment. Your conversations remain private.",
    icon: Lock,
  },
  {
    title: "Expert Knowledge",
    description: "Receive accurate, evidence-based information on sexual health and education.",
    icon: BookOpen,
  },
  {
    title: "Always Accessible",
    description: "Get answers to your questions 24/7, whenever you need guidance or information.",
    icon: Clock,
  },
];

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Choose Our Service</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
            Our AI-powered platform provides reliable information in a safe, accessible environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  
  return (
    <div>
      <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
