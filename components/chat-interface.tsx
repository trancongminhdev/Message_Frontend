'use client';

import { ArrowLeft, MoreVertical, Phone, Plus, Search, Send, Video } from 'lucide-react';
import { useState } from 'react';
import ChatArea from './chat-area';
import UserList from './user-list';
import UserOptionsMenu from './user-options-menu';

export default function ChatInterface() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');

  const sampleUsers = [
    {
      id: 1,
      name: 'Creative Director',
      avatar: '👨‍💼',
      lastMessage: 'Hey! Are you here?',
      timestamp: '13:53',
      isFriend: true,
      unread: 2,
    },
    {
      id: 2,
      name: 'Product Manager',
      avatar: '👩‍💼',
      lastMessage: 'Let&apos;s meet tomorrow',
      timestamp: '12:30',
      isFriend: true,
      unread: 0,
    },
    {
      id: 3,
      name: 'Design Lead',
      avatar: '👨‍🎨',
      lastMessage: 'Designs are ready for review',
      timestamp: '11:45',
      isFriend: true,
      unread: 0,
    },
    {
      id: 4,
      name: 'Software Engineer',
      avatar: '👨‍💻',
      lastMessage: 'PR is up for review',
      timestamp: '10:00',
      isFriend: false,
      unread: 0,
    },
  ];

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

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      {/* Sidebar - Hidden on mobile when chat is selected */}
      <div className={`${selectedUser ? 'hidden' : 'flex'} sm:flex w-full sm:w-96 bg-card border-r border-border flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              New Chat
            </button>
          </div>
        </div>

        {/* User List */}
        <UserList
          users={filteredUsers}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      </div>

      {/* Chat Area - Full width on mobile when selected */}
      {selectedUser ? (
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
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl flex-shrink-0">
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
      ) : (
        <div className="flex-1 hidden sm:flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Select a conversation</h2>
            <p className="text-muted-foreground">Choose a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
