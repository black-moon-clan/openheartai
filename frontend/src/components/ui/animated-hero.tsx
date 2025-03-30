"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  const handleStartChatting = () => {
    router.push("/chat");
  };

  const handleLearnMore = () => {
    window.open("https://ai.lure.health/about", "_blank");
  };

  return (
    <div className="relative overflow-hidden bg-background py-20 sm:py-32 flex items-center min-h-[80vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background z-0" />
      
      {/* Background elements without animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Accurate & Compassionate
              </span>
              <span className="block mt-2">Sexual Health Education</span>
            </h1>
          </div>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            Ask questions in a safe, judgment-free environment and receive thoughtful,
            scientifically accurate information from our AI sexual health educator.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
    </div>
  );
}
