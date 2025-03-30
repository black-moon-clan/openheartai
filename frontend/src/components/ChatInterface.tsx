"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, Bot, Shield, Trash2, HelpCircle, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sending" | "sent" | "error";
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I am your sexual health educator. Feel free to ask me any questions about sexual health. Your conversations remain private and confidential.",
      sender: "bot",
      timestamp: new Date(),
      status: "sent",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [privateMode, setPrivateMode] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      // Update user message status to sent
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === newUserMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your question. I am providing accurate, evidence-based information on sexual health topics. Your privacy is protected, and this conversation is confidential. How else can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        status: "sent",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I am your sexual health educator. Feel free to ask me any questions about sexual health. Your conversations remain private and confidential.",
        sender: "bot",
        timestamp: new Date(),
        status: "sent",
      },
    ]);
    toast({
      title: "Chat cleared",
      description: "All previous messages have been removed",
    });
  };

  const togglePrivateMode = () => {
    setPrivateMode(!privateMode);
    toast({
      title: privateMode ? "Privacy mode disabled" : "Privacy mode enabled",
      description: privateMode 
        ? "Your conversation is no longer hidden from nearby viewers" 
        : "Your conversation is now hidden from nearby viewers",
    });
  };

  return (
    <TooltipProvider>
      <Card className="flex flex-col h-[600px] max-h-[80vh] bg-background border rounded-lg shadow-sm mx-auto max-w-4xl">
        {/* Header */}
        <CardHeader className="flex flex-row justify-between items-center p-3 border-b space-y-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-medium">Health Educator</h1>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Shield className="h-3 w-3" /> Private & Confidential
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Switch 
                    id="private-mode" 
                    checked={privateMode} 
                    onCheckedChange={togglePrivateMode}
                    aria-label="Toggle privacy mode"
                    className="scale-75"
                  />
                  <Label htmlFor="private-mode" className="text-xs cursor-pointer">Privacy</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hide sensitive content from nearby viewers</p>
              </TooltipContent>
            </Tooltip>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Clear chat history">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear conversation?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all messages in this conversation. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearChat}>Clear</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Help">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ask any sexual health question in a safe, judgment-free environment</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-end gap-2 max-w-[85%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-7 w-7 hidden sm:flex">
                      <AvatarFallback>
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`message-bubble ${message.sender === "user" ? "user-message" : "bot-message"} ${privateMode && message.sender === "user" ? "blur-sm hover:blur-none focus:blur-none" : ""}`}
                    tabIndex={0}
                    aria-label={`${message.sender === "user" ? "Your message" : "Bot message"}: ${message.content}`}
                  >
                    <p>{message.content}</p>
                    <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {message.sender === "user" && message.status && (
                        <span className="ml-1">
                          {message.status === "sending" && "Sending..."}
                          {message.status === "sent" && "Sent"}
                          {message.status === "error" && "Error"}
                        </span>
                      )}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-7 w-7 hidden sm:flex">
                      <AvatarFallback>
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <Avatar className="h-7 w-7 hidden sm:flex">
                    <AvatarFallback>
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bot-message" aria-live="polite" aria-label="Bot is typing">
                    <div className="flex space-x-2 items-center h-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse delay-150"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <CardFooter className="p-3 border-t">
          <div className="flex w-full gap-2 items-center">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about sexual health..."
                className="pr-10 py-2 min-h-10"
                disabled={isLoading}
                aria-label="Type your message"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-xs text-muted-foreground">
                <Info className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Private & Confidential</span>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={inputValue.trim() === "" || isLoading} 
              className="bg-primary hover:bg-primary/90 h-10 w-10 p-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
