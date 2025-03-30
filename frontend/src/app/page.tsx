import { Hero } from "@/components/ui/animated-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<Skeleton className="h-[80vh] w-full" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[60vh] w-full" />}>
        <FeaturesSectionWithHoverEffects />
      </Suspense>
    </div>
  );
}
