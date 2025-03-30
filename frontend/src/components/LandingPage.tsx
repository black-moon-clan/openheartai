"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, BookOpen, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type FeatureCardProps = { 
  icon: React.ElementType, 
  title: string, 
  description: string 
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Icon className="h-12 w-12 mb-4 text-primary" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function LandingPage() {
  const router = useRouter();

  const handleStartChatting = () => {
    router.push("/chat");
  };

  const handleLearnMore = () => {
    window.open("https://ai.lure.health/about", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Accurate & Compassionate Sexual Health Education
          </h1>
        </div>
        
        <div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Ask questions in a safe, judgment-free environment and receive thoughtful, 
            scientifically accurate information from our AI sexual health educator.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            icon={Lock} 
            title="Private & Confidential" 
            description="Ask sensitive questions without fear of judgment. Your conversations remain private."
          />
          
          <FeatureCard 
            icon={BookOpen} 
            title="Expert Knowledge" 
            description="Receive accurate, evidence-based information on sexual health and education."
          />
          
          <FeatureCard 
            icon={Clock} 
            title="Always Accessible" 
            description="Get answers to your questions 24/7, whenever you need guidance or information."
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            onClick={handleLearnMore}
            variant="outline"
            className="border-primary/50 hover:border-primary text-primary hover:text-primary hover:bg-primary/10 font-bold py-3 px-6"
          >
            Learn More
          </Button>
          <Button 
            onClick={handleStartChatting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 group"
          >
            Start Chatting
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
