import ChatInterface from "@/components/ChatInterface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - Open Heart AI",
  description: "Private & Confidential Sexual Health Education Chat",
};

export default function ChatPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <ChatInterface />
    </div>
  );
}
