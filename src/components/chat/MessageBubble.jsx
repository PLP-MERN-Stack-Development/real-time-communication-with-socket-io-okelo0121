import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Smile } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const MessageBubble = ({ message, isOwnMessage, userId }) => {
  const [reactions, setReactions] = useState({});

  const handleReaction = async (reaction) => {
    const { error } = await supabase.from("message_reactions").insert({
      message_id: message.id,
      user_id: userId,
      reaction,
    });

    if (!error) {
      setReactions((prev) => ({
        ...prev,
        [reaction]: (prev[reaction] || 0) + 1,
      }));
    }
  };

  return (
    <div className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          {message.profiles.username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={`flex flex-col gap-1 ${isOwnMessage ? "items-end" : ""}`}>
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-semibold ${isOwnMessage ? "order-2" : ""}`}>
            {message.profiles.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </span>
        </div>
        <div
          className={`rounded-2xl px-4 py-2.5 max-w-md ${
            isOwnMessage
              ? "bg-[hsl(var(--chat-bubble-user))] text-white"
              : "bg-[hsl(var(--chat-bubble-other))] text-foreground border border-border"
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={() => handleReaction("👍")}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={() => handleReaction("❤️")}
          >
            <Heart className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={() => handleReaction("😊")}
          >
            <Smile className="w-3.5 h-3.5" />
          </Button>
        </div>
        {Object.keys(reactions).length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {Object.entries(reactions).map(([emoji, count]) => (
              <span
                key={emoji}
                className="text-xs bg-muted px-2 py-0.5 rounded-full"
              >
                {emoji} {count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;