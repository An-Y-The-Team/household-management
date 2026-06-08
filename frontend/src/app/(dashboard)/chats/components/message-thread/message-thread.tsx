"use client";

import { useState } from "react";

import dayjs from "dayjs";
import { Send } from "lucide-react";

import type { ChatMessage, Conversation } from "@/app/(dashboard)/chats/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

const CURRENT_USER_ID = "user-1";

export function MessageThread({
  conversation,
  messages,
  isLoading,
}: {
  conversation: Conversation | null;
  messages: ChatMessage[];
  isLoading: boolean;
}) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Mock — in real app this would call a mutation.
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold">{conversation.name}</h3>
        <p className="text-muted-foreground text-xs">
          {conversation.participantIds.length} members ·{" "}
          {conversation.householdName}
        </p>
      </div>

      {/* ── Messages ─────────────────────────────────────────── */}
      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-10 w-64 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const isOwn = msg.senderId === CURRENT_USER_ID;

              return (
                <div
                  key={msg.id}
                  className={cn("flex gap-3", isOwn && "flex-row-reverse")}
                >
                  <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    {msg.senderName.charAt(0)}
                  </div>
                  <div className={cn("max-w-[70%]", isOwn && "text-right")}>
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {isOwn ? "You" : msg.senderName}
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        {dayjs(msg.timestamp).format("h:mm A")}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "inline-block rounded-lg px-3 py-2 text-sm",
                        isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* ── Input ────────────────────────────────────────────── */}
      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message…"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
