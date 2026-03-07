'use client';

import ChatMessage from './ChatMessage';

interface Message {
  sender: 'user' | 'coach';
  message: string;
  delay?: number;
}

interface ChatConversationProps {
  messages: Message[];
  coachName?: string;
}

export default function ChatConversation({ messages, coachName = 'Your Coach' }: ChatConversationProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="space-y-1">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            coachName={coachName}
            delay={msg.delay || index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
