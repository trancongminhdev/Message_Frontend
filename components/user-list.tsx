'use client';

import React from 'react';

export default function UserList({ users, selectedUser, onSelectUser }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {users.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No conversations found
        </div>
      ) : (
        users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`w-full p-4 border-b border-border hover:bg-secondary transition text-left ${
              selectedUser?.id === user.id ? 'bg-secondary' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {user.name}
                  </h3>
                  <span className="text-xs text-muted-foreground ml-2">
                    {user.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {user.lastMessage}
                </p>
              </div>
              {user.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold flex-shrink-0">
                  {user.unread}
                </div>
              )}
            </div>
          </button>
        ))
      )}
    </div>
  );
}
