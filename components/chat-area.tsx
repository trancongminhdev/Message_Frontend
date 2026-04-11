'use client';

import React from 'react';

export default function ChatArea({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              message.sender === 'self'
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-secondary text-foreground rounded-bl-none'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className={`text-xs mt-1 block ${
              message.sender === 'self'
                ? 'text-primary-foreground/70'
                : 'text-muted-foreground'
            }`}>
              {message.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
