import { useQuery } from "@tanstack/react-query";

import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../data/mock-data";
import type { ChatMessage, Conversation } from "../types";

const CONVERSATIONS_QUERY_KEY = ["conversations"] as const;
const MESSAGES_QUERY_KEY = ["messages"] as const;

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: CONVERSATIONS_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_CONVERSATIONS;
    },
    staleTime: 30 * 1000,
  });
}

export function useMessages({ conversationId }: { conversationId: string }) {
  return useQuery<ChatMessage[]>({
    queryKey: [...MESSAGES_QUERY_KEY, conversationId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_MESSAGES[conversationId] ?? [];
    },
    staleTime: 10 * 1000,
    enabled: Boolean(conversationId),
  });
}
