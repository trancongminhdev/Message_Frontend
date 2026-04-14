'use client';

import { ArrowLeft, MoreVertical, Phone, Send, Video } from 'lucide-react';
import { useState } from 'react';
import ChatArea from './chat-area';
import UserOptionsMenu from './user-options-menu';

export default function ChatInterface() {
  const [selectedUser, setSelectedUser] = useState<any>({
    id: 1,
    name: 'Creative Director',
    avatar: '👨‍💼',
    lastMessage: 'Hey! Are you here?',
    timestamp: '13:53',
    isFriend: true,
    unread: 2,
  });
  const [showUserMenu, setShowUserMenu] = useState(false);

  const chatMessages = selectedUser ? [
    {
      id: 1,
      sender: 'other',
      text: "Hey! Are you here?",
      timestamp: '13:53',
    },
    {
      id: 2,
      sender: 'self',
      text: "Yeah...",
      timestamp: '13:53',
    },
    {
      id: 3,
      sender: 'other',
      text: "Great work on the slides! Love it! Just one more thing...",
      timestamp: '13:53',
    },
  ] : [];

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSelectedUser(null)}
              className="sm:hidden p-2 hover:bg-secondary rounded-lg transition text-foreground -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl shrink-0">
              {selectedUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground truncate">{selectedUser.name}</h2>
              <p className="text-sm text-muted-foreground">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition text-foreground hidden sm:block">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition text-foreground hidden sm:block">
              <Video className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-secondary rounded-lg transition text-foreground"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showUserMenu && (
                <UserOptionsMenu
                  user={selectedUser}
                  onClose={() => setShowUserMenu(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <ChatArea messages={chatMessages} />

        {/* Input Area */}
        <div className="bg-card border-t border-border p-4">
          <div className="flex gap-2 items-end">
            <input
              type="text"
              placeholder="Aa"
              className="flex-1 px-4 py-2 bg-secondary border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
