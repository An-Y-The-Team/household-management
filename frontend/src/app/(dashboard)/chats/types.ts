import type { ConversationType, MessageType } from "./constants";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: MessageType;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  type: ConversationType;
  householdId: string;
  householdName: string;
  /** IDs of participants. */
  participantIds: string[];
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}
