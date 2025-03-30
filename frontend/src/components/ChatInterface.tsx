"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, Bot, Shield, Trash2, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  const handleSendMessage = async () => {
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

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      // Update user message status to sent
      setMessages((prev) =>
        prev.map(msg =>
          msg.id === newUserMessage.id ? { ...msg, status: "sent" } : msg
        )
      );

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from the chatbot",
        variant: "destructive",
      });

      // Update user message status to error
      setMessages((prev) =>
        prev.map(msg =>
          msg.id === newUserMessage.id ? { ...msg, status: "error" } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
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
                    className={`message-bubble ${message.sender === "user" ? "user-message" : "bot-message"}`}
                    tabIndex={0}
                    aria-label={`${message.sender === "user" ? "Your message" : "Bot message"}: ${message.content}`}
                  >
                    {message.sender === "bot" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: (props) => <p className="mb-4" {...props} />,
                          ul: (props) => <ul className="mb-4 ml-4 list-disc" {...props} />,
                          ol: (props) => <ol className="mb-4 ml-4 list-decimal" {...props} />,
                          li: (props) => <li className="mb-2" {...props} />,
                          h1: (props) => <h1 className="text-xl font-bold mb-4" {...props} />,
                          h2: (props) => <h2 className="text-lg font-bold mb-3" {...props} />,
                          h3: (props) => <h3 className="text-md font-bold mb-2" {...props} />,
                          strong: (props) => <strong className="font-bold" {...props} />,
                          em: (props) => <em className="italic" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{message.content}</p>
                    )}
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
          </div>
        </ScrollArea>

        {/* Input Area */}
        <CardFooter className="p-3 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full gap-2"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
