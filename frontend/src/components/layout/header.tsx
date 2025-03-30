"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Open Heart AI</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : "text-muted-foreground"}`}
          >
            About
          </Link>
          <Link 
            href="/resources" 
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/resources" ? "text-primary" : "text-muted-foreground"}`}
          >
            Resources
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/chat">
            <Button variant="default" size="sm">
              Start Chatting
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
