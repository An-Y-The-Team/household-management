"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Hash, MessageCircle } from "lucide-react";

import { ConversationType } from "@/app/(dashboard)/chats/constants";
import type { Conversation } from "@/app/(dashboard)/chats/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

dayjs.extend(relativeTime);

export function ConversationList({
  conversations,
  isLoading,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  isLoading: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="w-72 shrink-0 border-r p-3">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-1 h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 shrink-0 border-r">
      <div className="border-b p-3">
        <h2 className="text-sm font-semibold">Conversations</h2>
      </div>
      <ScrollArea className="h-[calc(100%-49px)]">
        <div className="p-1">
          {conversations.map((conversation) => {
            const isSelected = conversation.id === selectedId;
            const Icon =
              conversation.type === ConversationType.HOUSEHOLD
                ? Hash
                : MessageCircle;

            return (
              <button
                key={conversation.id}
                type="button"
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent",
                  isSelected && "bg-accent"
                )}
                onClick={() => onSelect(conversation.id)}
              >
                <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                  <Icon className="text-muted-foreground size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">
                      {conversation.name}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <Badge
                        variant="default"
                        className="h-5 min-w-5 justify-center px-1 text-[10px]"
                      >
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {conversation.lastMessage && (
                    <p className="text-muted-foreground mt-0.5 truncate text-xs">
                      {conversation.lastMessage}
                    </p>
                  )}
                  {conversation.lastMessageAt && (
                    <p className="text-muted-foreground mt-0.5 text-[10px]">
                      {dayjs(conversation.lastMessageAt).fromNow()}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
