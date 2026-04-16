"use client";

import React, { useState } from "react";
import { UserPlus, UserX, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/types/constant/route";

export default function UserOptionsMenu({ user, onClose }) {
  const navigation = useRouter();
  const [isFriend, setIsFriend] = useState(user.isFriend);

  const handleAddFriend = () => {
    setIsFriend(true);
    onClose();
  };

  const handleRemoveFriend = () => {
    setIsFriend(false);
    onClose();
  };

  return (
    <div className="absolute right-0 top-12 bg-card border border-border rounded-lg shadow-lg z-50 min-w-48">
      <div className="py-2">
        {/* Search Messages */}
        <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary transition flex items-center gap-2">
          <Search className="w-4 h-4" />
          Search messages
        </button>

        {/* Add/Remove Friend */}
        {isFriend ? (
          <button
            onClick={handleRemoveFriend}
            className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-secondary transition flex items-center gap-2 border-t border-border"
          >
            <UserX className="w-4 h-4" />
            Unfriend
          </button>
        ) : (
          <button
            onClick={handleAddFriend}
            className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-secondary transition flex items-center gap-2 border-t border-border"
          >
            <UserPlus className="w-4 h-4" />
            Add friend
          </button>
        )}

        {/* View Profile */}
        <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary transition border-t border-border">
          View profile
        </button>

        {/* Block */}
        <button
          className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-secondary transition border-t border-border"
          onClick={() => {
            signOut();
            navigation.push(ROUTE.LOGIN);
          }}
        >
          Block
        </button>
      </div>
    </div>
  );
}
