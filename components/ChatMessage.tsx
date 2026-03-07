'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ChatMessageProps {
  sender: 'user' | 'coach';
  message: string;
  coachName?: string;
  coachAvatar?: string;
  delay?: number;
}

export default function ChatMessage({ 
  sender, 
  message, 
  coachName = 'Your Coach',
  coachAvatar,
  delay = 0 
}: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
          {coachAvatar ? (
            <Image
              src={coachAvatar}
              alt={coachName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-sm">
              {coachName.charAt(0)}
            </div>
          )}
        </div>
      )}
      
      <div
        className={`max-w-[70%] rounded-3xl px-5 py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-tr-md'
            : 'bg-gray-100 text-gray-900 rounded-tl-md'
        }`}
      >
        <p className="text-[15px] leading-relaxed">{message}</p>
      </div>

      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 shadow-md">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
