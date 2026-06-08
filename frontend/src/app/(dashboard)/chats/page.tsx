"use client";

import { useState } from "react";

import { ConversationList } from "@/app/(dashboard)/chats/components/conversation-list/conversation-list";
import { MessageThread } from "@/app/(dashboard)/chats/components/message-thread/message-thread";
import {
  useConversations,
  useMessages,
} from "@/app/(dashboard)/chats/use-chats/use-chats";

export default function ChatsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const { data: conversations, isLoading: isLoadingConversations } =
    useConversations();

  const { data: messages, isLoading: isLoadingMessages } = useMessages({
    conversationId: selectedConversationId ?? "",
  });

  const selectedConversation = conversations?.find(
    (c) => c.id === selectedConversationId
  );

  // Auto-select the first conversation if none is selected.
  if (!selectedConversationId && conversations?.length) {
    setSelectedConversationId(conversations[0].id);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Chats</h1>
        <p className="text-muted-foreground text-sm">
          Household conversations and direct messages
        </p>
      </div>

      <div className="flex h-[600px] overflow-hidden rounded-lg border">
        {/* ── Conversation sidebar ───────────────────────────── */}
        <ConversationList
          conversations={conversations ?? []}
          isLoading={isLoadingConversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />

        {/* ── Message thread ─────────────────────────────────── */}
        <MessageThread
          conversation={selectedConversation ?? null}
          messages={messages ?? []}
          isLoading={isLoadingMessages}
        />
      </div>
    </div>
  );
}
