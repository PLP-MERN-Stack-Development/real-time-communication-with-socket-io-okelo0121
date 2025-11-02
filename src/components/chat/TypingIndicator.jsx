const TypingIndicator = ({ usernames }) => {
  const displayText = usernames.length === 1
    ? `${usernames[0]} is typing`
    : usernames.length === 2
    ? `${usernames[0]} and ${usernames[1]} are typing`
    : `${usernames.length} people are typing`;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--typing-indicator))] animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--typing-indicator))] animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--typing-indicator))] animate-bounce"></div>
      </div>
      <span>{displayText}...</span>
    </div>
  );
};

export default TypingIndicator;